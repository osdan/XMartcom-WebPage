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
            // update mobile selector and saved language
            setLanguage(currentLang);
            const mobile = document.getElementById('lang-combo-mobile');
            if (mobile) mobile.value = currentLang;
            localStorage.setItem('language', currentLang);
        });
    }
    // Sync mobile language selector if present
    const langComboMobile = document.getElementById('lang-combo-mobile');
    if (langComboMobile) {
        langComboMobile.value = currentLang;
        langComboMobile.addEventListener('change', function() {
            currentLang = this.value;
            // update both selectors and saved language
            setLanguage(currentLang);
            const desktop = document.getElementById('lang-combo');
            if (desktop) desktop.value = currentLang;
            localStorage.setItem('language', currentLang);
        });
    }

    // Hamburger / mobile menu behavior
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.toggle('open');
            this.classList.toggle('active', isOpen);
            this.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a.navbar__link').forEach(a => {
            a.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('active');
                mobileMenu.setAttribute('hidden', '');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
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
