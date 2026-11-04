// ==========================================
// TASK 3: POPUP / MODAL FORM LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('newsletterModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    // Open Modal
    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        });
    }

    // Close Modal via Close Button (X)
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    // Close Modal via Overlay Click (outside content)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close Modal with Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    // Handle Form Submit inside Modal
    const modalForm = document.getElementById('modalSubscribeForm');
    document.querySelector
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Grazie! Thank you for subscribing to LE AUDACI newsletter.');
            closeModal();
            modalForm.reset();
        });
    }

    // ==========================================
    // TASK 5: CURRENT DATE AND TIME DISPLAY
    // ==========================================
    function updateDateTime() {
        const dateTimeElement = document.getElementById('currentDateTime');
        if (!dateTimeElement) return;

        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        // Formats to: "October 13, 2026, 06:40:00 PM"
        const formattedDate = now.toLocaleString('en-US', options);
        dateTimeElement.textContent = formattedDate;
    }

    // Initial call & update every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});