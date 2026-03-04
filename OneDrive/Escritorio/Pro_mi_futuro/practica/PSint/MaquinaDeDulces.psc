Proceso MaquinaDeDulces
    Definir dinero, precio, opcion, cambio Como Real
    
    Escribir "=== MÁQUINA DE DULCES ==="
    Escribir "Por favor, inserte su dinero:"
    Leer dinero
    
    Escribir "Catálogo de dulces:"
    Escribir "1. Chocolate - 1.5$"
    Escribir "2. Caramelo  - 1$"
    Escribir "3. Galleta   - 2$"
    
    Escribir "Seleccione una opción (1-3):"
    Leer opcion
    
    Segun opcion Hacer
        1:
            precio <- 1.5
            Escribir "Has elegido Chocolate ??"
        2:
            precio <- 1
            Escribir "Has elegido Caramelo ??"
        3:
            precio <- 2
            Escribir "Has elegido Galleta ??"
        De Otro Modo:
            Escribir "Opción inválida."
    FinSegun
    
    Si dinero >= precio Entonces
        cambio <- dinero - precio
        Escribir "Producto entregado."
        Escribir "Cambio: ", cambio, "$"
        Escribir "¡Gracias por su compra!"
    SiNo
        Escribir "Dinero insuficiente. Inserte más dinero."
    FinSi
FinProceso
