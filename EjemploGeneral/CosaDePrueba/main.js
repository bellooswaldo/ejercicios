const input = document.querySelector("input");
const lista = document.querySelector("#lista");
const boton = document.querySelector("button");

boton.addEventListener("click", () => {
    if (input.value.trim().length == 0) {
        alert("El valor no esta permitido");
    } else {
        const item = document.createElement("li");
        item.textContent = input.value;
        lista.appendChild(item);
    }
})