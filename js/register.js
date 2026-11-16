
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("register-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get input values
        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const phone = document.getElementById("reg-phone").value.trim();
        const password = document.getElementById("reg-password").value;
        const confirm = document.getElementById("reg-confirm").value;

        // Get error elements
        const nameError = document.getElementById("reg-name-error");
        const emailError = document.getElementById("reg-email-error");
        const phoneError = document.getElementById("reg-phone-error");
        const passwordError = document.getElementById("reg-password-error");
        const confirmError = document.getElementById("reg-confirm-error");
        const successMessage = document.getElementById("register-success");

        // Clear previous messages
        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";
        successMessage.textContent = "";

        let isValid = true;

        // 1. Validate name
        if (name.length < 2) {
            nameError.textContent = "Please enter your full name (at least 2 characters).";
            isValid = false;
        }

        // 2. Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // 3. Validate phone
        const phoneRegex = /^\+?[0-9]{10,15}$/;

        if (phone === "") {
            phoneError.textContent = "Phone number is required.";
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            phoneError.textContent = "Enter a valid phone number (10-15 digits).";
            isValid = false;
        }

        // 4. Validate password
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (password === "") {
            passwordError.textContent = "Password is required.";
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            passwordError.textContent =
                "Password must contain at least 8 characters, uppercase, lowercase, a number and a special character.";
            isValid = false;
        }

        // 5. Confirm password
        if (confirm === "") {
            confirmError.textContent = "Please confirm your password.";
            isValid = false;
        } else if (password !== confirm) {
            confirmError.textContent = "Passwords do not match.";
            isValid = false;
        }

        // Stop if validation failed
        if (!isValid) return;

        // 6. Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem("leAudaciUsers")) || [];

        // 7. Check if email is already registered
        const existingUser = users.find(function (user) {
            return user.email.toLowerCase() === email.toLowerCase();
        });

        if (existingUser) {
            emailError.textContent = "This email is already registered.";
            return;
        }

        // 8. Create new user
        const newUser = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        // 9. Save user
        users.push(newUser);
        localStorage.setItem("leAudaciUsers", JSON.stringify(users));

        // 10. Show success message
        successMessage.textContent =
            "Registration successful! You can now log in.";

        // Clear form
        form.reset();

    });

});
