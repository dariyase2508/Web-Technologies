
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("login-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get input values
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        // Get error elements
        const emailError = document.getElementById("login-email-error");
        const passwordError = document.getElementById("login-password-error");
        const loginError = document.getElementById("login-error");

        // Clear previous errors
        emailError.textContent = "";
        passwordError.textContent = "";
        loginError.textContent = "";

        let isValid = true;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Validate password
        if (password === "") {
            passwordError.textContent = "Password is required.";
            isValid = false;
        }

        if (!isValid) return;

        // Get registered users
        const users = JSON.parse(localStorage.getItem("leAudaciUsers")) || [];

        // Find matching user
        const user = users.find(function (registeredUser) {
            return (
                registeredUser.email.toLowerCase() === email.toLowerCase() &&
                registeredUser.password === password
            );
        });

        // Check credentials
        if (!user) {
            loginError.textContent = "Incorrect email or password.";
            return;
        }

        // Save logged-in user
        const { password: _pw, ...safeUser } = user;   // убираем пароль
        localStorage.setItem("leAudaciCurrentUser", JSON.stringify(safeUser));

        // Redirect to profile page
        window.location.href = "profile.html";

    });

});
