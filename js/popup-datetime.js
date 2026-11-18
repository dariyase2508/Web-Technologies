
document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("newsletterModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const modalForm = document.getElementById("modalSubscribeForm");

    // Inline message elements of the subscribe form (no alert() popups)
    const emailInput = document.getElementById("modalEmail");
    const checkbox = document.getElementById("modalCheck");
    const emailError = document.getElementById("modalEmailError");
    const checkError = document.getElementById("modalCheckError");
    const successMessage = document.getElementById("modalSuccess");

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    let closeTimer = null;   // auto-close after a successful subscription

    // Remove all validation / success messages from the modal
    function clearModalMessages() {
        if (emailError) emailError.textContent = "";
        if (checkError) checkError.textContent = "";
        if (successMessage) successMessage.textContent = "";
        if (emailInput) emailInput.classList.remove("is-invalid");
        if (checkbox) checkbox.classList.remove("is-invalid");
    }

    // Open modal
    if (openBtn && modal) {
        openBtn.addEventListener("click", function () {
            clearTimeout(closeTimer);
            clearModalMessages();

            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");

            const first = modal.querySelector("input");
            if (first) first.focus();
        });
    }

    // Close modal
    function closeModal() {
        if (!modal) return;

        clearTimeout(closeTimer);
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        clearModalMessages();

        if (openBtn) openBtn.focus();
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

    // Close with Escape (only when the modal is actually open)
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // Subscribe form: JS validation, errors are shown inside the modal
    if (modalForm && emailInput && checkbox) {

        // Hide an error as soon as the user fixes the field
        emailInput.addEventListener("input", function () {
            emailError.textContent = "";
            emailInput.classList.remove("is-invalid");
        });
        checkbox.addEventListener("change", function () {
            checkError.textContent = "";
            checkbox.classList.remove("is-invalid");
        });

        modalForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearModalMessages();

            const email = emailInput.value.trim();
            let isValid = true;

            if (email === "") {
                emailError.textContent = "Email is required.";
                emailInput.classList.add("is-invalid");
                isValid = false;
            } else if (!EMAIL_REGEX.test(email)) {
                emailError.textContent = "Please enter a valid email address.";
                emailInput.classList.add("is-invalid");
                isValid = false;
            }

            if (!checkbox.checked) {
                checkError.textContent = "Please agree to receive newsletters and updates.";
                checkbox.classList.add("is-invalid");
                isValid = false;
            }

            if (!isValid) return;

            successMessage.textContent = "Thank you for subscribing to LE AUDACI!";
            modalForm.reset();
            closeTimer = setTimeout(closeModal, 1800);
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
