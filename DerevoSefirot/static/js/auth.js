document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const loginError =
        document.getElementById("loginError");


    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            loginError.textContent = "";

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {

                loginError.textContent =
                    "Введите email и пароль.";

                return;
            }


            const button =
                loginForm.querySelector(
                    "button[type='submit']"
                );

            button.disabled = true;

            button.textContent =
                "ВХОД…";


            try {

                const response =
                    await fetch(
                        "/api/login",
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


                if (!response.ok) {

                    loginError.textContent =
                        data.detail ||
                        "Не удалось выполнить вход.";

                    button.disabled = false;

                    button.textContent =
                        "✦   ВОЙТИ";

                    return;
                }


                /*
                 * Авторизация успешна.
                 *
                 * Если пользователь пришёл
                 * к авторизации после клика
                 * по Аркану — возвращаем его
                 * обратно.
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

                loginError.textContent =
                    "Ошибка соединения с сервером.";

                button.disabled = false;

                button.textContent =
                    "✦   ВОЙТИ";
            }

        }
    );

});
