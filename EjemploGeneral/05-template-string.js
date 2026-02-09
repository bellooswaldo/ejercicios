
/* **********     Curso JavaScript: 6. Template Strings - ********** */

let nombre = "Oswaldo";
let apellido = "Bello";

// Concatenación
let saludo = "Hola mi nombre es " + nombre + " " + apellido + ".";
console.log(saludo);

// Interpolación de variables (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals)

// Template String
let saludo2 = `Hola mi nombre es ${nombre},  ${apellido}.Y estoy dando clases de programación`;
console.log(saludo2);

let ul = "<ul>< li > Primavera</li><li>Verano</li><li>Otoño</li><li>Invierno</li></ul > ";

console.log(ul);

// Template String con saltos de línea, ideal para HTML y CSS dinámico, en este caso JavaScript recorre el contenido de igual manera que el ejercicio anterior
let ul2 = `
  <ul>
    <li>Primavera</li>
    <li>Verano</li>
    <li>Otoño</li>
    <li>Invierno</li>
  </ul>`;

console.log(ul2);

// --- 💡 CONCEPTO: CONCATENACIÓN MULTILÍNEA (LEGACY vs MODERN) ---

// EL CASO DEL EJERCICIO:
// Antes de ES6, para construir bloques de HTML dinámico, los desarrolladores 
// usábamos el operador de asignación aditiva (+=). 
// ¡Ojo! Este método es propenso a errores (olvidar una comilla) y difícil de leer.

let ul3 = "<ul>";
ul3 += "<li> Primavera</li>";
ul3 += "<li>Verano</li>";
ul3 += "<li>Otoño</li>";
ul3 += "<li>Invierno</li>";
ul3 += "</ul>";

console.log("Método Tradicional (Concatenación):", ul3);

// LA EVOLUCIÓN (Template String):
// Con Backticks (` `), no solo ahorramos líneas de código y operadores +=,
// sino que el código se ve exactamente como el HTML final (WYSIWYG).
let ul4 = `
  <ul>
    <li>Primavera</li>
    <li>Verano</li>
    <li>Otoño</li>
    <li>Invierno</li>
  </ul>`;

console.log("Método Moderno (Template String):", ul4);



