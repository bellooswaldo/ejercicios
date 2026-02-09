
const lista = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
    const content = input.value.trim();
    const item = document.createElement("li");
    
    item.textContent = content;
    lista.appendChild(item);
    input.value = "";
})