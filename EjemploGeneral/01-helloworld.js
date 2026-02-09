/* 
   ==========================================================================
   CURSO JAVASCRIPT: 01 - HOLA MUNDO & COMENTARIOS
   STB Academy - Educación Tecnológica
   ========================================================================== 
*/

// 1. SALIDA DE DATOS BÁSICA
// La consola es la herramienta #1 del desarrollador para depurar código.
console.log("¡Hola Mundo! Este mensaje viene desde la consola de JS.");

// También podemos escribir directamente en el cuerpo del documento (Uso menos frecuente hoy en día)
document.write("<h3>Aprendiendo JS en STB Academy 🚀</h3>");


// 2. EL ARTE DE LOS COMENTARIOS
// Los comentarios son notas para humanos que el motor de JS ignora por completo.

// A. Comentario de una sola línea: Se usa con doble barra inclinada.

/* 
   B. Comentario de varias líneas:
   Se usa para explicaciones extensas,
   encabezados de archivos o para 
   desactivar bloques de código temporalmente.
*/

/**
 * C. JSDoc (Comentarios de documentación):
 * Se usan para documentar funciones y clases.
 * @param {string} nombre El nombre del estudiante.
 */
function saludar(nombre) {
    console.log("Hola " + nombre);
}


// 💡 TIP PARA CLASE:
// En el navegador, abre la consola con F12 o Click Derecho > Inspeccionar > Console.
// Es donde verás el resultado de la mayoría de tus prácticas en este curso, o a través del terminal donde puedes usarlo instalando entornos de ejecución de JS como node, deno o bun
