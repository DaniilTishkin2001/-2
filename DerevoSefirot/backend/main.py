import secrets
from pathlib import Path

from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    Request,
)

from fastapi.responses import HTMLResponse

from fastapi.templating import Jinja2Templates

from sqlalchemy.orm import Session

from pydantic import BaseModel, EmailStr

from starlette.middleware.sessions import SessionMiddleware

from fastapi.staticfiles import StaticFiles

from .database import (
    Base,
    engine,
    get_db,
)

from .models import (
    User,
    ArcanaAccess,
)

from .auth import (
    hash_password,
    verify_password,
)


# =========================================================
# PATHS
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES_DIR = BASE_DIR / "templates"

STATIC_DIR = BASE_DIR / "static"


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="Amadeya — Древо Сефирот"
)


# =========================================================
# STATIC FILES
# =========================================================

app.mount(
    "/static",
    StaticFiles(directory=str(STATIC_DIR)),
    name="static",
)


# =========================================================
# SESSION
# =========================================================

app.add_middleware(
    SessionMiddleware,

    secret_key="CHANGE_ME_TO_A_LONG_RANDOM_SECRET_KEY",

    session_cookie="amadeya_session",

    max_age=60 * 60 * 24 * 30,

    same_site="lax",

    https_only=False,
)


# =========================================================
# TEMPLATES
# =========================================================

templates = Jinja2Templates(
    directory=str(TEMPLATES_DIR)
)


# =========================================================
# DATABASE
# =========================================================

Base.metadata.create_all(
    bind=engine
)


# =========================================================
# SCHEMAS
# =========================================================

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ArcanaAccessRequest(BaseModel):
    arcana_id: int
    password: str


class GrantAccessRequest(BaseModel):
    user_id: int
    arcana_id: int


# =========================================================
# ARCANA PASSWORD
# =========================================================

def generate_arcana_password() -> str:
    """
    Генерирует индивидуальный код доступа к Аркану.
    """

    return secrets.token_urlsafe(12)


# =========================================================
# CURRENT USER
# =========================================================

def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
):
    """
    Получает текущего авторизованного пользователя
    из session cookie.
    """

    user_id = request.session.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Необходимо войти в аккаунт",
        )

    user = (
        db.query(User)
        .filter(
            User.id == user_id,
            User.is_active == True,
        )
        .first()
    )

    if not user:

        request.session.clear()

        raise HTTPException(
            status_code=401,
            detail="Пользователь не найден",
        )

    return user


# =========================================================
# ADMIN
# =========================================================

def get_admin(
    user: User = Depends(get_current_user),
):
    """
    Проверяет, является ли текущий пользователь администратором.
    """

    if not user.is_admin:

        raise HTTPException(
            status_code=403,
            detail="Требуются права администратора",
        )

    return user


# =========================================================
# MAIN PAGE
# =========================================================

@app.get(
    "/",
    response_class=HTMLResponse,
)
def index(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "request": request,
        },
    )


# =========================================================
# REGISTER PAGE
# =========================================================

@app.get(
    "/register",
    response_class=HTMLResponse,
)
def register_page(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="register.html",
        context={
            "request": request,
        },
    )


# =========================================================
# LOGIN PAGE
# =========================================================

@app.get(
    "/login",
    response_class=HTMLResponse,
)
def login_page(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={
            "request": request,
        },
    )


# =========================================================
# ADMIN PAGE
# =========================================================

@app.get(
    "/admin",
    response_class=HTMLResponse,
)
def admin_page(
    request: Request,
    admin: User = Depends(get_admin),
):

    return templates.TemplateResponse(
        request=request,
        name="admin.html",
        context={
            "request": request,
        },
    )


# =========================================================
# REGISTER
# =========================================================

@app.post("/api/register")
def register(
    data: RegisterRequest,
    request: Request,
    db: Session = Depends(get_db),
):

    email = data.email.lower().strip()

    # -----------------------------------------------------
    # PASSWORD VALIDATION
    # -----------------------------------------------------

    if len(data.password) < 8:

        raise HTTPException(
            status_code=400,
            detail="Пароль должен содержать минимум 8 символов",
        )

    # -----------------------------------------------------
    # CHECK EXISTING USER
    # -----------------------------------------------------

    existing = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким email уже существует",
        )

    # -----------------------------------------------------
    # CREATE USER
    # -----------------------------------------------------

    user = User(
        email=email,
        password_hash=hash_password(
            data.password
        ),
        is_active=True,
        is_admin=False,
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    # -----------------------------------------------------
    # LOGIN AFTER REGISTRATION
    # -----------------------------------------------------

    request.session.clear()

    request.session["user_id"] = user.id

    # -----------------------------------------------------
    # RESPONSE
    # -----------------------------------------------------

    return {
        "success": True,

        "user": {
            "id": user.id,
            "email": user.email,
            "is_admin": user.is_admin,
        },
    }


# =========================================================
# LOGIN
# =========================================================

@app.post("/api/login")
def login(
    data: LoginRequest,
    request: Request,
    db: Session = Depends(get_db),
):

    email = data.email.lower().strip()

    # -----------------------------------------------------
    # FIND USER
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Неверный email или пароль",
        )

    # -----------------------------------------------------
    # ACTIVE CHECK
    # -----------------------------------------------------

    if not user.is_active:

        raise HTTPException(
            status_code=403,
            detail="Аккаунт заблокирован",
        )

    # -----------------------------------------------------
    # PASSWORD CHECK
    # -----------------------------------------------------

    if not verify_password(
        data.password,
        user.password_hash,
    ):

        raise HTTPException(
            status_code=401,
            detail="Неверный email или пароль",
        )

    # -----------------------------------------------------
    # CREATE SESSION
    # -----------------------------------------------------

    request.session.clear()

    request.session["user_id"] = user.id

    # -----------------------------------------------------
    # RESPONSE
    # -----------------------------------------------------

    return {
        "success": True,

        "user": {
            "id": user.id,
            "email": user.email,
            "is_admin": user.is_admin,
        },
    }


# =========================================================
# LOGOUT
# =========================================================

@app.post("/api/logout")
def logout(request: Request):

    request.session.clear()

    return {
        "success": True,
    }


# =========================================================
# CURRENT USER
# =========================================================

@app.get("/api/me")
def me(
    user: User = Depends(get_current_user),
):

    return {
        "id": user.id,
        "email": user.email,
        "is_admin": user.is_admin,
        "is_active": user.is_active,
    }


# =========================================================
# USER ARCANA ACCESS LIST
# =========================================================
#
# ВАЖНО:
# Этот endpoint объявлен ТОЛЬКО ОДИН РАЗ.
#
# Он возвращает:
#
# {
#     "success": true,
#     "access": [1, 3, 7]
# }
#
# tree.js использует этот список, чтобы после
# перезагрузки страницы не спрашивать код повторно.
# =========================================================

@app.get("/api/arcana/access")
def get_arcana_access(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    accesses = (
        db.query(ArcanaAccess)
        .filter(
            ArcanaAccess.user_id == user.id,
            ArcanaAccess.is_active == True,
        )
        .all()
    )

    return {
        "success": True,

        "access": [
            access.arcana_id
            for access in accesses
        ],
    }


# =========================================================
# CHECK ARCANA ACCESS
# =========================================================

@app.post("/api/arcana/access")
def check_arcana_access(
    data: ArcanaAccessRequest,

    user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db),
):

    # -----------------------------------------------------
    # ARCANA NUMBER
    # -----------------------------------------------------

    if not 1 <= data.arcana_id <= 22:

        raise HTTPException(
            status_code=400,
            detail="Некорректный номер Аркана",
        )

    # -----------------------------------------------------
    # FIND ACCESS
    # -----------------------------------------------------

    access = (
        db.query(ArcanaAccess)
        .filter(
            ArcanaAccess.user_id == user.id,

            ArcanaAccess.arcana_id ==
            data.arcana_id,

            ArcanaAccess.is_active == True,
        )
        .first()
    )

    if not access:

        raise HTTPException(
            status_code=403,
            detail="У вас нет доступа к этому Аркану",
        )

    # -----------------------------------------------------
    # CHECK PASSWORD
    # -----------------------------------------------------

    if not verify_password(
        data.password,
        access.password_hash,
    ):

        raise HTTPException(
            status_code=403,
            detail="Неверный код доступа",
        )

    # -----------------------------------------------------
    # SUCCESS
    # -----------------------------------------------------

    return {
        "success": True,

        "arcana_id":
            data.arcana_id,
    }


# =========================================================
# ADMIN — USERS
# =========================================================

@app.get("/api/admin/users")
def admin_users(
    admin: User = Depends(get_admin),
    db: Session = Depends(get_db),
):

    users = (
        db.query(User)
        .order_by(User.id.asc())
        .all()
    )

    result = []

    for user in users:

        accesses = (
            db.query(ArcanaAccess)
            .filter(
                ArcanaAccess.user_id == user.id,

                ArcanaAccess.is_active == True,
            )
            .all()
        )

        result.append({

            "id":
                user.id,

            "email":
                user.email,

            "is_admin":
                user.is_admin,

            "is_active":
                user.is_active,

            "arcana": [
                access.arcana_id
                for access in accesses
            ],
        })

    return result


# =========================================================
# ADMIN — GRANT ACCESS
# =========================================================

@app.post("/api/admin/grant-access")
def grant_access(
    data: GrantAccessRequest,

    admin: User = Depends(
        get_admin
    ),

    db: Session = Depends(
        get_db
    ),
):

    # -----------------------------------------------------
    # CHECK ARCANA
    # -----------------------------------------------------

    if not 1 <= data.arcana_id <= 22:

        raise HTTPException(
            status_code=400,
            detail="Аркан должен быть от 1 до 22",
        )

    # -----------------------------------------------------
    # FIND USER
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(
            User.id == data.user_id
        )
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден",
        )

    # -----------------------------------------------------
    # FIND EXISTING ACCESS
    # -----------------------------------------------------

    existing = (
        db.query(ArcanaAccess)
        .filter(
            ArcanaAccess.user_id ==
            data.user_id,

            ArcanaAccess.arcana_id ==
            data.arcana_id,
        )
        .first()
    )

    # =====================================================
    # RESTORE OLD ACCESS
    # =====================================================

    if existing:

        if existing.is_active:

            raise HTTPException(
                status_code=400,
                detail="Доступ уже выдан",
            )

        # -------------------------------------------------
        # GENERATE NEW PASSWORD
        # -------------------------------------------------

        raw_password = (
            generate_arcana_password()
        )

        existing.password_hash = (
            hash_password(
                raw_password
            )
        )

        existing.is_active = True

        db.commit()

        return {

            "success":
                True,

            "action":
                "restored",

            "user_id":
                user.id,

            "arcana_id":
                data.arcana_id,

            "password":
                raw_password,
        }

    # =====================================================
    # CREATE NEW ACCESS
    # =====================================================

    raw_password = (
        generate_arcana_password()
    )

    access = ArcanaAccess(

        user_id=user.id,

        arcana_id=data.arcana_id,

        password_hash=hash_password(
            raw_password
        ),

        is_active=True,
    )

    db.add(access)

    db.commit()

    return {

        "success":
            True,

        "action":
            "created",

        "user_id":
            user.id,

        "arcana_id":
            data.arcana_id,

        "password":
            raw_password,
    }


# =========================================================
# ADMIN — REGENERATE ACCESS PASSWORD
# =========================================================

@app.post("/api/admin/regenerate-access")
def regenerate_access(
    data: GrantAccessRequest,

    admin: User = Depends(
        get_admin
    ),

    db: Session = Depends(
        get_db
    ),
):

    # -----------------------------------------------------
    # FIND ACCESS
    # -----------------------------------------------------

    access = (
        db.query(ArcanaAccess)
        .filter(
            ArcanaAccess.user_id ==
            data.user_id,

            ArcanaAccess.arcana_id ==
            data.arcana_id,
        )
        .first()
    )

    if not access:

        raise HTTPException(
            status_code=404,
            detail="Доступ не найден",
        )

    # -----------------------------------------------------
    # NEW PASSWORD
    # -----------------------------------------------------

    raw_password = (
        generate_arcana_password()
    )

    access.password_hash = (
        hash_password(
            raw_password
        )
    )

    access.is_active = True

    db.commit()

    return {

        "success":
            True,

        "user_id":
            data.user_id,

        "arcana_id":
            data.arcana_id,

        "password":
            raw_password,
    }


# =========================================================
# ADMIN — REVOKE ACCESS
# =========================================================

@app.post("/api/admin/revoke-access")
def revoke_access(
    data: GrantAccessRequest,

    admin: User = Depends(
        get_admin
    ),

    db: Session = Depends(
        get_db
    ),
):

    # -----------------------------------------------------
    # FIND ACCESS
    # -----------------------------------------------------

    access = (
        db.query(ArcanaAccess)
        .filter(
            ArcanaAccess.user_id ==
            data.user_id,

            ArcanaAccess.arcana_id ==
            data.arcana_id,
        )
        .first()
    )

    if not access:

        raise HTTPException(
            status_code=404,
            detail="Доступ не найден",
        )

    # -----------------------------------------------------
    # DISABLE ACCESS
    # -----------------------------------------------------

    access.is_active = False

    db.commit()

    return {
        "success": True,
    }


# =========================================================
# CREATE FIRST ADMIN
# =========================================================

@app.post("/api/create-first-admin")
def create_first_admin(
    data: LoginRequest,
    db: Session = Depends(get_db),
):

    # -----------------------------------------------------
    # CHECK EXISTING ADMIN
    # -----------------------------------------------------

    existing_admin = (
        db.query(User)
        .filter(
            User.is_admin == True
        )
        .first()
    )

    if existing_admin:

        raise HTTPException(
            status_code=400,
            detail="Администратор уже существует",
        )

    # -----------------------------------------------------
    # CREATE ADMIN
    # -----------------------------------------------------

    admin = User(

        email=
            data.email.lower().strip(),

        password_hash=
            hash_password(
                data.password
            ),

        is_admin=True,

        is_active=True,
    )

    db.add(admin)

    db.commit()

    db.refresh(admin)

    # -----------------------------------------------------
    # RESPONSE
    # -----------------------------------------------------

    return {

        "success":
            True,

        "message":
            "Первый администратор создан",

        "email":
            admin.email,
    }
