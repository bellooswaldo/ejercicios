document.addEventListener('DOMContentLoaded', function() {
    const workItems = document.querySelectorAll('.workitem');
    const footerSpan = document.getElementById('mensaje-footer');

    workItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const year = this.dataset.year;
            const tech = this.dataset.tech;
            const category = this.dataset.category;

            // Alerta obligatoria
            alert(`Proyecto del año ${year} desarrollado con ${tech}. Categoría: ${category}.`);

            // Actualizar el footer (opcional, si quieres conservarlo)
            if (footerSpan) {
                footerSpan.textContent = ` Último proyecto: año ${year}, tecnología ${tech}, categoría ${category}.`;
            }
        });
    });
});