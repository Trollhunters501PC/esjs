import { setToEsJS } from './utils'
import * as booleano from './booleano'
import * as cadena from './cadena'
import * as consola from './consola'
import * as fecha from './fecha'
import * as mate from './mate'
import * as matriz from './matriz'
import * as numero from './numero'
import * as promesa from './promesa'
import * as soporte from './soporte'
import * as funcion from './funcion'
import * as json from './json'
import * as tipos from './tipos'
import * as navegador from './navegador'
import * as ventana from './ventana'
import * as apoderado from './apoderado'
import * as simbolo from './simbolo'
import * as enterogrande from './enterogrande'
import * as documento from './documento'

export const plugins = [
  ['consola', consola],
  ['matriz', matriz],
  ['cadena', cadena],
  ['fecha', fecha],
  ['numero', numero],
  ['promesa', promesa],
  ['mate', mate],
  ['booleano', booleano],
  ['funcion', funcion],
  ['soporte', soporte],
  ['json', json],
  ['navegador', navegador],
  ['ventana', ventana],
  ['apoderado', apoderado],
  ['simbolo', simbolo],
  ['enterogrande', enterogrande],
  ['documento', documento],
  ['tipos', tipos],
  ['tipos', objetos],
]

export { setToEsJS }
