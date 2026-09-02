document.addEventListener("DOMContentLoaded", () => {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const passwordConfirmInput =
        document.getElementById("passwordConfirm");

    const registerError =
        document.getElementById("registerError");


    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            registerError.textContent = "";

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const passwordConfirm =
                passwordConfirmInput
                    ? passwordConfirmInput.value
                    : password;


            /* ===============================
               ПРОВЕРКИ
            =============================== */

            if (!email || !password) {

                registerError.textContent =
                    "Введите email и пароль.";

                return;
            }


            if (password.length < 8) {

                registerError.textContent =
                    "Пароль должен содержать минимум 8 символов.";

                return;
            }


            if (password !== passwordConfirm) {

                registerError.textContent =
                    "Пароли не совпадают.";

                return;
            }


            const button =
                registerForm.querySelector(
                    "button[type='submit']"
                );


            button.disabled = true;

            button.textContent =
                "СОЗДАНИЕ АККАУНТА…";


            /* ===============================
               РЕГИСТРАЦИЯ
            =============================== */

            try {

                const response =
                    await fetch(
                        "/api/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                const data =
                    await response.json();


                /* ===============================
                   ОШИБКА
                =============================== */

                if (!response.ok) {

                    registerError.textContent =
                        data.detail ||
                        "Не удалось создать аккаунт.";

                    button.disabled = false;

                    button.textContent =
                        "✦   СОЗДАТЬ АККАУНТ";

                    return;
                }


                /* ===============================
                   РЕГИСТРАЦИЯ УСПЕШНА
                =============================== */

                /*
                 * backend автоматически создаёт
                 * session:
                 *
                 * request.session["user_id"]
                 *
                 * поэтому повторный login
                 * НЕ требуется.
                 */


                const returnUrl =
                    sessionStorage.getItem(
                        "amadeya_return_url"
                    );


                if (returnUrl) {

                    sessionStorage.removeItem(
                        "amadeya_return_url"
                    );

                    window.location.href =
                        returnUrl;

                    return;
                }


                window.location.href = "/";


            } catch (error) {

                console.error(error);

                registerError.textContent =
                    "Ошибка соединения с сервером.";

                button.disabled = false;

                button.textContent =
                    "✦   СОЗДАТЬ АККАУНТ";
            }

        }
    );

});
