document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;

            const emailError = document.getElementById('reg-email-error');
            const passwordError = document.getElementById('reg-password-error');
            const confirmError = document.getElementById('reg-confirm-error');

            let isValid = true;

            // 1. Проверка формата email 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address format.';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            // 2. Проверка минимальной длины пароля (минимум 6 символов)
            if (password.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters long.';
                isValid = false;
            } else {
                passwordError.textContent = '';
            }

            // 3. Проверка совпадения пароля с подтверждением
            if (password !== confirm) {
                confirmError.textContent = 'Passwords do not match.';
                isValid = false;
            } else {
                confirmError.textContent = '';
            }

            
            if (isValid) {
                alert('Registration form successfully validated!');
                form.reset();
            }
        });
    }
});