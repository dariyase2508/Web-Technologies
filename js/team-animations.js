document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // TASK 4: JS Animations (Events + style.transform)
    // ==========================================
    
    // Находим все карточки участниц
    const teamCards = document.querySelectorAll('.team-card-animate');

    teamCards.forEach(card => {
        // Устанавливаем базовые параметры перехода (плавность)
        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease';

        // Событие: мышка наведена на карточку
        card.addEventListener('mouseenter', () => {
            // Поднимаем карточку вверх и немного увеличиваем
            card.style.transform = 'translateY(-12px) scale(1.02)';
            // Добавляем красивую терракотовую тень из нашей палитры
            card.style.boxShadow = '0 20px 40px rgba(184, 74, 47, 0.15)';
            card.style.cursor = 'pointer';
        });

        // Событие: мышка ушла с карточки
        card.addEventListener('mouseleave', () => {
            // Возвращаем в исходное положение
            card.style.transform = 'translateY(0) scale(1)';
            // Убираем тень (возвращаем к дефолтной)
            card.style.boxShadow = '0 4px 15px rgba(33, 21, 18, 0.05)';
        });
    });
});