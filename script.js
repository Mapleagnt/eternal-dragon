console.log("SCRIPT CARREGOU OK");

/* ================= FIREBASE (MODULAR v9+) ================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

/* 🔥 CONFIG REAL DO SEU FIREBASE */
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "eternal-dragon-d84ea.firebaseapp.com",
    projectId: "eternal-dragon-d84ea",
    appId: "SEU_APP_ID"
};

/* INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* ================= LOGIN GOOGLE ================= */

window.loginGoogle = async function () {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("LOGADO:", user.displayName);
        console.log("EMAIL:", user.email);

        atualizarUI(user);

        alert("Bem-vindo " + user.displayName);

    } catch (err) {
        console.error("ERRO LOGIN:", err);
        alert("Erro no login: " + err.message);
    }
};

/* ================= LOGOUT ================= */

window.logoutGoogle = async function () {
    await signOut(auth);
    atualizarUI(null);
};

/* ================= UI LOGIN ================= */

function atualizarUI(user) {
    const area = document.querySelector(".login-area");
    if (!area) return;

    if (user) {
        area.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;color:white;">
                <img src="${user.photoURL}" style="width:32px;height:32px;border-radius:50%;">
                <span>${user.displayName}</span>
                <button onclick="logoutGoogle()">Sair</button>
            </div>
        `;
    } else {
        area.innerHTML = `
            <button onclick="loginGoogle()">
                🔵 Entrar com Google
            </button>
        `;
    }
}

/* ================= ABAS ================= */

window.trocarPagina = function (event, id) {

    if (event) event.preventDefault();

    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.remove("ativa");
    });

    const page = document.getElementById(id);
    if (page) page.classList.add("ativa");

    document.querySelectorAll(".menu a").forEach(a => {
        a.classList.remove("ativo");
    });

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("ativo");
    }

    const social = document.querySelector(".social-box");
    if (social) {
        social.style.display = (id === "inicio") ? "block" : "none";
    }
};

/* ================= BOTÃO JOGO ================= */

window.abrirJogo = function () {
    window.open(
        "https://play.google.com/store/apps/details?id=com.farlightgames.samo.gp",
        "_blank"
    );
};

/* ================= INIT ================= */

window.onload = function () {
    atualizarUI(null);
    trocarPagina({ preventDefault() {} }, "inicio");
};