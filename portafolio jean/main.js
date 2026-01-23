// Interactividad para el portafolio de Jean Hernandez

// 1. Cambiar tema claro/oscuro
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Guardar preferencia en localStorage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Mostrar notificación
    showNotification(`Modo ${isDarkMode ? 'oscuro' : 'claro'} activado`);
}

// 2. Efecto de escritura para el título principal
function typeWriterEffect() {
    const titleElement = document.querySelector('h1');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const speed = 50; // velocidad en milisegundos
    
    function typeWriter() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Agregar cursor parpadeante al final
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            titleElement.appendChild(cursor);
            
            // Hacer parpadear el cursor
            setInterval(() => {
                cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }, 500);
        }
    }
    
    // Iniciar el efecto después de 1 segundo
    setTimeout(typeWriter, 1000);
}

// 3. Mostrar notificaciones temporales
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: fadeInOut 3s ease-in-out;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(100px); }
            10% { opacity: 1; transform: translateX(0); }
            90% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(100px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Eliminar notificación después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// 4. Contador de tecnologías aprendidas
function createTechCounter() {
    const listItems = document.querySelectorAll('ul li');
    const counterElement = document.createElement('div');
    counterElement.className = 'tech-counter';
    counterElement.innerHTML = `
        <p><strong>Tecnologías en aprendizaje:</strong> <span id="tech-count">${listItems.length}</span></p>
        <button id="increment-btn">Agregar tecnología</button>
        <button id="reset-btn">Reiniciar contador</button>
    `;
    
    // Insertar después de la lista
    const list = document.querySelector('ul');
    if (list) {
        list.parentNode.insertBefore(counterElement, list.nextSibling);
        
        // Agregar funcionalidad a los botones
        const countElement = document.getElementById('tech-count');
        const incrementBtn = document.getElementById('increment-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        let count = listItems.length;
        
        incrementBtn.addEventListener('click', () => {
            count++;
            countElement.textContent = count;
            showNotification(`Total tecnologías: ${count}`);
        });
        
        resetBtn.addEventListener('click', () => {
            count = listItems.length;
            countElement.textContent = count;
            showNotification('Contador reiniciado');
        });
    }
}

// 5. Galería de imágenes con lightbox
function setupImageGallery() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
        // Hacer imágenes clicables
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            // Crear lightbox
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            // Crear imagen ampliada
            const enlargedImg = document.createElement('img');
            enlargedImg.src = img.src;
            enlargedImg.alt = img.alt;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(255,255,255,0.2);
            `;
            
            // Crear botón de cierre
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                background: none;
                border: none;
                color: white;
                font-size: 40px;
                cursor: pointer;
            `;
            
            // Agregar elementos al lightbox
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(enlargedImg);
            document.body.appendChild(lightbox);
            
            // Funcionalidad para cerrar
            const closeLightbox = () => {
                document.body.removeChild(lightbox);
            };
            
            lightbox.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            
            // Evitar que el clic en la imagen cierre el lightbox
            enlargedImg.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    });
}

// 6. Filtro para mostrar/ocultar secciones
function createSectionFilter() {
    const sections = document.querySelectorAll('h1, h2');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'section-filter';
    filterContainer.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 100;
    `;
    
    let filterHTML = '<h3 style="margin-top: 0;">Navegación</h3>';
    
    sections.forEach((section, index) => {
        if (section.tagName === 'H1' || section.tagName === 'H2') {
            const sectionId = `section-${index}`;
            section.id = sectionId;
            
            filterHTML += `
                <div style="margin: 5px 0;">
                    <input type="checkbox" id="filter-${sectionId}" checked>
                    <label for="filter-${sectionId}" style="cursor: pointer;">
                        ${section.textContent.substring(0, 20)}${section.textContent.length > 20 ? '...' : ''}
                    </label>
                </div>
            `;
        }
    });
    
    filterContainer.innerHTML = filterHTML;
    document.body.appendChild(filterContainer);
    
    // Agregar funcionalidad a los checkboxes
    sections.forEach((section, index) => {
        const checkbox = document.getElementById(`filter-section-${index}`);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                let nextElement = section.nextElementSibling;
                
                // Mostrar/ocultar sección
                section.style.display = checkbox.checked ? '' : 'none';
                
                // Mostrar/ocultar contenido hasta el siguiente encabezado
                while (nextElement && nextElement.tagName !== 'H1' && nextElement.tagName !== 'H2') {
                    nextElement.style.display = checkbox.checked ? '' : 'none';
                    nextElement = nextElement.nextElementSibling;
                }
            });
        }
    });
}

// 7. Agregar botón para modo oscuro
function addDarkModeButton() {
    const darkModeBtn = document.createElement('button');
    darkModeBtn.id = 'dark-mode-toggle';
    darkModeBtn.textContent = '🌙 Modo Oscuro';
    darkModeBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background: #2c3e50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 100;
        font-weight: bold;
    `;
    
    document.body.appendChild(darkModeBtn);
    darkModeBtn.addEventListener('click', toggleDarkMode);
}

// 8. Efecto de revelación al hacer scroll
function setupScrollReveal() {
    const elements = document.querySelectorAll('h1, h2, p, ul, img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// 9. Inicializar todas las funciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portafolio interactivo cargado');
    
    // Inicializar efectos
    typeWriterEffect();
    createTechCounter();
    setupImageGallery();
    addDarkModeButton();
    setupScrollReveal();
    
    // Cargar preferencia de modo oscuro
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const darkModeBtn = document.getElementById('dark-mode-toggle');
        if (darkModeBtn) {
            darkModeBtn.textContent = '☀️ Modo Claro';
        }
    }
    
    // Crear estilos para modo oscuro
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        .dark-mode {
            background-color: #1a1a1a;
            color: #e0e0e0;
        }
        
        .dark-mode h1, .dark-mode h2 {
            color: #3498db;
        }
        
        .dark-mode p {
            color: #cccccc;
        }
        
        .dark-mode ul {
            background-color: #2c2c2c;
            color: #e0e0e0;
        }
        
        .dark-mode li {
            color: #e0e0e0;
        }
        
        .dark-mode img {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }
        
        .dark-mode #dark-mode-toggle {
            background: #f39c12;
            color: #333;
        }
    `;
    document.head.appendChild(darkModeStyles);
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido al portafolio interactivo de Jean!');
    }, 2000);
});

// 10. Temporizador de visita
function setupVisitTimer() {
    const visitTimer = document.createElement('div');
    visitTimer.id = 'visit-timer';
    visitTimer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(52, 152, 219, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 100;
    `;
    
    document.body.appendChild(visitTimer);
    
    let seconds = 0;
    const timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        visitTimer.textContent = `Tiempo en esta página: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }, 1000);
}

// Agregar temporizador al DOMContentLoaded
document.addEventListener('DOMContentLoaded', setupVisitTimer);