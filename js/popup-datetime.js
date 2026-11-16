
document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("newsletterModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const modalForm = document.getElementById("modalSubscribeForm");

    // Open modal
    if (openBtn && modal) {
        openBtn.addEventListener("click", function () {
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
        });
    }

    // Close modal
    function closeModal() {
        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Close by clicking outside
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Close with Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    // Subscribe form
    if (modalForm) {
        modalForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailInput = modalForm.querySelector("input[type='email'], input");
            const checkbox = document.getElementById("modalCheck");

            const email = emailInput ? emailInput.value.trim() : "";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                alert("Please enter a valid email.");
                return;
            }

            if (checkbox && !checkbox.checked) {
                alert("Please agree to receive newsletters and updates.");
                return;
            }

            alert("Thank you for subscribing to LE AUDACI!");

            modalForm.reset();
            closeModal();
        });
    }

    // Current date and time
    function updateDateTime() {
        const element = document.getElementById("currentDateTime");

        if (!element) return;

        element.textContent = new Date().toLocaleString("en-US");
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

});

