    // Инициализация AOS
        document.addEventListener('DOMContentLoaded', function () {
            AOS.init();
        });

        // Бургер-меню
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');

        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Обработка формы контактов
        document.getElementById('contactForm').addEventListener('submit', async function (e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('form-message');
            // Показываем состояние загрузки
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            formMessage.style.display = 'none';
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
                    form.reset();
                } else {
                    throw new Error('Ошибка сервера');
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.';
            } finally {
                formMessage.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить сообщение';
                // Плавная прокрутка к сообщению
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    