import * as espree from 'espree'
import * as escodegen from 'escodegen'
import { transpile } from '@es-js/core'
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import { obfuscate } from 'javascript-obfuscator'
import type { Options } from 'prettier'
import { convertCodeToSvg } from 'js2flowchart'

export function sanitizeCode(code: string) {
  if (!code.endsWith('\n'))
    code += '\n'

  return code
}

/**
 * Agrega un límite de tiempo de ejecución para cada bucle.
 * @author Ariya Hidayat.
 * @see https://github.com/chinchang/web-maker/blob/master/src/utils.js#L122
 */
export function addInfiniteLoopProtection(code: string, { timeout } = { timeout: 5000 }) {
  let loopId = 1
  const patches = []
  const varPrefix = '_wmloopvar'
  const varStr = 'var %d = Date.now();\n'
  const checkStr = `\nif (Date.now() - %d > ${timeout}) { window._handleInfiniteLoopException(new Error("Bucle infinito")); break;}\n`

  espree.parse(code, {
    range: true,
    ecmaVersion: 'latest',
    jsx: false,
    loc: true,
    tolerant: true,
    sourceType: 'module',
  }).body.forEach((node) => {
    switch (node.type) {
      case 'DoWhileStatement':
      case 'ForStatement':
      case 'ForInStatement':
      case 'ForOfStatement':
      case 'WhileStatement':
        var start = 1 + node.body.range[0]
        var end = node.body.range[1]
        var prolog = checkStr.replace('%d', varPrefix + loopId)
        var epilog = ''

        if (node.body.type !== 'BlockStatement') {
          // `while(1) doThat()` becomes `while(1) {doThat()}`
          prolog = `{${prolog}`
          epilog = '}'
          --start
        }

        patches.push({
          pos: start,
          str: prolog,
        })
        patches.push({
          pos: end,
          str: epilog,
        })
        patches.push({
          pos: node.range[0],
          str: varStr.replace('%d', varPrefix + loopId),
        })
        ++loopId
        break

      default:
        break
    }
  })

  patches
    .sort((a, b) => {
      return b.pos - a.pos
    })
    .forEach((patch) => {
      code = code.slice(0, patch.pos) + patch.str + code.slice(patch.pos)
    })

  return code
}

/**
 * @author @slevithan
 * @param str
 */
export function escapeQuotes(str) {
  return str.replace(/\\([\s\S])|(")/g, '\\$1$2')
}

export function unifyImports(imports: string) {
  const importMap = new Map()
  let output = ''

  imports.split('\n')
    .map(line => line.trim())
    .forEach((line) => {
      const importMatch = line.match(/^import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]\s*(;)?$/)

      if (!importMatch) {
        output += `${line}\n`
        return
      }

      const [matchedText, namedImports, moduleSpecifier] = importMatch

      if (!importMap.has(moduleSpecifier))
        importMap.set(moduleSpecifier, new Set())

      namedImports.split(/\s*,\s*/g).forEach((namedImport) => {
        importMap.get(moduleSpecifier).add(namedImport.trim())
      })
    })

  importMap.forEach((namedImports, moduleSpecifier) => {
    const sortedImports = [...namedImports].sort()
    output += `import { ${sortedImports.join(', ')} } from '${moduleSpecifier}'\n`
  })

  return output
}

export function formatCode(code: string, options?: Partial<Options>) {
  const transpiled = transpile(code)

  const formatted = prettier.format(transpiled, {
    parser: 'babel',
    plugins: [parserBabel],
    semi: false,
    ...options,
  })

  return transpile(formatted, true)
}

export function obfuscateCode(code: string) {
  return obfuscate(code, {
    compact: true,
    simplify: false,
  })
}

export function escapeTemplateLiteral(code: string) {
  return code.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

export function removeTopLevelAwaits(code: string) {
  const ast = espree.parse(code, {
    range: true,
    ecmaVersion: 'latest',
    jsx: false,
    loc: true,
    tolerant: true,
    sourceType: 'module',
  })

  const topLevelAwaits = ast.body.filter((node) => {
    if (node.type === 'AwaitExpression')
      return true

    if (
      node.type === 'ExpressionStatement'
      && node.expression.type === 'AwaitExpression'
    )
      return true

    return false
  })

  topLevelAwaits.forEach((node) => {
    const index = ast.body.indexOf(node)
    ast.body.splice(index, 1)
  })

  return escodegen.generate(ast)
}

export function getFlowchartSvg(code: string): string {
  try {
    return escapeTemplateLiteral(
      convertCodeToSvg(
        removeTopLevelAwaits(code),
      ),
    )
  }
  catch (error) {
    return `<div class="w-full h-full flex flex-col justify-center items-center text-center text-red-700 text-2xl font-sans">
    <p>¡Ups!</p>
    <p>No se pudo generar el Diagrama de Flujo</p>
</div>`
  }
}
