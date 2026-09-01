


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
       ELEMENT THEMES
    ===================================================== */

    const ELEMENT_COLORS = {

        fire: {
            color: "#ff7138",
            light: "#ffc06b",
            glow: "rgba(255, 91, 42, .78)"
        },

        water: {
            color: "#368eea",
            light: "#7dc8ff",
            glow: "rgba(43, 139, 255, .78)"
        },

        air: {
            color: "#9ce8ff",
            light: "#e7fbff",
            glow: "rgba(133, 225, 255, .78)"
        },

        earth: {
            color: "#8aa65b",
            light: "#c9dd91",
            glow: "rgba(138, 166, 91, .65)"
        },

        spirit: {
            color: "#d9c5ff",
            light: "#fff3ce",
            glow: "rgba(217, 197, 255, .7)"
        }

    };


    /* =====================================================
       VIDEO FILES
       
       Файлы должны находиться здесь:

       static/video/arcana-01.mp4
       static/video/arcana-02.mp4
       ...
       static/video/arcana-22.mp4
    ===================================================== */

    const ARCANA_VIDEO_BASE = "/static/video/";

    function getArcanaVideo(id) {

        return (
            ARCANA_VIDEO_BASE +
            "arcana-" +
            String(id).padStart(2, "0") +
            ".mp4"
        );

    }


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

    let userArcanaAccess = new Set();

    let arcanaAccessLoaded =
        loadArcanaAccess();


    /* =====================================================
       VIDEO SYSTEM
    ===================================================== */

    let videoOverlay = null;
    let videoElement = null;
    let videoTitle = null;
    let videoNumber = null;
    let videoElementLabel = null;

    let videoCloseButton = null;
    let videoFullscreenButton = null;
    let videoPlayButton = null;


    function createVideoOverlay() {

        if (videoOverlay) {
            return;
        }


        videoOverlay =
            document.createElement("div");

        videoOverlay.id =
            "arcanaVideoOverlay";

        videoOverlay.innerHTML = `

            <div class="arcana-video-backdrop"></div>

            <div class="arcana-video-energy energy-1"></div>
            <div class="arcana-video-energy energy-2"></div>
            <div class="arcana-video-energy energy-3"></div>

            <div class="arcana-video-stage">

                <div class="arcana-video-header">

                    <div class="arcana-video-meta">

                        <span
                            class="arcana-video-number"
                            id="arcanaVideoNumber">
                            01
                        </span>

                        <span class="arcana-video-divider">
                            ✦
                        </span>

                        <span
                            class="arcana-video-element"
                            id="arcanaVideoElement">
                            AIR
                        </span>

                    </div>

                    <div
                        class="arcana-video-title"
                        id="arcanaVideoTitle">
                        Маг
                    </div>

                </div>


                <div class="arcana-video-frame">

                    <div class="arcana-video-corner corner-tl"></div>
                    <div class="arcana-video-corner corner-tr"></div>
                    <div class="arcana-video-corner corner-bl"></div>
                    <div class="arcana-video-corner corner-br"></div>

                    <video
                        id="arcanaVideo"
                        playsinline
                        preload="auto">
                    </video>

                    <div class="arcana-video-shine"></div>

                    <button
                        class="arcana-video-play"
                        id="arcanaVideoPlay">
                        ▶
                    </button>

                </div>


                <div class="arcana-video-controls">

                    <button
                        class="arcana-video-control"
                        id="arcanaVideoClose">
                        ✕ Закрыть
                    </button>

                    <button
                        class="arcana-video-control"
                        id="arcanaVideoFullscreen">
                        ⛶ На весь экран
                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            videoOverlay
        );


        videoElement =
            document.getElementById(
                "arcanaVideo"
            );

        videoTitle =
            document.getElementById(
                "arcanaVideoTitle"
            );

        videoNumber =
            document.getElementById(
                "arcanaVideoNumber"
            );

        videoElementLabel =
            document.getElementById(
                "arcanaVideoElement"
            );

        videoCloseButton =
            document.getElementById(
                "arcanaVideoClose"
            );

        videoFullscreenButton =
            document.getElementById(
                "arcanaVideoFullscreen"
            );

        videoPlayButton =
            document.getElementById(
                "arcanaVideoPlay"
            );


        videoCloseButton.addEventListener(
            "click",
            closeArcanaVideo
        );


        videoFullscreenButton.addEventListener(
            "click",
            toggleVideoFullscreen
        );


        videoPlayButton.addEventListener(
            "click",
            toggleVideoPlayback
        );


        videoElement.addEventListener(
            "click",
            toggleVideoPlayback
        );


        videoElement.addEventListener(
            "play",
            () => {

                videoPlayButton.textContent =
                    "Ⅱ";

                videoPlayButton.classList.add(
                    "playing"
                );

            }
        );


        videoElement.addEventListener(
            "pause",
            () => {

                videoPlayButton.textContent =
                    "▶";

                videoPlayButton.classList.remove(
                    "playing"
                );

            }
        );


        videoElement.addEventListener(
            "ended",
            () => {

                videoPlayButton.textContent =
                    "↻";

                videoPlayButton.classList.remove(
                    "playing"
                );

            }
        );

    }


    /* =====================================================
       VIDEO STYLES
    ===================================================== */

    function injectVideoStyles() {

        if (
            document.getElementById(
                "arcana-video-styles"
            )
        ) {

            return;

        }


        const style =
            document.createElement("style");

        style.id =
            "arcana-video-styles";


        style.textContent = `

            /* =============================================
               VIDEO OVERLAY
            ============================================= */

            #arcanaVideoOverlay {

                position: fixed;

                inset: 0;

                z-index: 100000;

                display: flex;

                align-items: center;

                justify-content: center;

                padding: 40px;

                opacity: 0;

                visibility: hidden;

                pointer-events: none;

                transition:
                    opacity .65s ease,
                    visibility .65s ease;

                --video-color: #9ce8ff;
                --video-light: #e7fbff;
                --video-glow: rgba(133,225,255,.78);

            }


            #arcanaVideoOverlay.show {

                opacity: 1;

                visibility: visible;

                pointer-events: auto;

            }


            /* =============================================
               BACKDROP
            ============================================= */

            .arcana-video-backdrop {

                position: absolute;

                inset: 0;

                background:
                    radial-gradient(
                        ellipse at center,
                        color-mix(
                            in srgb,
                            var(--video-color) 12%,
                            transparent
                        ),
                        rgba(2,3,7,.78) 38%,
                        rgba(1,2,5,.94) 100%
                    );

                backdrop-filter:
                    blur(7px)
                    saturate(1.1);

            }


            .arcana-video-backdrop::before {

                content: "";

                position: absolute;

                inset: 0;

                background:
                    radial-gradient(
                        circle at center,
                        transparent 0 24%,
                        rgba(0,0,0,.24) 54%,
                        rgba(0,0,0,.62) 100%
                    );

            }


            /* =============================================
               ENERGY RINGS
            ============================================= */

            .arcana-video-energy {

                position: absolute;

                left: 50%;

                top: 50%;

                width: min(72vw, 900px);

                height: min(72vw, 900px);

                border-radius: 50%;

                border: 1px solid
                    var(--video-color);

                transform:
                    translate(-50%, -50%)
                    scale(.55);

                opacity: 0;

                pointer-events: none;

                box-shadow:
                    0 0 25px var(--video-glow),
                    inset 0 0 35px var(--video-glow);

            }


            #arcanaVideoOverlay.show
            .energy-1 {

                animation:
                    videoRingIn 1.4s
                    cubic-bezier(.15,.75,.2,1)
                    forwards;

            }


            #arcanaVideoOverlay.show
            .energy-2 {

                animation:
                    videoRingIn 1.8s
                    .18s
                    cubic-bezier(.15,.75,.2,1)
                    forwards;

            }


            #arcanaVideoOverlay.show
            .energy-3 {

                animation:
                    videoRingIn 2.2s
                    .35s
                    cubic-bezier(.15,.75,.2,1)
                    forwards;

            }


            .energy-2 {

                width: min(58vw, 720px);

                height: min(58vw, 720px);

                border-style: dashed;

            }


            .energy-3 {

                width: min(46vw, 560px);

                height: min(46vw, 560px);

                border-color:
                    var(--video-light);

                border-style: dotted;

            }


            /* =============================================
               STAGE
            ============================================= */

            .arcana-video-stage {

                position: relative;

                z-index: 10;

                width: min(
                    1120px,
                    calc(100vw - 80px)
                );

                max-height: calc(100vh - 80px);

                display: flex;

                flex-direction: column;

                align-items: center;

                justify-content: center;

                transform:
                    translateY(35px)
                    scale(.96);

                opacity: 0;

                transition:
                    transform .8s
                        cubic-bezier(.16,1,.3,1),
                    opacity .7s ease;

            }


            #arcanaVideoOverlay.show
            .arcana-video-stage {

                transform:
                    translateY(0)
                    scale(1);

                opacity: 1;

            }


            /* =============================================
               HEADER
            ============================================= */

            .arcana-video-header {

                width: 100%;

                display: flex;

                align-items: flex-end;

                justify-content: space-between;

                margin-bottom: 14px;

                padding:
                    0 8px;

                opacity: .94;

            }


            .arcana-video-meta {

                display: flex;

                align-items: center;

                gap: 12px;

                font-family:
                    Georgia,
                    serif;

                letter-spacing: .25em;

                font-size: 10px;

                color:
                    var(--video-light);

                text-transform: uppercase;

                text-shadow:
                    0 0 15px
                    var(--video-glow);

            }


            .arcana-video-number {

                font-size: 12px;

                opacity: .75;

            }


            .arcana-video-divider {

                opacity: .65;

            }


            .arcana-video-title {

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    clamp(22px, 3vw, 34px);

                font-weight: 400;

                letter-spacing: .08em;

                color: #f4e7c5;

                text-shadow:
                    0 0 22px
                    var(--video-glow);

            }


            /* =============================================
               VIDEO FRAME
            ============================================= */

            .arcana-video-frame {

                position: relative;

                width: 100%;

                aspect-ratio: 16 / 9;

                max-height:
                    calc(100vh - 190px);

                overflow: hidden;

                border:
                    1px solid
                    color-mix(
                        in srgb,
                        var(--video-color) 72%,
                        rgba(255,255,255,.18)
                    );

                border-radius: 14px;

                background:
                    #020307;

                box-shadow:

                    0 0 0 1px
                        rgba(255,255,255,.03),

                    0 0 25px
                        var(--video-glow),

                    0 0 80px
                        color-mix(
                            in srgb,
                            var(--video-color) 28%,
                            transparent
                        ),

                    0 30px 100px
                        rgba(0,0,0,.7);

                transform:
                    translateZ(0);

            }


            .arcana-video-frame::before {

                content: "";

                position: absolute;

                inset: 0;

                z-index: 2;

                pointer-events: none;

                border-radius: 14px;

                background:
                    linear-gradient(
                        110deg,
                        rgba(255,255,255,.08),
                        transparent 18%,
                        transparent 78%,
                        rgba(255,255,255,.04)
                    );

                mix-blend-mode: screen;

            }


            .arcana-video-frame::after {

                content: "";

                position: absolute;

                inset: -30%;

                z-index: 3;

                pointer-events: none;

                background:
                    radial-gradient(
                        ellipse at center,
                        transparent 45%,
                        var(--video-glow) 100%
                    );

                opacity: .16;

                filter: blur(25px);

            }


            #arcanaVideo {

                display: block;

                width: 100%;

                height: 100%;

                object-fit: contain;

                background: #000;

                cursor: pointer;

            }


            /* =============================================
               VIDEO SHINE
            ============================================= */

            .arcana-video-shine {

                position: absolute;

                inset: 0;

                z-index: 4;

                pointer-events: none;

                background:
                    linear-gradient(
                        115deg,
                        transparent 0%,
                        rgba(255,255,255,.14) 48%,
                        transparent 55%
                    );

                transform:
                    translateX(-120%);

                animation:
                    videoShine 3.2s
                    1.1s
                    ease-out
                    1
                    forwards;

            }


            /* =============================================
               CORNERS
            ============================================= */

            .arcana-video-corner {

                position: absolute;

                z-index: 6;

                width: 34px;

                height: 34px;

                pointer-events: none;

                border-color:
                    var(--video-light);

                filter:
                    drop-shadow(
                        0 0 7px
                        var(--video-glow)
                    );

            }


            .corner-tl {

                top: 10px;

                left: 10px;

                border-top: 1px solid;

                border-left: 1px solid;

            }


            .corner-tr {

                top: 10px;

                right: 10px;

                border-top: 1px solid;

                border-right: 1px solid;

            }


            .corner-bl {

                bottom: 10px;

                left: 10px;

                border-bottom: 1px solid;

                border-left: 1px solid;

            }


            .corner-br {

                right: 10px;

                bottom: 10px;

                border-bottom: 1px solid;

                border-right: 1px solid;

            }


            /* =============================================
               PLAY
            ============================================= */

            .arcana-video-play {

                position: absolute;

                left: 50%;

                top: 50%;

                z-index: 8;

                width: 72px;

                height: 72px;

                transform:
                    translate(-50%, -50%);

                border:
                    1px solid
                    var(--video-light);

                border-radius: 50%;

                background:
                    rgba(3,5,9,.48);

                color:
                    var(--video-light);

                font-size: 22px;

                cursor: pointer;

                opacity: .88;

                backdrop-filter:
                    blur(8px);

                box-shadow:
                    0 0 25px
                    var(--video-glow);

                transition:
                    transform .25s ease,
                    opacity .25s ease,
                    background .25s ease;

            }


            .arcana-video-play:hover {

                transform:
                    translate(-50%, -50%)
                    scale(1.08);

                background:
                    rgba(20,20,25,.7);

                opacity: 1;

            }


            .arcana-video-play.playing {

                opacity: 0;

            }


            .arcana-video-frame:hover
            .arcana-video-play.playing {

                opacity: .8;

            }


            /* =============================================
               CONTROLS
            ============================================= */

            .arcana-video-controls {

                display: flex;

                align-items: center;

                justify-content: center;

                gap: 12px;

                margin-top: 14px;

            }


            .arcana-video-control {

                min-width: 145px;

                padding:
                    10px 18px;

                border:
                    1px solid
                    rgba(255,255,255,.16);

                border-radius: 999px;

                background:
                    rgba(6,8,13,.62);

                color:
                    rgba(245,235,214,.82);

                font-size: 10px;

                letter-spacing: .12em;

                text-transform: uppercase;

                cursor: pointer;

                backdrop-filter:
                    blur(10px);

                transition:
                    border-color .25s ease,
                    color .25s ease,
                    box-shadow .25s ease,
                    transform .25s ease;

            }


            .arcana-video-control:hover {

                color: #fff4d4;

                border-color:
                    var(--video-light);

                box-shadow:
                    0 0 18px
                    var(--video-glow);

                transform:
                    translateY(-1px);

            }


            /* =============================================
               ELEMENT SPECIFIC
            ============================================= */

            #arcanaVideoOverlay.element-fire {

                --video-color: #ff7138;

                --video-light: #ffd09a;

                --video-glow:
                    rgba(255,91,42,.82);

            }


            #arcanaVideoOverlay.element-water {

                --video-color: #368eea;

                --video-light: #9bd8ff;

                --video-glow:
                    rgba(43,139,255,.82);

            }


            #arcanaVideoOverlay.element-air {

                --video-color: #9ce8ff;

                --video-light: #edfdff;

                --video-glow:
                    rgba(133,225,255,.82);

            }


            #arcanaVideoOverlay.element-earth {

                --video-color: #8aa65b;

                --video-light: #d6e9a0;

                --video-glow:
                    rgba(138,166,91,.7);

            }


            /* =============================================
               FLASH
            ============================================= */

            #arcanaVideoOverlay.video-flash::before {

                content: "";

                position: absolute;

                z-index: 999;

                inset: 0;

                background:
                    var(--video-light);

                pointer-events: none;

                animation:
                    videoFlash .65s
                    ease-out
                    forwards;

            }


            /* =============================================
               ANIMATIONS
            ============================================= */

            @keyframes videoRingIn {

                0% {

                    opacity: 0;

                    transform:
                        translate(-50%, -50%)
                        scale(.35)
                        rotate(-20deg);

                }

                35% {

                    opacity: .85;

                }

                100% {

                    opacity: .16;

                    transform:
                        translate(-50%, -50%)
                        scale(1.15)
                        rotate(25deg);

                }

            }


            @keyframes videoShine {

                0% {

                    transform:
                        translateX(-120%);

                }

                100% {

                    transform:
                        translateX(120%);

                }

            }


            @keyframes videoFlash {

                0% {

                    opacity: .9;

                }

                100% {

                    opacity: 0;

                }

            }


            /* =============================================
               MOBILE
            ============================================= */

            @media (max-width: 800px) {

                #arcanaVideoOverlay {

                    padding: 18px;

                }


                .arcana-video-stage {

                    width:
                        calc(100vw - 36px);

                    max-height:
                        calc(100vh - 36px);

                }


                .arcana-video-header {

                    align-items: center;

                }


                .arcana-video-title {

                    font-size: 20px;

                }


                .arcana-video-meta {

                    font-size: 8px;

                }


                .arcana-video-frame {

                    aspect-ratio:
                        16 / 9;

                    max-height:
                        calc(100vh - 125px);

                }


                .arcana-video-controls {

                    width: 100%;

                }


                .arcana-video-control {

                    min-width: 0;

                    flex: 1;

                    padding:
                        9px 8px;

                    font-size: 8px;

                }


                .arcana-video-play {

                    width: 58px;

                    height: 58px;

                }

            }


            @media (max-width: 550px) {

                .arcana-video-header {

                    margin-bottom: 8px;

                }


                .arcana-video-title {

                    font-size: 18px;

                }


                .arcana-video-number {

                    font-size: 10px;

                }


                .arcana-video-controls {

                    margin-top: 8px;

                }

            }


            /* =============================================
               FULLSCREEN
            ============================================= */

            #arcanaVideoFrame:fullscreen {

                width: 100vw;

                height: 100vh;

                border: none;

                border-radius: 0;

            }


            .arcana-video-frame.fullscreen-mode {

                width: 100vw;

                height: 100vh;

                max-height: 100vh;

                border-radius: 0;

                border: none;

            }

        `;


        document.head.appendChild(style);

    }


    /* =====================================================
       OPEN VIDEO
    ===================================================== */

    async function openArcanaVideo(id) {

        const arcana =
            ARCANA[id];

        if (!arcana) {
            return;
        }


        createVideoOverlay();


        const theme =
            ELEMENT_COLORS[arcana.element] ||
            ELEMENT_COLORS.spirit;


        videoOverlay.classList.remove(
            "element-fire",
            "element-water",
            "element-air",
            "element-earth"
        );


        videoOverlay.classList.add(
            "element-" + arcana.element
        );


        videoNumber.textContent =
            String(id).padStart(2, "0");


        videoTitle.textContent =
            arcana.name;


        videoElementLabel.textContent =
            arcana.element.toUpperCase();


        videoElement.pause();


        videoElement.currentTime = 0;


        videoElement.src =
            getArcanaVideo(id);


        videoElement.load();


        /*
         * Небольшая задержка позволяет
         * CSS-анимации красиво стартовать.
         */

        requestAnimationFrame(() => {

            videoOverlay.classList.add(
                "show"
            );

            videoOverlay.classList.add(
                "video-flash"
            );

            setTimeout(() => {

                videoOverlay.classList.remove(
                    "video-flash"
                );

            }, 700);

        });


        /*
         * Автоматически начинаем видео.
         *
         * Если браузер блокирует autoplay,
         * пользователь увидит кнопку ▶.
         */

        try {

            await videoElement.play();

        } catch (error) {

            console.log(
                "Autoplay заблокирован браузером."
            );

            videoPlayButton.style.opacity =
                "1";

        }

    }


    /* =====================================================
       CLOSE VIDEO
    ===================================================== */

    function closeArcanaVideo() {

        if (!videoOverlay) {
            return;
        }


        videoOverlay.classList.remove(
            "show"
        );


        setTimeout(() => {

            if (!videoElement) {
                return;
            }


            videoElement.pause();

            videoElement.removeAttribute(
                "src"
            );

            videoElement.load();

        }, 650);

    }


    /* =====================================================
       VIDEO PLAY / PAUSE
    ===================================================== */

    function toggleVideoPlayback() {

        if (!videoElement) {
            return;
        }


        if (videoElement.paused) {

            videoElement.play().catch(
                error => {

                    console.error(
                        "Не удалось запустить видео:",
                        error
                    );

                }
            );

        } else {

            videoElement.pause();

        }

    }


    /* =====================================================
       FULLSCREEN
    ===================================================== */

    async function toggleVideoFullscreen() {

        if (!videoElement) {
            return;
        }


        try {

            if (
                document.fullscreenElement
            ) {

                await document.exitFullscreen();

                return;

            }


            if (
                videoElement.requestFullscreen
            ) {

                await videoElement.requestFullscreen();

                return;

            }


            if (
                videoElement.webkitEnterFullscreen
            ) {

                videoElement.webkitEnterFullscreen();

            }

        } catch (error) {

            console.error(
                "Fullscreen error:",
                error
            );

        }

    }


    /* =====================================================
       ESC VIDEO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                videoOverlay &&
                videoOverlay.classList.contains("show")
            ) {

                if (
                    document.fullscreenElement
                ) {

                    document.exitFullscreen();

                    return;

                }


                closeArcanaVideo();

            }

        }
    );


    /* =====================================================
       INJECT VIDEO CSS
    ===================================================== */

    injectVideoStyles();


    /* =====================================================
       LOAD USER ACCESS
    ===================================================== */

    async function loadArcanaAccess() {

        try {

            const response =
                await fetch(
                    "/api/arcana/access",
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (response.status === 401) {

                userArcanaAccess =
                    new Set();

                return;

            }


            if (!response.ok) {

                console.error(
                    "Не удалось получить доступы:",
                    response.status
                );

                return;

            }


            const data =
                await response.json();


            if (
                Array.isArray(
                    data.access
                )
            ) {

                userArcanaAccess =
                    new Set(
                        data.access.map(Number)
                    );

            } else {

                userArcanaAccess =
                    new Set();

            }

        } catch (error) {

            console.error(
                "Ошибка загрузки доступов:",
                error
            );

        }

    }


    /* =====================================================
       REFRESH ACCESS
    ===================================================== */

    async function refreshArcanaAccess() {

        arcanaAccessLoaded =
            loadArcanaAccess();

        await arcanaAccessLoaded;

    }


    /* =====================================================
       AUTH
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
                            "Accept":
                                "application/json"
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
       APPLY ELEMENT THEME
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
       OPEN ARCANA
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

        closeArcanaVideo();


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


        await arcanaAccessLoaded;


        /*
         * Уже есть доступ —
         * сразу открываем карточку.
         */

        if (
            userArcanaAccess.has(id)
        ) {

            openArcana(id);

            return;

        }


        const authenticated =
            await isAuthenticated();


        if (!authenticated) {

            saveArcanaForLogin(id);

            window.location.href =
                "/login";

            return;

        }


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
       CLOSE ACCESS
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
       SUBMIT ACCESS
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


            if (response.status === 401) {

                const id =
                    requestedArcanaId;

                closeArcanaAccess();

                saveArcanaForLogin(id);

                window.location.href =
                    "/login";

                return;

            }


            if (!response.ok) {

                arcanaAccessError.textContent =
                    data.detail ||
                    "Доступ запрещён.";

                arcanaAccessSubmit.disabled =
                    false;

                return;

            }


            const id =
                requestedArcanaId;


            userArcanaAccess.add(id);


            await refreshArcanaAccess();


            closeArcanaAccess();


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
       ACCESS MODAL EVENTS
    ===================================================== */

    if (arcanaAccessClose) {

        arcanaAccessClose.addEventListener(
            "click",
            closeArcanaAccess
        );

    }


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


    if (arcanaAccessSubmit) {

        arcanaAccessSubmit.addEventListener(
            "click",
            submitArcanaAccess
        );

    }


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
       
       ВАЖНО:
       Видео появляется ТОЛЬКО ПОСЛЕ
       завершения анимации включения.
    ===================================================== */

    if (activateButton) {

        /* =====================================
   ARCANA VIDEO
===================================== */

const arcanaVideoModal =
  document.getElementById(
    "arcanaVideoModal"
  );

const arcanaVideoClose =
  document.getElementById(
    "arcanaVideoClose"
  );

const arcanaVideoIframe =
  document.getElementById(
    "arcanaVideoIframe"
  );

const arcanaVideoLoading =
  document.getElementById(
    "arcanaVideoLoading"
  );

const arcanaVideoError =
  document.getElementById(
    "arcanaVideoError"
  );

const arcanaVideoNumber =
  document.getElementById(
    "arcanaVideoNumber"
  );

const arcanaVideoTitle =
  document.getElementById(
    "arcanaVideoTitle"
  );


/* =====================================
   OPEN VIDEO
===================================== */

async function openArcanaVideo(id) {

  const arcana =
    ARCANA[id];
    const videoModal =
    document.getElementById(
        "arcanaVideoModal"
    );


/*
 * Убираем предыдущую стихию.
 */

videoModal.classList.remove(
    "element-fire",
    "element-water",
    "element-air",
    "element-earth",
    "element-spirit"
);


/*
 * Определяем стихию Аркана.
 *
 * Пока для первого видео ставим Огонь.
 */

let elementClass =
    "element-fire";


/*
 * Если в ARCANA у тебя есть поле element,
 * используем его автоматически.
 */

if (arcana.element) {

    const element =
        String(
            arcana.element
        ).toLowerCase();


    if (
        element.includes("огонь") ||
        element.includes("fire")
    ) {
        elementClass =
            "element-fire";
    }

    else if (
        element.includes("вода") ||
        element.includes("water")
    ) {
        elementClass =
            "element-water";
    }

    else if (
        element.includes("воздух") ||
        element.includes("air")
    ) {
        elementClass =
            "element-air";
    }

    else if (
        element.includes("земля") ||
        element.includes("earth")
    ) {
        elementClass =
            "element-earth";
    }

    else if (
        element.includes("дух") ||
        element.includes("spirit")
    ) {
        elementClass =
            "element-spirit";
    }

}


/*
 * Включаем нужную атмосферу.
 */

videoModal.classList.add(
    elementClass
);


  if (!arcana) return;


  /*
   * Пока видео есть только
   * у Аркана №1.
   */

  if (id !== 22) {

    alert(
      "Видео для этого Аркана пока не добавлено."
    );

    return;
  }


  /*
   * Заполняем заголовок
   */

  arcanaVideoNumber.textContent =
    String(id).padStart(2, "0");

  arcanaVideoTitle.textContent =
    arcana.name;


  /*
   * Очищаем старое видео
   */

  arcanaVideoIframe.src = "";

  arcanaVideoIframe.style.display =
    "none";

  arcanaVideoLoading.style.display =
    "flex";

  arcanaVideoError.style.display =
    "none";

  arcanaVideoError.textContent = "";


  /*
   * Показываем модальное окно
   */

  arcanaVideoModal.classList.add(
    "show"
  );


  try {

    /*
     * Сервер сам проверит:
     *
     * 1. авторизован ли пользователь;
     * 2. есть ли у него доступ;
     * 3. есть ли доступ именно к этому Аркану.
     */

    const response =
      await fetch(
        `/api/arcana/${id}/video`,
        {
          method: "GET",

          credentials: "same-origin",

          cache: "no-store",

          headers: {
            "Accept":
              "application/json"
          }
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.detail ||
        "Доступ к видео запрещён"
      );
    }


    if (
      !data.success ||
      !data.url
    ) {

      throw new Error(
        "Сервер не вернул видео"
      );
    }


    /*
     * Только здесь URL приватного
     * видео попадает в браузер.
     */

    arcanaVideoIframe.src =
      data.url;


    arcanaVideoIframe.style.display =
      "block";

    arcanaVideoLoading.style.display =
      "none";


  } catch (error) {

    console.error(error);

    arcanaVideoLoading.style.display =
      "none";

    arcanaVideoError.textContent =
      error.message ||
      "Не удалось загрузить видео.";

    arcanaVideoError.style.display =
      "flex";
  }

}


/* =====================================
   CLOSE VIDEO
===================================== */

function closeArcanaVideo() {

  /*
   * Очень важно:
   *
   * удаляем src.
   *
   * Благодаря этому iframe прекращает
   * воспроизведение.
   */

  arcanaVideoIframe.src = "";

  arcanaVideoIframe.style.display =
    "none";

  arcanaVideoModal.classList.remove(
    "show"
  );
}


arcanaVideoClose.addEventListener(
  "click",
  closeArcanaVideo
);


arcanaVideoModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      arcanaVideoModal
    ) {

      closeArcanaVideo();

    }

  }
);


/* =====================================
   ACTIVATE BUTTON
===================================== */

activateButton.addEventListener(
  "click",
  async () => {

    const id =
      Number(
        arcanaNumber.textContent
      );

    const arcana =
      ARCANA[id];

    if (!arcana) return;


    /*
     * Оставляем твою существующую
     * красивую анимацию.
     */

    activationName.textContent =
      arcana.name;

    activateButton.classList.add(
      "activating"
    );

    activation.classList.add(
      "show"
    );


    /*
     * Через 1.9 секунды открываем
     * модальное окно с видео.
     */

    setTimeout(
      async () => {

        activation.classList.remove(
          "show"
        );

        activateButton.classList.remove(
          "activating"
        );

        await openArcanaVideo(id);

      },
      1900
    );

  }
);


    }


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                arcanaAccessModal &&
                arcanaAccessModal.classList.contains(
                    "show"
                )
            ) {

                closeArcanaAccess();

                return;

            }


            if (
                videoOverlay &&
                videoOverlay.classList.contains(
                    "show"
                )
            ) {

                closeArcanaVideo();

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
       RESTORE AFTER LOGIN
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


        await refreshArcanaAccess();


        if (
            userArcanaAccess.has(id)
        ) {

            setTimeout(() => {

                openArcana(id);

            }, 300);

            return;

        }


        setTimeout(() => {

            openArcanaAccess(id);

        }, 300);

    }


    /* =====================================================
       START
    ===================================================== */

    restoreArcanaAfterLogin();

});