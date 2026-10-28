document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-restaurant-img');
    const thumbnails = document.querySelectorAll('.restaurant-thumb');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!mainImage || thumbnails.length === 0) return;

    // Массив путей к картинкам
    const images = Array.from(thumbnails).map(thumb => thumb.src);
    let currentIndex = 0;

    function updateGallery(index) {
        currentIndex = index;
        
        // Плавное исчезновение
        mainImage.classList.add('fade-out');
        
        setTimeout(() => {
            mainImage.src = images[currentIndex];
            // Плавное появление
            mainImage.classList.remove('fade-out');
        }, 200);
        
        // Подсветка активной миниатюры
        thumbnails.forEach((t, i) => {
            if (i === currentIndex) {
                t.classList.add('border-danger', 'border-2');
            } else {
                t.classList.remove('border-danger', 'border-2');
            }
        });
    }

    // Клик по миниатюрам
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateGallery(index);
        });
    });

    // Кнопка «Назад»
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = (currentIndex - 1 + images.length) % images.length;
            updateGallery(newIndex);
        });
    }

    // Кнопка «Вперед»
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = (currentIndex + 1) % images.length;
            updateGallery(newIndex);
        });
    }

    // Инициализация первой картинки
    updateGallery(0);
});