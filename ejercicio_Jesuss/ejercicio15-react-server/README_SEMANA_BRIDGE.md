# 🌉 Laboratorio: El Experimento del Puente

¡Bienvenido a la semana de integración definitiva! En este repositorio exploraremos la conexión vital entre el **Frontend** (React) y el **Backend** (Node.js Vanilla). Aprenderás cómo los datos fluyen a través del "puente" de una red usando el protocolo HTTP.

---

## 🏗️ Estructura del Proyecto

El laboratorio está dividido en dos grandes pilares:

1.  **`01-React-Client`**: Nuestra interfaz de usuario (el cliente) construida con Vite y React. Se encarga de realizar las *Requests* (peticiones).
2.  **`02-Node-Vanilla-Server`**: Nuestro cerebro central (el servidor) construido exclusivamente con el módulo `http` nativo de Node.js. Se encarga de enviar las *Responses* (respuestas).

---

## 🚀 Instrucciones de Ejecución

Para ver el experimento en acción, debes encender ambos motores:

### 1. Activar el Servidor (El Cerebro) 🧠
El servidor debe estar encendido para que el cliente tenga a quién preguntarle cosas.

1. Abre una terminal en la carpeta: `02-Node-Vanilla-Server`.
2. Ejecuta el comando:
   ```bash
   node index.js
   ```
3. Deberías ver el mensaje: `🌉 SERVIDOR MAESTRO ACTIVO: http://localhost:3001`.

### 2. Activar el Cliente (La Interfaz) 💻
Ahora pondremos en marcha la aplicación que el usuario verá.

1. Abre una terminal en la carpeta: `01-React-Client`.
2. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
3. Inicia el modo desarrollo:
   ```bash
   npm run dev
   ```
4. Abre el enlace que te proporcione Vite (usualmente `http://localhost:5173`).

---

## 🛠️ Endpoints de la API (Rutas)

Nuestro servidor de Node responde a las siguientes direcciones:

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/status` | Verifica si el servidor está vivo. |
| `GET` | `/api/items` | Devuelve una lista de "tesoros" (datos simulados). |
| `POST` | `/api/echo` | Recibe datos y los devuelve como un eco (ideal para pruebas). |

---

## 🆘 Resolución de Problemas (Troubleshooting)

*   **Error de CORS:** Si el navegador bloquea la petición, verifica que en `index.js` del servidor existan las cabeceras `Access-Control-Allow-Origin`.
*   **Puerto 3001 Ocupado:** Si el servidor no inicia, cierra cualquier otro proceso que use el puerto 3001 o cambia la constante `PORT` en el código.
*   **JSON Null o Vacío:** Asegúrate de enviar los datos desde React usando `JSON.stringify(tuObjeto)` y con la cabecera `'Content-Type': 'application/json'`.

---

> [!TIP]
> **Reto Maesto:** Intenta modificar el servidor para que acepte una nueva ruta `/api/users` que devuelva una lista de nombres de tus compañeros.

---
*STB Academy - Formando los Arquitectos del Futuro.*

