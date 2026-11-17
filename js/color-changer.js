
document.addEventListener('DOMContentLoaded', function() {

    const colorBtn = document.getElementById('color-btn');

    const bgColors = [
        '#f9f6f0',
        '#e3f2fd',
        '#e8f5e9',
        '#fff3e0',
        '#f3e5f5',
        '#faedcd'
    ];

    if (colorBtn) {
        colorBtn.addEventListener('click', function() {

            // Do not change the background in dark mode
            if (document.body.classList.contains('dark-theme')) {
                return;
            }

            const randomIndex = Math.floor(Math.random() * bgColors.length);

            document.body.style.backgroundColor = bgColors[randomIndex];
        });
    }

});
