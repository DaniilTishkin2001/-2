"use strict";


/* =====================================================
   ARCANA
===================================================== */

const ARCANA_NAMES = {

    1: "Маг",
    2: "Жрица",
    3: "Императрица",
    4: "Император",
    5: "Иерофант",
    6: "Влюблённые",
    7: "Колесница",
    8: "Сила",
    9: "Отшельник",
    10: "Колесо Фортуны",
    11: "Правосудие",
    12: "Повешенный",
    13: "Смерть",
    14: "Умеренность",
    15: "Дьявол",
    16: "Башня",
    17: "Звезда",
    18: "Луна",
    19: "Солнце",
    20: "Суд",
    21: "Мир",
    22: "Дурак"

};


/* =====================================================
   DOM
===================================================== */

const usersList =
    document.getElementById("usersList");

const globalError =
    document.getElementById("globalError");

const refreshUsers =
    document.getElementById("refreshUsers");

const logoutButton =
    document.getElementById("logoutButton");


/* =====================================================
   API
===================================================== */

async function api(
    url,
    options = {}
) {

    const response =
        await fetch(
            url,
            {
                credentials: "same-origin",

                ...options,

                headers: {
                    "Content-Type":
                        "application/json",

                    ...(options.headers || {})
                }
            }
        );


    const data =
        await response.json()
            .catch(() => ({}));


    if (!response.ok) {

        throw new Error(
            data.detail ||
            `Ошибка сервера: ${response.status}`
        );

    }


    return data;

}


/* =====================================================
   LOAD USERS
===================================================== */

async function loadUsers() {

    usersList.textContent =
        "Загрузка...";

    globalError.textContent = "";


    try {

        const users =
            await api(
                "/api/admin/users"
            );


        renderUsers(users);

    }

    catch (error) {

        console.error(error);

        globalError.textContent =
            error.message;

        usersList.textContent =
            "";

    }

}


/* =====================================================
   RENDER USERS
===================================================== */

function renderUsers(users) {

    if (!users.length) {

        usersList.innerHTML =
            "<p>Пользователей пока нет.</p>";

        return;

    }


    usersList.innerHTML =
        users
            .map(renderUser)
            .join("");


    attachUserEvents();

}


/* =====================================================
   RENDER USER
===================================================== */

function renderUser(user) {

    const arcana =
        user.arcana || [];


    const arcanaHtml =
        arcana.length

            ?

        arcana
            .sort((a, b) => a - b)
            .map(id => {

                return `
                    <span class="arcana-badge">
                        ${String(id).padStart(2, "0")}
                        ·
                        ${ARCANA_NAMES[id] || ""}
                    </span>
                `;

            })
            .join("")

            :

        `<span style="color:#777">
            Нет активных доступов
        </span>`;


    const options =
        Array.from(
            { length: 22 },
            (_, index) => {

                const id =
                    index + 1;

                return `
                    <option value="${id}">
                        ${String(id).padStart(2, "0")}
                        ·
                        ${ARCANA_NAMES[id]}
                    </option>
                `;

            }
        )
        .join("");


    return `

        <div
            class="user-card ${!user.is_active ? "inactive" : ""}"
            data-user-id="${user.id}"
        >

            <div class="user-header">

                <div>

                    <div class="user-email">
                        ${escapeHtml(user.email)}
                    </div>

                    <div class="user-id">
                        ID: ${user.id}
                    </div>

                </div>


                <div>

                    ${
                        user.is_admin

                            ?

                        `<div class="admin-badge">
                            ADMIN
                        </div>`

                            :

                        ""
                    }

                    ${
                        user.is_active

                            ?

                        `<span style="color:#7fdc9a">
                            Активен
                        </span>`

                            :

                        `<span style="color:#ff7777">
                            Заблокирован
                        </span>`
                    }

                </div>

            </div>


            <div>

                <div style="
                    color:#888;
                    font-size:12px;
                    letter-spacing:2px;
                    margin-bottom:10px;
                ">
                    ДОСТУПНЫЕ АРКАНЫ
                </div>


                <div class="arcana-list">

                    ${arcanaHtml}

                </div>

            </div>


            <div class="access-controls">

                <select
                    class="arcana-select"
                    data-action="select"
                >

                    ${options}

                </select>


                <button
                    class="admin-button"
                    data-action="grant"
                >
                    ✦ Выдать доступ
                </button>


                <button
                    class="admin-button"
                    data-action="regenerate"
                >
                    ↻ Новый код
                </button>


                <button
                    class="admin-button"
                    data-action="revoke"
                >
                    × Отозвать
                </button>

            </div>


            <div
                class="access-result"
                data-result
            ></div>

        </div>

    `;

}


/* =====================================================
   EVENTS
===================================================== */

function attachUserEvents() {

    document
        .querySelectorAll(".user-card")
        .forEach(card => {

            const userId =
                Number(
                    card.dataset.userId
                );


            const select =
                card.querySelector(
                    '[data-action="select"]'
                );


            const grant =
                card.querySelector(
                    '[data-action="grant"]'
                );


            const regenerate =
                card.querySelector(
                    '[data-action="regenerate"]'
                );


            const revoke =
                card.querySelector(
                    '[data-action="revoke"]'
                );


            grant.addEventListener(
                "click",
                () =>
                    grantAccess(
                        userId,
                        Number(select.value),
                        card
                    )
            );


            regenerate.addEventListener(
                "click",
                () =>
                    regenerateAccess(
                        userId,
                        Number(select.value),
                        card
                    )
            );


            revoke.addEventListener(
                "click",
                () =>
                    revokeAccess(
                        userId,
                        Number(select.value),
                        card
                    )
            );

        });

}


/* =====================================================
   GRANT
===================================================== */

async function grantAccess(
    userId,
    arcanaId,
    card
) {

    const result =
        card.querySelector(
            "[data-result]"
        );


    result.classList.remove("show");

    result.textContent =
        "Выдача доступа...";

    result.classList.add("show");


    try {

        const data =
            await api(
                "/api/admin/grant-access",
                {
                    method: "POST",

                    body: JSON.stringify({
                        user_id: userId,
                        arcana_id: arcanaId
                    })
                }
            );


        showPassword(
            result,
            data.password,
            "Доступ выдан"
        );


        await loadUsers();

    }

    catch (error) {

        result.textContent =
            error.message;

        result.classList.add("show");

    }

}


/* =====================================================
   REGENERATE
===================================================== */

async function regenerateAccess(
    userId,
    arcanaId,
    card
) {

    const result =
        card.querySelector(
            "[data-result]"
        );


    result.classList.remove("show");

    result.textContent =
        "Генерация нового кода...";

    result.classList.add("show");


    try {

        const data =
            await api(
                "/api/admin/regenerate-access",
                {
                    method: "POST",

                    body: JSON.stringify({
                        user_id: userId,
                        arcana_id: arcanaId
                    })
                }
            );


        showPassword(
            result,
            data.password,
            "Новый код создан"
        );

    }

    catch (error) {

        result.textContent =
            error.message;

    }

}


/* =====================================================
   REVOKE
===================================================== */

async function revokeAccess(
    userId,
    arcanaId,
    card
) {

    if (
        !confirm(
            `Отозвать доступ к Аркану №${arcanaId}?`
        )
    ) {

        return;

    }


    const result =
        card.querySelector(
            "[data-result]"
        );


    try {

        await api(
            "/api/admin/revoke-access",
            {
                method: "POST",

                body: JSON.stringify({
                    user_id: userId,
                    arcana_id: arcanaId
                })
            }
        );


        result.textContent =
            "Доступ отозван.";

        result.classList.add("show");


        await loadUsers();

    }

    catch (error) {

        result.textContent =
            error.message;

        result.classList.add("show");

    }

}


/* =====================================================
   PASSWORD DISPLAY
===================================================== */

function showPassword(
    result,
    password,
    title
) {

    result.innerHTML = `

        <div>
            ${title}
        </div>

        <div class="generated-password">
            ${escapeHtml(password)}
        </div>

        <button
            class="admin-button"
            data-copy-password
        >
            Копировать код
        </button>

    `;


    result.classList.add("show");


    const button =
        result.querySelector(
            "[data-copy-password]"
        );


    button.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    password
                );

                button.textContent =
                    "✓ Скопировано";

            }

            catch {

                button.textContent =
                    "Не удалось скопировать";

            }

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await api(
                "/api/logout",
                {
                    method: "POST"
                }
            );

            window.location.href =
                "/login";

        }

        catch (error) {

            globalError.textContent =
                error.message;

        }

    }
);


/* =====================================================
   REFRESH
===================================================== */

refreshUsers.addEventListener(
    "click",
    loadUsers
);


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   START
===================================================== */

loadUsers();
