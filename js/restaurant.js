document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-restaurant-img');
    const thumbnails = document.querySelectorAll('.restaurant-thumb');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!mainImage || thumbnails.length === 0) return;

    const images = Array.from(thumbnails).map(thumb => ({
        src: thumb.src,
        alt: thumb.alt || 'Restaurant view'
    }));
    let currentIndex = 0;

    function highlightThumbnail(index) {
        thumbnails.forEach((t, i) => {
            if (i === index) {
                t.classList.add('border-danger', 'border-2');
                t.setAttribute('aria-current', 'true');
            } else {
                t.classList.remove('border-danger', 'border-2');
                t.removeAttribute('aria-current');
            }
        });
    }

    function updateGallery(index, animate = true) {
        currentIndex = index;
        highlightThumbnail(currentIndex);

        if (!animate) {
            mainImage.src = images[currentIndex].src;
            mainImage.alt = images[currentIndex].alt;
            return;
        }

        mainImage.classList.add('fade-out');

        setTimeout(() => {
            mainImage.src = images[currentIndex].src;
            mainImage.alt = images[currentIndex].alt;
            mainImage.classList.remove('fade-out');
        }, 200);
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateGallery(index, true);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            updateGallery(newIndex, true);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % images.length;
            updateGallery(newIndex, true);
        });
    }

    // Инициализация первой картинки без лишнего мигания
    updateGallery(0, false);
});