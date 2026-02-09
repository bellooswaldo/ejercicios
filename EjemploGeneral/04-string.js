/* 
   ==========================================================================
   CURSO JAVASCRIPT: 04 - CADENAS DE TEXTO (Strings & Template Literals)
   STB Academy - Manipulación de Texto
   ========================================================================== 
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String
*/

// 1. DECLARACIÓN Y PROPIEDADES BÁSICAS
let nombre = "Oswaldo";
let apellido = 'Bello';
let academia = `STB Academy`; // Backticks permiten interpolación

// Propiedad length: Longitud de la cadena
console.log("Longitud del nombre:", nombre.length); // 7


// 2. MÉTODOS COMUNES
let frase = "   JavaScript es el lenguaje de la Web   ";
console.log("Mayúsculas:", nombre.toUpperCase());
console.log("Minúsculas:", apellido.toLowerCase());

// Eliminar espacios al inicio y al final (Vital para formularios)
console.log("Texto limpio con trim():", frase.trim());

// Buscar contenido
console.log("¿Contiene 'lenguaje'?:", frase.includes("lenguaje")); // true

// Cortar/Dividir
console.log("Separar por palabras:", frase.trim().split(" ")); // Devuelve un Array


// 3. CONCATENACIÓN vs INTERPOLACIÓN (Template Literals)

// A. Forma Antigua (Concatenación con +)
// Es tediosa y propensa a errores con espacios.
let saludoTradicional = "Hola, mi nombre es " + nombre + " " + apellido + " y estudio en " + academia + ".";
console.log("Concatenación:", saludoTradicional);

// B. Forma Moderna (Template Strings con ``)
// Más legible, permite multilínea y expresiones dentro de ${}
let saludoModerno = `Hola, mi nombre es ${nombre} ${apellido} y estudio en ${academia}.`;
console.log("Interpolación:", saludoModerno);

// Ejemplo de multilínea (Ideal para HTML dinámico)
let listaHTML = `
    <ul>
        <li>Nombre: ${nombre}</li>
        <li>Estado: Estudiante Premium</li>
        <li>Año: ${new Date().getFullYear()}</li>
    </ul>
`;
console.log("HTML Multilínea:", listaHTML);


/**
 * 💡 TIP PARA LA CLASE:
 * Siempre que necesites mezclar variables con texto, usa Template Strings (backticks ``). 
 * Es el estándar profesional y evita errores de concatenación.
 */