document.addEventListener('DOMContentLoaded', function() {
    const colorBtn = document.getElementById('color-btn');
    if (colorBtn) {
        // Массив стильных оттенков для сайта ресторана
        const bgColors = ['#f9f6f0', '#e3f2fd', '#e8f5e9', '#fff3e0', '#f3e5f5', '#faedcd'];
        
        colorBtn.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * bgColors.length);
            document.body.style.backgroundColor = bgColors[randomIndex];
        });
    }
});