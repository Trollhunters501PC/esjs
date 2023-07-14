import { usarTerminal } from '@es-js/terminal'
import { compileModulesForPreview, prepareCodeAndTestsForPlayground } from '@es-js/compiler'
import { MAIN_FILE, MAIN_TESTS_FILE, OrchestratorFile, orchestrator } from '@es-js/compiler/orchestrator'
import {
  changeSize,
  getActiveTab,
  openEruda,
  setActiveTab, setErudaTheme,
  setupEruda,
} from './eruda'
import { useShare } from './useShare.ts'

const scriptEls: HTMLScriptElement[] = []

let theme: 'dark' | 'light' = 'dark'

let lastArgs: any = {}

export async function init() {
  const options = useShare().getOptionsFromUrl()

  setupBackgroundTransparent(options.backgroundTransparent)

  setupRefreshButton()

  setupTheme(options.theme)

  await setupEruda()

  hidePreview(options.hidePreview)

  previewTab(options.previewTab)

  await evalInitialCode()
}

function setupRefreshButton() {
  const refreshButton = document.querySelector('#refresh-button')

  if (!refreshButton) {
    return
  }

  refreshButton.addEventListener(
    'click',
    () => {
      evalCode(lastArgs)
    },
  )
}

function setupBackgroundTransparent(backgroundTransparent: boolean) {
  const body = document.querySelector('body')

  if (backgroundTransparent) {
    body.style.backgroundColor = 'transparent'
  }
}

export async function evalCode(args: any) {
  lastArgs = Object.assign({}, args)
  setupEsJSTerminal()
  clearConsole()

  if (scriptEls.length) {
    scriptEls.forEach((el) => {
      document.head.removeChild(el)
    })
    scriptEls.length = 0
  }

  let { script: scripts } = args

  if (typeof scripts === 'string') {
    scripts = [scripts]
  }

  for (const script of scripts) {
    const scriptEl = document.createElement('script')
    scriptEl.setAttribute('type', 'module')
    // send ok in the module script to ensure sequential evaluation
    // of multiple proxy.eval() calls
    const done = new Promise((resolve) => {
      window.__next__ = resolve
    })
    scriptEl.innerHTML = `${script}\nwindow.__next__()`
    document.head.appendChild(scriptEl)
    scriptEl.onerror = (error: any) => {
      throw error
    }
    scriptEls.push(scriptEl)
    await done
  }

  return true
}

async function evalInitialCode() {
  const code = useShare().getCodeFromUrl()

  const testsCode = useShare().getTestsCodeFromUrl()

  const result = prepareCodeAndTestsForPlayground(code, testsCode)

  orchestrator.files[MAIN_FILE] = new OrchestratorFile(
    MAIN_FILE,
    '',
    `${result.imports}\n${result.code}\n`,
    '',
  )

  orchestrator.files[MAIN_TESTS_FILE] = new OrchestratorFile(
    MAIN_TESTS_FILE,
    '',
    `${result.testsImports}\n${result.testsCode}\n`,
    '',
  )

  const modules = compileModulesForPreview([
    orchestrator.files[MAIN_TESTS_FILE],
    orchestrator.files[MAIN_FILE],
  ])

  await evalCode({
    script: [
      'const __modules__ = {};',
      ...modules,
    ],
  })
}

function clearConsole() {
  const isDev = window && window.location && window.location.ancestorOrigins && window.location.ancestorOrigins.length
    ? window.location.ancestorOrigins.item(0)?.startsWith('http://localhost:')
    : window.location.href.startsWith('http://localhost:')

  if (!isDev) {
    console.clear()
  }
}

export function hidePreview(value: boolean) {
  const previewElement = document.getElementById('preview-container')

  if (!previewElement) {
    return
  }

  if (value) {
    previewElement.style.display = 'none'
    previewElement.style.flex = '0 0 0'

    changeSize(100)
  }
  else {
    previewElement.style.display = 'flex'
    previewElement.style.flex = '1 1 0'

    changeSize(50)
  }

  if (getActiveTab() !== 'hidden') {
    openEruda()
  }
}

export function previewTab(value: 'console' | 'flowchart' | 'hidden') {
  setActiveTab(value)
}

export function setupTheme(value: 'dark' | 'light') {
  theme = value || 'dark'

  const htmlElement = document.getElementsByTagName('html')?.[0]

  if (htmlElement) {
    htmlElement.classList.toggle('dark', theme === 'dark')
  }

  setErudaTheme(theme)

  usarTerminal().setTheme(theme)
}

function setupEsJSTerminal() {
  const appElement = document.getElementById('app')

  if (!appElement) {
    throw new Error('No se ha encontrado el elemento #app')
  }

  const currentEsTerminalElement = document.getElementById('es-terminal')

  if (currentEsTerminalElement) {
    usarTerminal().destroyTerminal()
    appElement.removeChild(currentEsTerminalElement)
  }

  const newEsTerminalElement = document.createElement('div')
  newEsTerminalElement.id = 'es-terminal'
  newEsTerminalElement.className = 'w-full h-full absolute inset-0'
  appElement.appendChild(newEsTerminalElement)

  usarTerminal().setupTerminal(newEsTerminalElement, {
    theme,
  })
}

