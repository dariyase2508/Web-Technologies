document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // TASK 4: JS Animations (Events + style.transform)
    // ==========================================
    

    const teamCards = document.querySelectorAll('.team-card-animate');

    teamCards.forEach(card => {

        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease';


        card.addEventListener('mouseenter', () => {

            card.style.transform = 'translateY(-12px) scale(1.02)';

            card.style.boxShadow = '0 20px 40px rgba(184, 74, 47, 0.15)';
            card.style.cursor = 'pointer';
        });


        card.addEventListener('mouseleave', () => {

            card.style.transform = 'translateY(0) scale(1)';

            card.style.boxShadow = '0 4px 15px rgba(33, 21, 18, 0.05)';
        });
    });
});