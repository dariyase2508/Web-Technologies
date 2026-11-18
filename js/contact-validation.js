
(function () {
    "use strict";

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const PHONE_REGEX = /^\+?[0-9]{10,15}$/;   // same pattern as the register form

    // Show or clear an error message for one field
    function setFieldError(input, message) {
        const errorEl = document.getElementById(input.id + "Error");
        if (errorEl) errorEl.textContent = message;
        input.classList.toggle("is-invalid", message !== "");
        input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
    }

    // Spaces, dashes and brackets are allowed when typing a phone number
    function normalizePhone(value) {
        return value.replace(/[\s\-().]/g, "");
    }

    window.clearContactFormErrors = function (form) {
        form.querySelectorAll("#name, #email, #reason, #phone, #message").forEach(function (input) {
            setFieldError(input, "");
        });
    };

    // Returns true when the whole form is valid
    window.validateContactForm = function (form) {
        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const reason = form.querySelector("#reason");
        const phone = form.querySelector("#phone");
        const message = form.querySelector("#message");
        const method = form.querySelector('input[name="contact-method"]:checked');

        const successBox = document.getElementById("successMessage");
        if (successBox) successBox.classList.add("d-none");

        let firstInvalid = null;
        function fail(input, text) {
            setFieldError(input, text);
            if (!firstInvalid) firstInvalid = input;
        }

        window.clearContactFormErrors(form);

        // Full name
        const nameValue = name.value.trim();
        if (nameValue === "") fail(name, "Full name is required.");
        else if (nameValue.length < 2) fail(name, "Name must be at least 2 characters.");

        // Email
        const emailValue = email.value.trim();
        if (emailValue === "") fail(email, "Email is required.");
        else if (!EMAIL_REGEX.test(emailValue)) fail(email, "Please enter a valid email, e.g. name@example.com.");

        // Reason for contact
        if (reason.value === "") fail(reason, "Please choose a reason for contact.");

        // Phone: mandatory only if the guest wants to be called back
        const phoneValue = normalizePhone(phone.value.trim());
        const phoneRequired = method && method.value === "phone";
        if (phoneValue === "" && phoneRequired) {
            fail(phone, "Phone number is required when you prefer a phone call.");
        } else if (phoneValue !== "" && !PHONE_REGEX.test(phoneValue)) {
            fail(phone, "Enter a valid phone number (10-15 digits, optional + at the start).");
        }

        // Message
        const messageValue = message.value.trim();
        if (messageValue === "") fail(message, "Please write a message.");
        else if (messageValue.length < 10) fail(message, "Message is too short (at least 10 characters).");

        if (firstInvalid) {
            firstInvalid.focus();
            return false;
        }
        return true;
    };

    // Remove an error as soon as the user starts fixing the field
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("contact-form");
        if (!form) return;

        form.querySelectorAll("#name, #email, #reason, #phone, #message").forEach(function (input) {
            const eventName = input.tagName === "SELECT" ? "change" : "input";
            input.addEventListener(eventName, function () {
                setFieldError(input, "");
            });
        });

        // Switching the contact method changes whether the phone is required
        form.querySelectorAll('input[name="contact-method"]').forEach(function (radio) {
            radio.addEventListener("change", function () {
                setFieldError(form.querySelector("#phone"), "");
            });
        });
    });
})();
