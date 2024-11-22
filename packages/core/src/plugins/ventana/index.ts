import { 
    replaceObjectStaticMethods,
    replaceObjectStaticProperties,
    replaceObjects
  } from '../utils'
  export const report = () => 'Converts ventana to window'
  
  export const properties = new Map<string, string>([
    ["caches", "caches"],
    ["informacionCliente", "clientInformation"],
    ["cerrado", "closed"],
    ["consola", "console"],
    ["tiendaCookie", "cookieStore"],
    ["sinCredenciales", "credentialless"],
    ["origenCruzadoAislado", "crossOriginIsolated"],
    ["cripto", "crypto"],
    ["elementosPersonalizados", "customElements"],
    ["relacionPixelesDispositivo", "devicePixelRatio"],
    ["documento", "document"],
    ["documentoImagenEnImagen", "documentPictureInPicture"],
    ["cerca", "fence"],
    ["elementoMarco", "frameElement"],
    ["marcos", "frames"],
    ["pantallaCompleta", "fullScreen"],
    ["historia", "history"],
    ["BDindexada", "indexedDB"],
    ["alturaInterior", "innerHeight"],
    ["anchoInterior", "innerWidth"],
    ["esContextoSeguro", "isSecureContext"],
    ["colaLanzamiento", "launchQueue"],
    ["longitud", "length"],
    ["almacenamientoLocal", "localStorage"],
    ["ubicacion", "location"],
    ["barraUbicacion", "locationbar"],
    ["barraMenu", "menubar"],
    ["pantallaInternaXmoz", "mozInnerScreenX"],
    ["pantallaInternaYmoz", "mozInnerScreenY"],
    ["nombre", "name"],
    ["navegacion", "navigation"],
    ["navegador", "navigator"],
    ["abridora", "opener"],
    ["origen", "origin"],
    ["clusterAgentesOrigen", "originAgentCluster"],
    ["alturaExterior", "outerHeight"],
    ["anchoExterior", "outerWidth"],
    ["desplazamientoPaginaX", "pageXOffset"],
    ["desplazamientoPaginaY", "pageYOffset"],
    ["principal", "parent"],
    ["rendimiento", "performance"],
    ["barraPersonal", "personalbar"],
    ["programador", "scheduler"],
    ["pantalla", "screen"],
    ["pantallaX", "screenX"],
    ["pantallaIzquierda", "screenLeft"],
    ["pantallaY", "screenY"],
    ["pantallaSuperior", "screenTop"],
    ["barrasDesplazamiento", "scrollbars"],
    ["desplazamientoXmax", "scrollMaxX"],
    ["desplazamientoYmax", "scrollMaxY"],
    ["desplazamientoX", "scrollX"],
    ["desplazamientoY", "scrollY"],
    ["miMismo", "self"],
    ["almacenamientoSesion", "sessionStorage"],
    ["almacenamientoCompartido", "sharedStorage"],
    ["sintesisVoz", "speechSynthesis"],
    ["barraEstado", "statusbar"],
    ["barraHerramientas", "toolbar"],
    ["arriba", "top"],
    ["tiposConfianza", "trustedTypes"],
    ["ventanaGrafica", "visualViewport"],
    ["ventana", "window"]
  ])

  export const objects = new Map<string, string>([["ventana", "window"]])

  export const methods = new Map<string, string>([
    ["atabi", "atob"],
    ["alerta", "alert"],
    ["desenfocar", "blur"],
    ["biaat", "btoa"],
    ["cancelarAnimacionMarco", "cancelAnimationFrame"],
    ["cancelarFuncionDevueltaInactiva", "cancelIdleCallback"],
    ["eliminarIntervalo", "clearInterval"],
    ["eliminarTemporizador", "clearTimeout"],
    ["cerrar", "close"],
    ["confirmar", "confirm"],
    ["crearMapaBitsImagen", "createImageBitmap"],
    ["escribir", "dump"],
    ["consultar", "fetch"],
    ["buscar", "find"],
    ["enfocar", "focus"],
    ["obtenerEstiloComputacional", "getComputedStyle"],
    ["obtenerEstiloComputacionalPorDefecto", "getDefaultComputedStyle"],
    ["obtenerDetallesPantalla", "getScreenDetails"],
    ["obtenerSeleccion", "getSelection"],
    ["coincidenciaMedios", "matchMedia"],
    ["moverPor", "moveBy"],
    ["moverA", "moveTo"],
    ["abrir", "open"],
    ["publicarMensaje", "postMessage"],
    ["imprimir", "print"],
    ["preguntar", "prompt"],
    ["consultarFuentesLocales", "queryLocalFonts"],
    ["consultarMicroTareas", "queueMicrotask"],
    ["reportarError", "reportError"],
    ["solicitarMarcoAnimacion", "requestAnimationFrame"],
    ["solicitarFuncionDevueltaInactiva", "requestIdleCallback"],
    ["cambiarMedidaPor", "resizeBy"],
    ["cambiarMedidaA", "resizeTo"],
    ["desplazar", "scroll"],
    ["desplazarPor", "scrollBy"],
    ["desplazarPorLineas", "scrollByLines"],
    ["desplazarPorPaginas", "scrollByPages"],
    ["desplazarA", "scrollTo"],
    ["establecerIntervalo", "setInterval"],
    ["establecerTemporizador", "setTimeout"],
    ["mostrarSelectorDirectorio", "showDirectoryPicker"],
    ["mostrarSelectorAbrirArchivo", "showOpenFilePicker"],
    ["mostrarSelectorGuardarArchivo", "showSaveFilePicker"],
    ["parar", "stop"],
    ["clonEstructurado", "structuredClone"]
  ])

  export function replace() {
    return {
      ...replaceObjectStaticMethods({
        from: 'ventana',
        to: 'window',
        methods,
      }),
      ...replaceObjectStaticProperties({
        from: 'ventana',
        to: 'window',
        properties,
      }),
      ...replaceObjects({
        objects,
      })
    }
}