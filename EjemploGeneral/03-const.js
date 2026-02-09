/* 
   ==========================================================================
   CURSO JAVASCRIPT: 03 - CONSTANTES (const)
   STB Academy - Valores que no cambian de referencia
   ========================================================================== 
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/const
*/

/**
 * 💡 CONCEPTO CLAVE: 
 * 'const' se usa para valores que no deben ser reasignados.
 * 1. Deben inicializarse al momento de declararse.
 * 2. No se pueden reasignar (apuntar a otro valor).
 */

const PI = 3.141592;
console.log("El valor de PI es:", PI);

// PI = 3.15; // ❌ ERROR: Assignment to constant variable.


// 🧠 PUNTO PARA ALUMNOS AVANZADOS:
// ¿'const' significa que el valor es inmutable? NO necesariamente.

// A. En Tipos de Datos Primitivos (String, Number, Boolean):
// El valor es inmutable porque no se puede reasignar.
const NOMBRE = "STB Academy";


// B. En Tipos de Datos Compuestos (Objetos y Arrays):
// La REFERENCIA no cambia, pero el CONTENIDO puede mutar.

const COLORES = ["Blanco", "Negro", "Verde"];
console.log("Colores originales:", COLORES);

// ✅ Podemos mutar el contenido (cambiar elementos, agregar, quitar)
COLORES.push("Azul");
console.log("Colores después del push:", COLORES); 


const ESTUDIANTE = {
    nombre: "Oswaldo",
    edad: 47
};
console.log("Estudiante original:", ESTUDIANTE);

// ✅ Podemos mutar las propiedades del objeto
ESTUDIANTE.edad = 48;
ESTUDIANTE.correo = "oswaldo@stb.com";
console.log("Estudiante mutado:", ESTUDIANTE);

// ❌ Lo que NO podemos hacer es reasignar el objeto/array completo:
// ESTUDIANTE = { nombre: "Juan" }; // ERROR
// COLORES = ["Rojo", "Amarillo"]; // ERROR


/**
 * 💡 RECOMENDACIÓN PRO: 
 * Usa 'const' por defecto para evitar errores accidentales. 
 * Solo usa 'let' si sabes que el valor DEBE cambiar de referencia (ej. en un bucle).
 */