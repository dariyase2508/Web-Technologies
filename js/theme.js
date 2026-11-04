

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const bodyElement = document.body;

    // При загрузке проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'dark') {
        bodyElement.classList.add('dark-theme');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '☀️ Day Theme';
        }
    }

    // Обработка клика по кнопке
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('dark-theme');
            
            if (bodyElement.classList.contains('dark-theme')) {
                themeToggleBtn.textContent = '☀️ Day Theme';
                localStorage.setItem('site-theme', 'dark');
            } else {
                themeToggleBtn.textContent = '🌙 Night Theme';
                localStorage.setItem('site-theme', 'light');
            }
        });
    }
});