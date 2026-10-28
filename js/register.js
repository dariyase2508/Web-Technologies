document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            // Получаем поля ввода
            const usernameInput = document.getElementById('reg-username'); // Убедитесь, что в HTML есть id="reg-username"
            const username = usernameInput ? usernameInput.value.trim() : '';
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim(); // .trim() убирает пробелы по краям
            const confirm = document.getElementById('reg-confirm').value.trim();

            // Получаем блоки для ошибок (убедитесь, что они есть в HTML)
            const usernameError = document.getElementById('reg-username-error');
            const emailError = document.getElementById('reg-email-error');
            const passwordError = document.getElementById('reg-password-error');
            const confirmError = document.getElementById('reg-confirm-error');

            let isValid = true;

            // 0. Проверка никнейма (без пробелов, только буквы, цифры и подчеркивание, минимум 3 символа)
            if (usernameError) {
                const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; 
                if (username === '') {
                    usernameError.textContent = 'Username cannot be empty.';
                    isValid = false;
                } else if (!usernameRegex.test(username)) {
                    usernameError.textContent = 'Username cannot contain spaces or special characters (only letters, numbers, _, 3-20 chars).';
                    isValid = false;
                } else {
                    usernameError.textContent = '';
                }
            }

            // 1. Проверка формата email 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address format.';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            // 2. Проверка минимальной длины пароля (минимум 6 символов, без учета пробелов по краям)
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

            // 4. Итоговая проверка
            if (isValid) {
                alert('Registration form successfully validated!');
                form.reset();
            }
        });
    }
});