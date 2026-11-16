// ==========================================
// TASK 3: POPUP / MODAL FORM LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("newsletterModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const modalEmail = document.getElementById("modalEmail");
    let lastFocusedElement = null;

    if (modal) {
        // Гарантируем ARIA-атрибуты доступности на всех страницах
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
    }

    function openModal() {
        if (!modal) return;
        lastFocusedElement = document.activeElement;
        modal.classList.add("active");
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");

        if (modalEmail) {
            modalEmail.focus();
        } else if (closeBtn) {
            closeBtn.focus();
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");

        // Возвращаем фокус на элемент, который открыл модалку
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        } else if (openBtn) {
            openBtn.focus();
        }
    }

    // Open Modal
    if (openBtn && modal) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    }

    // Close Modal via Close Button (X)
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            closeModal();
        });
    }

    // Close Modal via Overlay Click (outside content)
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close Modal with Escape Key
    document.addEventListener("keydown", (e) => {
        const isOpen = modal && (modal.classList.contains("active") || modal.getAttribute("aria-hidden") === "false");
        if (e.key === "Escape" && isOpen) {
            closeModal();
        }
    });

    // Handle Form Submit inside Modal (без нативного alert)
    const modalForm = document.getElementById("modalSubscribeForm");
    if (modalForm) {
        modalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            closeModal();
            modalForm.reset();

            const toast = document.getElementById("toast-notification");
            const toastMsg = document.getElementById("toast-msg");
            if (toast && toastMsg) {
                toastMsg.textContent = "Grazie! Thank you for subscribing to LE AUDACI newsletter.";
                if (window.jQuery) {
                    $(toast).stop(true, true).fadeIn(400).delay(3000).fadeOut(400);
                } else {
                    toast.style.display = "block";
                    setTimeout(() => { toast.style.display = "none"; }, 3000);
                }
            }
        });
    }

    // ==========================================
    // TASK 5: CURRENT DATE AND TIME DISPLAY
    // ==========================================
    function updateDateTime() {
        const dateTimeElement = document.getElementById("currentDateTime");
        if (!dateTimeElement) return;

        const now = new Date();
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        };

        dateTimeElement.textContent = now.toLocaleString("en-US", options);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});