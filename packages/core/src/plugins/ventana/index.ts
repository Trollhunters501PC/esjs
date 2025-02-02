import {
    replaceObjectStaticMethods,
    replaceObjectStaticProperties,
    replaceObjects
  } from "../utils"
  export const report = () => "Converts ventana to window"

  export const properties = new Map<string, string>([
    ["caches", "caches"],
    ["cerrado", "closed"],
    ["consola", "console"],
    ["cookieAlmacen", "cookieStore"],
    ["sinCredenciales", "credentialless"],
    ["origenCruzadoAislado", "crossOriginIsolated"],
    ["cripto", "crypto"],
    ["elementosPersonalizados", "customElements"],
    ["relacionPixelesDispositivo", "devicePixelRatio"],
    ["documento", "document"],
    ["documentoImagenEnImagen", "documentPictureInPicture"],
    ["barrera", "fence"],
    ["elementoMarco", "frameElement"],
    ["marcos", "frames"],
    ["pantallaCompleta", "fullScreen"],
    ["historia", "history"],
    ["BDindexada", "indexedDB"],
    ["alturaInterna", "innerHeight"],
    ["anchuraInterna", "innerWidth"],
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
    ["abridor", "opener"],
    ["origen", "origin"],
    ["clusterAgentesOrigen", "originAgentCluster"],
    ["alturaExterna", "outerHeight"],
    ["anchuraExterna", "outerWidth"],
    ["desplazamientoPaginaX", "pageXOffset"],
    ["desplazamientoPaginaY", "pageYOffset"],
    ["padre", "parent"],
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
    ["tiposConfiable", "trustedTypes"],
    ["ventanaGrafica", "visualViewport"],
    ["ventana", "window"]
  ])

  export const objects = new Map<string, string>([["ventana", "window"]])

  export const methods = new Map<string, string>([
    ["decodificarBase64", "atob"],
    ["alerta", "alert"],
    ["codificarBase64", "btoa"],
    ["cancelarCuadroAnimacion", "cancelAnimationFrame"],
    ["cancelarLlamadaOciosa", "cancelIdleCallback"],
    ["limpiarIntervalo", "clearInterval"],
    ["limpiarTemporizador", "clearTimeout"],
    ["cerrar", "close"],
    ["confirmar", "confirm"],
    ["crearMapaBitsImagen", "createImageBitmap"],
    ["volcar", "dump"],
    ["consultar", "fetch"],
    ["buscar", "find"],
    ["enfocar", "focus"],
    ["obtenerEstiloCalculado", "getComputedStyle"],
    ["obtenerEstiloCalculadoPorDefecto", "getDefaultComputedStyle"],
    ["obtenerDetallesPantalla", "getScreenDetails"],
    ["obtenerSeleccion", "getSelection"],
    ["coincidirMedios", "matchMedia"],
    ["moverPor", "moveBy"],
    ["moverA", "moveTo"],
    ["abrir", "open"],
    ["publicarMensaje", "postMessage"],
    ["imprimir", "print"],
    ["preguntar", "prompt"],
    ["consultarFuentesLocales", "queryLocalFonts"],
    ["encolarMicrotarea", "queueMicrotask"],
    ["reportarError", "reportError"],
    ["solicitarCuadroAnimacion", "requestAnimationFrame"],
    ["solicitarLlamadaOciosa", "requestIdleCallback"],
    ["redimensionarPor", "resizeBy"],
    ["redimensionarA", "resizeTo"],
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
      ...replaceObjects({
        objects,
      }),
      ...replaceObjectStaticProperties({
        from: 'ventana',
        to: 'window',
        properties,
      }),
    }
}
