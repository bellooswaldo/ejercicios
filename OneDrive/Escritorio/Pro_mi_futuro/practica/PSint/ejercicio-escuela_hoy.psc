Algoritmo escuela_hoy
    dia <- "dia"
    lugar <- "escuela"
    hora <- "hora"
    comida <- "desayuno, almuerzo"
	horas_de_clase <- "hora de clase" 
	
    Escribir "¿Qué día es hoy?"
    Leer dia
	
    Escribir "Lugar de la escuela"
    Leer lugar
	
    Escribir "Hora de la clase de hoy (formato 12h)"
    Leer hora
	
    Escribir "¿Llevar desayuno? (1=Sí, 0=No)"
    Leer comida
	
    Escribir "¿Llevar almuerzo? (1=Sí, 0=No)"
    Leer comida
	
    Escribir "Horas de clases de hoy"
    Leer horas_de_clase
	
    Escribir "Resumen del día:"
    Escribir "Hoy es ", dia, " y tienes clases en ", lugar
    Escribir "La clase empieza a las ", hora
	
	Si desayuno = 1 Entonces
		Escribir "Debes llevar desayuno."
	FinSi
	
	Si almuerzo = 0 Entonces
		Escribir "Debes llevar almuerzo."
	FinSi

	
    Escribir "Tendrás ", horas_de_clase, " horas de clase hoy."
FinAlgoritmo

