document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // TASK 1: Manipulating Attributes (Rating Stars)
    // ==========================================
    const stars = document.querySelectorAll('.star-icon');
    const ratingInput = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            // Получаем значение кликнутой звезды
            const selectedValue = parseInt(e.target.getAttribute('data-value'));
            ratingInput.value = selectedValue;

            // Закрашиваем текущую и все предыдущие
            stars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= selectedValue) {
                    s.classList.remove('text-muted');
                    s.classList.add('text-warning'); // Делаем желтой
                    s.style.transform = 'scale(1.2)'; // Анимация увеличения
                    setTimeout(() => s.style.transform = 'scale(1)', 200);
                } else {
                    s.classList.remove('text-warning');
                    s.classList.add('text-muted'); // Возвращаем серый цвет
                }
            });
        });
    });

    // ==========================================
    // TASK 3: Event Listeners (Reset Button)
    // ==========================================
    const resetBtn = document.getElementById('resetFormBtn');
    const contactForm = document.getElementById('contact-form');

    if (resetBtn && contactForm) {
        resetBtn.addEventListener('click', () => {
            // Используем querySelectorAll и forEach по требованию PDF
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = ''; // Очищаем текст
                }
            });

            // Сбрасываем рейтинг звезд обратно в серый
            stars.forEach(s => {
                s.classList.remove('text-warning');
                s.classList.add('text-muted');
            });
            ratingInput.value = 0;
        });
    }

    // ==========================================
    // TASK 2: Callbacks (Async Contact Form)
    // ==========================================
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Останавливаем перезагрузку страницы

            // Меняем текст кнопки для эффекта загрузки
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
            submitBtn.disabled = true;

            // Callback-функция, которая выполнится после "отправки"
            function handleSuccessCallback() {
                // Показываем сообщение
                successMessage.classList.remove('d-none');
                successMessage.style.opacity = '0';
                
                // Плавное появление
                setTimeout(() => {
                    successMessage.style.transition = 'opacity 0.5s ease';
                    successMessage.style.opacity = '1';
                }, 10);

                // Возвращаем кнопку в исходное состояние
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Через 4 секунды очищаем форму и прячем сообщение
                setTimeout(() => {
                    resetBtn.click(); // Вызываем наш же клик по кнопке сброса
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.classList.add('d-none'), 500);
                }, 4000);
            }

            // Имитируем асинхронный запрос на сервер (задержка 1.5 секунды)
            setTimeout(handleSuccessCallback, 1500);
        });
    }
});