console.log("Hola mundo");
console.error("Esto es un error");
console.warn("Esto es una advertencia");

//esxisten otras formas de mostrar info pero son casi iguales a log asi que no se notan
//ejemplo: console.info("Esto es informacion"); console.debug("Esto es un debug");

console.log(true && false); // esto es para ver si es verdadero y falso
console.log(true || false); // esto es para ver si es verdadero o falso
console.log(!true); // esto es para ver si no es verdadero
console.log(true == true); // esto es para ver si es verdadero
console.log(true != true); // esto es para ver si es falso

let apodo = "Gabito"; //let es una variable que se puede cambiar
const Pi = 3.1416; //const es una variable que no se puede cambiar 
var SegApodo = "Rondon"; //var es una variable que se puede cambiar
let academia = "STB Academy";

// let es diferente a var porque let es una variable local y var es una variable global

//propiedades de las variables
console.log(apodo.length); //longitud de la variable
console.log(Pi.toFixed(2)); //decimales de la variable
console.log(SegApodo.toUpperCase()); //mayusculas de la variable
console.log(SegApodo.toLowerCase()); //minusculas de la variable

//metodos de las variables
console.log(apodo.slice(1, 2)); //cortar la variable
console.log(apodo.substring(0, 2)); //cortar la variable
console.log(apodo.replace("Gabito", "Rondon")); //reemplazar la variable
console.log(apodo.split(" ")); //dividir la variable
console.log(apodo.trim()); //eliminar espacios de la variable
console.log(apodo.includes("Gabito")); //ver si la variable incluye el texto
console.log("Separar por palabras:", frase.trim().split(" ")); //dividir la variable por palabras


//la diferencia entre slice y substring es que slice puede cortar la variable desde el final y substring no
//esto se hace con numeros negativos, ejemp: console.log(apodo.slice(-1, -2));

// contatenacion vs interpolacion

// contatenacion
let saludoTradicional = "Hola, mi nombre es " + apodo + " " + SegApodo + " y estudio en " + academia + ".";
console.log("Concatenación:", saludoTradicional); // Este es el metodo antiguo

// interpolacion
let saludoModerno = `Hola, mi nombre es ${apodo} ${SegApodo} y estudio en ${academia}.`;
console.log("Interpolación:", saludoModerno); // Este es el metodo moderno

// sus diferencias son que una te permite pegar los textos sin la necesidad de andar colocando espacios y la otra tienes que ajuro colocarlos

