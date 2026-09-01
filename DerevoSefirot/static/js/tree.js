document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ARCANA
    ===================================================== */

    const ARCANA = {

        1: {
            name: "Маг",
            element: "air",
            description:
                "Воля, намерение, действие и способность направлять энергию сознательно."
        },

        2: {
            name: "Жрица",
            element: "water",
            description:
                "Интуиция, внутреннее знание, тишина и контакт с глубинным восприятием."
        },

        3: {
            name: "Императрица",
            element: "fire",
            description:
                "Творчество, плодородие, проявление и способность создавать новую форму."
        },

        4: {
            name: "Император",
            element: "earth",
            description:
                "Структура, порядок, ответственность и управление собственной реальностью."
        },

        5: {
            name: "Иерофант",
            element: "air",
            description:
                "Знание традиции, обучение, передача опыта и поиск внутреннего наставника."
        },

        6: {
            name: "Влюблённые",
            element: "air",
            description:
                "Выбор, соединение противоположностей и осознанное принятие решения."
        },

        7: {
            name: "Колесница",
            element: "water",
            description:
                "Движение, направление силы, концентрация и достижение поставленной цели."
        },

        8: {
            name: "Сила",
            element: "water",
            description:
                "Внутренняя мощь, управление импульсом и соединение силы с осознанностью."
        },

        9: {
            name: "Отшельник",
            element: "earth",
            description:
                "Углубление, исследование себя, тишина и поиск собственного света."
        },

        10: {
            name: "Колесо Фортуны",
            element: "air",
            description:
                "Циклы, перемены, движение процессов и способность видеть закономерность."
        },

        11: {
            name: "Правосудие",
            element: "air",
            description:
                "Баланс, ответственность, причинность и честное взаимодействие с собой."
        },

        12: {
            name: "Повешенный",
            element: "water",
            description:
                "Изменение точки зрения, остановка, принятие и выход за привычное восприятие."
        },

        13: {
            name: "Смерть",
            element: "water",
            description:
                "Завершение старого цикла, трансформация и освобождение пространства."
        },

        14: {
            name: "Умеренность",
            element: "air",
            description:
                "Гармония, соединение противоположностей и восстановление внутреннего равновесия."
        },

        15: {
            name: "Дьявол",
            element: "fire",
            description:
                "Исследование привязанностей, желаний, ограничений и личной силы."
        },

        16: {
            name: "Башня",
            element: "water",
            description:
                "Разрушение устаревших конструкций и освобождение от ложных опор."
        },

        17: {
            name: "Звезда",
            element: "earth",
            description:
                "Надежда, вдохновение, направление и тонкая связь с внутренним светом."
        },

        18: {
            name: "Луна",
            element: "air",
            description:
                "Подсознание, символы, страхи, интуиция и исследование скрытых процессов."
        },

        19: {
            name: "Солнце",
            element: "air",
            description:
                "Ясность, проявленность, жизненная сила и открытое выражение себя."
        },

        20: {
            name: "Суд",
            element: "water",
            description:
                "Пробуждение, переоценка прошлого и переход к новому уровню осознанности."
        },

        21: {
            name: "Мир",
            element: "water",
            description:
                "Целостность, завершение цикла и интеграция полученного опыта."
        },

        22: {
            name: "Дурак",
            element: "fire",
            description:
                "Свобода, начало пути, открытость неизвестному и доверие движению жизни."
        }

    };


    /* =====================================================
       ELEMENT COLORS
    ===================================================== */

    const ELEMENT_COLORS = {

        fire: {
            color: "#ff7138",
            light: "#ffc06b",
            glow: "rgba(255,91,42,.72)"
        },

        water: {
            color: "#368eea",
            light: "#7dc8ff",
            glow: "rgba(43,139,255,.72)"
        },

        air: {
            color: "#9ce8ff",
            light: "#e7fbff",
            glow: "rgba(133,225,255,.68)"
        },

        earth: {
            color: "#8aa65b",
            light: "#c9dd91",
            glow: "rgba(138,166,91,.55)"
        },

        spirit: {
            color: "#d9c5ff",
            light: "#fff3ce",
            glow: "rgba(217,197,255,.6)"
        }

    };


    /* =====================================================
       DOM
    ===================================================== */

    const paths =
        document.querySelectorAll(".path");

    const panel =
        document.getElementById("panel");

    const arcanaContent =
        document.querySelector(".arcana-content");

    const arcanaNumber =
        document.getElementById("arcanaNumber");

    const arcanaTitle =
        document.getElementById("arcanaTitle");

    const arcanaDescription =
        document.getElementById("arcanaDescription");

    const activation =
        document.getElementById("activation");

    const activationName =
        document.getElementById("activationName");

    const activateButton =
        document.getElementById("activateButton");

    const closePanel =
        document.getElementById("closePanel");

    const pathInfo =
        document.getElementById("pathInfo");


    /* =====================================================
       ACCESS MODAL
    ===================================================== */

    const arcanaAccessModal =
        document.getElementById("arcanaAccessModal");

    const arcanaAccessClose =
        document.getElementById("arcanaAccessClose");

    const arcanaAccessPassword =
        document.getElementById("arcanaAccessPassword");

    const arcanaAccessSubmit =
        document.getElementById("arcanaAccessSubmit");

    const arcanaAccessError =
        document.getElementById("arcanaAccessError");

    const accessArcanaNumber =
        document.getElementById("accessArcanaNumber");

    const accessArcanaTitle =
        document.getElementById("accessArcanaTitle");


    let requestedArcanaId = null;


    /* =====================================================
       USER ARCANA ACCESS
    ===================================================== */

    let userArcanaAccess = new Set();

    /*
     * Важно:
     * Это Promise загрузки доступов.
     *
     * Благодаря ему при клике мы сначала убеждаемся,
     * что сервер уже сообщил, какие Арканы доступны.
     */

    let arcanaAccessLoaded =
        loadArcanaAccess();


    async function loadArcanaAccess() {

        try {

            const response =
                await fetch(
                    "/api/arcana/access",
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


            /*
             * Пользователь не авторизован.
             */

            if (response.status === 401) {

                userArcanaAccess =
                    new Set();

                return;

            }


            if (!response.ok) {

                console.error(
                    "Не удалось получить доступы к Арканам:",
                    response.status
                );

                return;

            }


            const data =
                await response.json();


            /*
             * Ожидаем:
             *
             * {
             *     "access": [1, 2, 5]
             * }
             */

            if (
                Array.isArray(data.access)
            ) {

                userArcanaAccess =
                    new Set(
                        data.access.map(
                            Number
                        )
                    );

            } else {

                userArcanaAccess =
                    new Set();

            }


            console.log(
                "Доступные Арканы:",
                [...userArcanaAccess]
            );

        } catch (error) {

            console.error(
                "Ошибка загрузки доступов:",
                error
            );

        }

    }


    /* =====================================================
       RELOAD ACCESS
    ===================================================== */

    async function refreshArcanaAccess() {

        /*
         * После выдачи нового доступа
         * заново спрашиваем сервер.
         */

        arcanaAccessLoaded =
            loadArcanaAccess();

        await arcanaAccessLoaded;

    }


    /* =====================================================
       CHECK AUTHORIZATION
    ===================================================== */

    async function isAuthenticated() {

        try {

            const response =
                await fetch(
                    "/api/me",
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

            return response.ok;

        } catch (error) {

            console.error(
                "Ошибка проверки авторизации:",
                error
            );

            return false;

        }

    }


    /* =====================================================
       SAVE ARCANA BEFORE LOGIN
    ===================================================== */

    function saveArcanaForLogin(id) {

        sessionStorage.setItem(
            "amadeya_return_arcana",
            String(id)
        );

        sessionStorage.setItem(
            "amadeya_return_url",
            window.location.pathname
        );

    }


    /* =====================================================
       APPLY ARCANA THEME
    ===================================================== */

    function applyElementTheme(element) {

        const theme =
            ELEMENT_COLORS[element] ||
            ELEMENT_COLORS.spirit;


        if (arcanaContent) {

            arcanaContent.style.setProperty(
                "--arcana-color",
                theme.color
            );

            arcanaContent.style.setProperty(
                "--arcana-light",
                theme.light
            );

            arcanaContent.style.setProperty(
                "--arcana-glow",
                theme.glow
            );

        }


        if (activation) {

            activation.style.setProperty(
                "--activation-color",
                theme.color
            );

            activation.style.setProperty(
                "--activation-light",
                theme.light
            );

        }

    }


    /* =====================================================
       OPEN ARCANA CONTENT
    ===================================================== */

    function openArcana(id) {

        const arcana =
            ARCANA[id];

        if (!arcana) {
            return;
        }


        if (arcanaNumber) {

            arcanaNumber.textContent =
                String(id).padStart(2, "0");

        }


        if (arcanaTitle) {

            arcanaTitle.textContent =
                arcana.name;

        }


        if (arcanaDescription) {

            arcanaDescription.textContent =
                arcana.description;

        }


        if (activationName) {

            activationName.textContent =
                arcana.name;

        }


        applyElementTheme(
            arcana.element
        );


        if (panel) {

            panel.classList.add(
                "has-arcana"
            );

        }


        paths.forEach(path => {

            path.classList.remove(
                "active"
            );

        });


        const current =
            document.querySelector(
                `.path[data-id="${id}"]`
            );


        if (current) {

            current.classList.add(
                "active"
            );

        }

    }


    /* =====================================================
       CLOSE ARCANA PANEL
    ===================================================== */

    function closeArcanaPanel() {

        if (panel) {

            panel.classList.remove(
                "has-arcana"
            );

        }


        paths.forEach(path => {

            path.classList.remove(
                "active"
            );

        });

    }


    /* =====================================================
       OPEN ACCESS WINDOW
    ===================================================== */

    async function openArcanaAccess(id) {

        const arcana =
            ARCANA[id];

        if (!arcana) {
            return;
        }


        /*
         * Ждём загрузки доступов с сервера.
         */

        await arcanaAccessLoaded;


        /*
         * -------------------------------------------------
         * ГЛАВНОЕ ИЗМЕНЕНИЕ
         * -------------------------------------------------
         *
         * Если доступ к этому Аркану уже есть,
         * пароль больше НЕ спрашиваем.
         */

        if (
            userArcanaAccess.has(id)
        ) {

            console.log(
                `Доступ к Аркану ${id} уже есть. Открываем.`
            );

            openArcana(id);

            return;

        }


        /*
         * Доступа пока нет.
         *
         * Проверяем авторизацию.
         */

        const authenticated =
            await isAuthenticated();


        if (!authenticated) {

            saveArcanaForLogin(id);

            window.location.href =
                "/login";

            return;

        }


        /*
         * Пользователь авторизован,
         * но доступа к этому Аркану нет.
         *
         * Показываем окно персонального кода.
         */

        requestedArcanaId =
            id;


        if (accessArcanaNumber) {

            accessArcanaNumber.textContent =
                String(id).padStart(2, "0");

        }


        if (accessArcanaTitle) {

            accessArcanaTitle.textContent =
                arcana.name;

        }


        if (arcanaAccessPassword) {

            arcanaAccessPassword.value =
                "";

        }


        if (arcanaAccessError) {

            arcanaAccessError.textContent =
                "";

        }


        if (arcanaAccessModal) {

            arcanaAccessModal.classList.add(
                "show"
            );

        }


        setTimeout(() => {

            if (arcanaAccessPassword) {

                arcanaAccessPassword.focus();

            }

        }, 250);

    }


    /* =====================================================
       CLOSE ACCESS WINDOW
    ===================================================== */

    function closeArcanaAccess() {

        if (arcanaAccessModal) {

            arcanaAccessModal.classList.remove(
                "show"
            );

        }


        requestedArcanaId =
            null;


        if (arcanaAccessPassword) {

            arcanaAccessPassword.value =
                "";

        }


        if (arcanaAccessError) {

            arcanaAccessError.textContent =
                "";

        }

    }


    /* =====================================================
       SUBMIT ACCESS CODE
    ===================================================== */

    async function submitArcanaAccess() {

        if (!requestedArcanaId) {
            return;
        }


        const password =
            arcanaAccessPassword.value.trim();


        if (!password) {

            arcanaAccessError.textContent =
                "Введите код доступа.";

            arcanaAccessPassword.focus();

            return;

        }


        arcanaAccessSubmit.disabled =
            true;


        arcanaAccessError.textContent =
            "Проверка доступа…";


        try {

            const response =
                await fetch(
                    "/api/arcana/access",
                    {
                        method: "POST",

                        credentials:
                            "include",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },

                        body: JSON.stringify({

                            arcana_id:
                                requestedArcanaId,

                            password:
                                password

                        })
                    }
                );


            const data =
                await response.json();


            /*
             * Сессия закончилась.
             */

            if (response.status === 401) {

                const id =
                    requestedArcanaId;


                closeArcanaAccess();


                saveArcanaForLogin(id);


                window.location.href =
                    "/login";

                return;

            }


            /*
             * Неверный код.
             */

            if (!response.ok) {

                arcanaAccessError.textContent =
                    data.detail ||
                    "Доступ запрещён.";

                arcanaAccessSubmit.disabled =
                    false;

                return;

            }


            /*
             * Код правильный.
             *
             * Теперь добавляем Аркан
             * в локальный список доступов.
             */

            const id =
                requestedArcanaId;


            userArcanaAccess.add(id);


            /*
             * Заодно синхронизируемся
             * с сервером.
             */

            await refreshArcanaAccess();


            closeArcanaAccess();


            /*
             * Теперь Аркан открывается.
             */

            openArcana(id);

        } catch (error) {

            console.error(
                "Ошибка доступа к Аркану:",
                error
            );


            arcanaAccessError.textContent =
                "Ошибка соединения с сервером.";


            arcanaAccessSubmit.disabled =
                false;

            return;

        }


        arcanaAccessSubmit.disabled =
            false;

    }


    /* =====================================================
       PATH EVENTS
    ===================================================== */

    paths.forEach(path => {


        /* -------------------------------------------------
           HOVER
        ------------------------------------------------- */

        path.addEventListener(
            "mouseenter",
            () => {

                const id =
                    path.dataset.id;

                const name =
                    path.dataset.name;

                const element =
                    path.dataset.element;


                if (pathInfo) {

                    pathInfo.textContent =
                        `${String(id).padStart(2, "0")} · ${name} · ${element}`;

                    pathInfo.classList.add(
                        "show"
                    );

                }

            }
        );


        /* -------------------------------------------------
           MOUSE MOVE
        ------------------------------------------------- */

        path.addEventListener(
            "mousemove",
            event => {

                if (!pathInfo) {
                    return;
                }


                pathInfo.style.left =
                    `${event.clientX + 16}px`;


                pathInfo.style.top =
                    `${event.clientY + 16}px`;

            }
        );


        /* -------------------------------------------------
           MOUSE LEAVE
        ------------------------------------------------- */

        path.addEventListener(
            "mouseleave",
            () => {

                if (pathInfo) {

                    pathInfo.classList.remove(
                        "show"
                    );

                }

            }
        );


        /* -------------------------------------------------
           CLICK
        ------------------------------------------------- */

        path.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        path.dataset.id
                    );


                if (!id) {
                    return;
                }


                openArcanaAccess(id);

            }
        );

    });


    /* =====================================================
       ACCESS MODAL — CLOSE
    ===================================================== */

    if (arcanaAccessClose) {

        arcanaAccessClose.addEventListener(
            "click",
            closeArcanaAccess
        );

    }


    /* =====================================================
       ACCESS MODAL — OUTSIDE CLICK
    ===================================================== */

    if (arcanaAccessModal) {

        arcanaAccessModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    arcanaAccessModal
                ) {

                    closeArcanaAccess();

                }

            }
        );

    }


    /* =====================================================
       ACCESS MODAL — SUBMIT
    ===================================================== */

    if (arcanaAccessSubmit) {

        arcanaAccessSubmit.addEventListener(
            "click",
            submitArcanaAccess
        );

    }


    /* =====================================================
       ACCESS MODAL — ENTER / ESC
    ===================================================== */

    if (arcanaAccessPassword) {

        arcanaAccessPassword.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    submitArcanaAccess();

                }


                if (event.key === "Escape") {

                    closeArcanaAccess();

                }

            }
        );

    }


    /* =====================================================
       CLOSE MAIN PANEL
    ===================================================== */

    if (closePanel) {

        closePanel.addEventListener(
            "click",
            closeArcanaPanel
        );

    }


    /* =====================================================
       ACTIVATION
    ===================================================== */

    if (activateButton) {

        activateButton.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        arcanaNumber.textContent
                    );


                const arcana =
                    ARCANA[id];


                if (!arcana) {
                    return;
                }


                if (activationName) {

                    activationName.textContent =
                        arcana.name;

                }


                activateButton.classList.add(
                    "activating"
                );


                if (activation) {

                    activation.classList.add(
                        "show"
                    );

                }


                setTimeout(
                    () => {

                        if (activation) {

                            activation.classList.remove(
                                "show"
                            );

                        }


                        activateButton.classList.remove(
                            "activating"
                        );

                    },
                    1900
                );

            }
        );

    }


    /* =====================================================
       ESC — GLOBAL
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                arcanaAccessModal &&
                arcanaAccessModal.classList.contains("show")
            ) {

                closeArcanaAccess();

                return;

            }


            if (activation) {

                activation.classList.remove(
                    "show"
                );

            }


            closeArcanaPanel();

        }
    );


    /* =====================================================
       RESTORE ARCANA AFTER LOGIN
    ===================================================== */

    async function restoreArcanaAfterLogin() {

        const savedArcana =
            sessionStorage.getItem(
                "amadeya_return_arcana"
            );


        if (!savedArcana) {
            return;
        }


        sessionStorage.removeItem(
            "amadeya_return_arcana"
        );


        const id =
            Number(savedArcana);


        if (!ARCANA[id]) {
            return;
        }


        /*
         * Ждём получения актуальных доступов
         * после авторизации.
         */

        await refreshArcanaAccess();


        /*
         * Если доступ уже существует —
         * открываем Аркан сразу.
         */

        if (
            userArcanaAccess.has(id)
        ) {

            setTimeout(() => {

                openArcana(id);

            }, 300);

            return;

        }


        /*
         * Если доступа ещё нет,
         * показываем окно кода.
         */

        setTimeout(() => {

            openArcanaAccess(id);

        }, 300);

    }


    /* =====================================================
       START
    ===================================================== */

    restoreArcanaAfterLogin();

});