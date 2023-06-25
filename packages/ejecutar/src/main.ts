import './style.css'
import {
  init,
  previewTab,
  reset,
  setupTheme,
  togglePreview,
} from './ejecutar.js'

const flowchartSvg = '<!--FLOWCHART_SVG-->'
const activePreviewTab = '<!--ACTIVE_PREVIEW_TAB-->'

const scriptEls: HTMLScriptElement[] = []

window.process = { env: {} }
window.__modules__ = {}

window.__export__ = (mod, key, get) => {
  Object.defineProperty(mod, key, {
    enumerable: true,
    configurable: true,
    get,
  })
}

window.__dynamic_import__ = (key) => {
  return Promise.resolve(window.__modules__[key])
}

async function handle_message(ev: any) {
  const { action, cmd_id, args } = ev.data

  const send_message = (payload: any) => parent.postMessage({ ...payload }, ev.origin)
  const send_reply = (payload: any) => send_message({ ...payload, cmd_id })
  const send_ok = () => send_reply({ action: 'cmd_ok' })
  const send_error = (message: string, stack: string) => send_reply({ action: 'cmd_error', message, stack })

  if (action === 'eval') {
    await reset()

    try {
      if (scriptEls.length) {
        scriptEls.forEach((el) => {
          document.head.removeChild(el)
        })
        scriptEls.length = 0
      }

      let { script: scripts } = ev.data.args

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
        scriptEl.onerror = (error: any) => send_error(error.message, error.stack)
        scriptEls.push(scriptEl)
        await done
      }

      send_ok()
    }
    catch (error: any) {
      send_error(error.message, error.stack)
    }
  }
  else if (action === 'HIDE_PREVIEW') {
    togglePreview(args)
  }
  else if (action === 'previewException') {
    window._previewException(...args)
  }
  else if (action === 'PREVIEW') {
    // console.warn(['----- DEPRECATED -----', 'Please use PREVIEW_TAB instead'])
  }
  else if (action === 'PREVIEW_TAB') {
    previewTab(args)
  }
  else if (action === 'DARK_MODE') {
    setupTheme(args === true ? 'dark' : 'light')
  }
}

window.addEventListener('message', handle_message, false)

window.onerror = function (
  msg: string,
  url: string,
  lineNo: number,
  columnNo: number,
  error: Error | undefined,
) {
  // ignore errors from import map polyfill - these are necessary for
  // it to detect browser support
  if (msg.includes('module specifier “vue”')) {
    // firefox only error, ignore
    return false
  }
  if (msg.includes('Module specifier, \'vue')) {
    // Safari only
    return false
  }
  try {
    parent.postMessage({ action: 'error', value: error }, '*')
  }
  catch (e) {
    parent.postMessage({ action: 'error', value: msg }, '*')
  }
}

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason.message.includes('Cross-origin')) {
    event.preventDefault()
    return
  }
  try {
    parent.postMessage({ action: 'unhandledrejection', value: event.reason }, '*')
  }
  catch (e) {
    parent.postMessage({ action: 'unhandledrejection', value: event.reason.message }, '*')
  }
})

init()
