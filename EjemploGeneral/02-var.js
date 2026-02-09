/* 
   ==========================================================================
   CURSO JAVASCRIPT: 02 - VARIABLES (var vs let)
   STB Academy - Lógica y Ámbito (Scope)
   ========================================================================== 
*/

/**
 * 💡 CONCEPTO CLAVE: 
 * Las variables son contenedores para almacenar valores de datos.
 * Históricamente usamos 'var', pero el estándar moderno (ES6) introdujo 'let'.
 
 https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/var
 https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/let
 */

// 1. EL PROBLEMA DE 'var' (Ámbito Global/Función)
// 'var' no respeta los bloques de código (llaves {}), solo funciones.
var musica = "Rock";
console.log("Variable Música antes del bloque (var):", musica);

{
    var musica = "Pop";
    console.log("Variable Música DENTRO del bloque (var):", musica);
}

// ⚠️ PROBLEMA: ¡'Pop' sobreescribió a 'Rock' fuera del bloque!
console.log("Variable Música después del bloque (var):", musica); 


console.log("-----------------------------------------");


// 2. LA SOLUCIÓN CON 'let' (Ámbito de Bloque)
// 'let' vive SOLAMENTE dentro de las llaves donde fue declarada.
let musica2 = "Rock";
console.log("Variable Música antes del bloque (let):", musica2);

{
    let musica2 = "Pop";
    console.log("Variable Música DENTRO del bloque (let):", musica2);
}

// ✅ RESULTADO: 'musica2' mantiene su valor original fuera del bloque.
console.log("Variable Música después del bloque (let):", musica2);


/**
 * 💡 DIFERENCIAS TÉCNICAS PARA LA CLASE:
 * 1. SCOPE: 'var' es global/función, 'let' es de bloque.
 * 2. RE-DECLARACIÓN: 'var' permite re-declarar (var x=1; var x=2;), 'let' lanza error.
 * 3. WINDOW OBJECT: 'var' se añade al objeto global 'window', 'let' no.
 */
