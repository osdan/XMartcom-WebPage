// Obtener idioma guardado o usar español por defecto
let currentLang = localStorage.getItem('language') || 'es';

// Inicializar idioma al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLang);
    const langCombo = document.getElementById('lang-combo');
    if (langCombo) {
        langCombo.value = currentLang;
        langCombo.addEventListener('change', function() {
            currentLang = this.value;
            setLanguage(currentLang);
            localStorage.setItem('language', currentLang);
        });
    }
});

// Función para cambiar el idioma
function setLanguage(lang) {
    // Cambiar el atributo lang del HTML
    document.documentElement.lang = lang;

    // Cambiar textos de elementos con atributos data-es y data-en
    document.querySelectorAll('[data-es][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Cambiar placeholders de inputs
    document.querySelectorAll('[data-es-placeholder][data-en-placeholder]').forEach(element => {
        element.placeholder = element.getAttribute(`data-${lang}-placeholder`);
    });
}
