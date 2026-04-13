console.log("SCRIPT CARREGOU OK");

/* ================= ABAS (CORRIGIDO SIMPLES E FUNCIONAL) ================= */

window.trocarPagina = function (event, id) {

    if (event) event.preventDefault();

    console.log("ABRINDO:", id);

    // esconde todas
    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.remove("ativa");
    });

    // mostra a certa
    const page = document.getElementById(id);
    if (page) {
        page.classList.add("ativa");
    }

    // menu ativo
    document.querySelectorAll(".menu a").forEach(a => {
        a.classList.remove("ativo");
    });

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("ativo");
    }

    // social (se existir)
    const social = document.querySelector(".social-box");
    if (social) {
        social.style.display = (id === "inicio") ? "block" : "none";
    }
};

/* ================= BOTÃO JOGO ================= */

window.abrirJogo = function () {
    window.open("https://play.google.com/store/apps/details?id=com.farlightgames.samo.gp", "_blank");
};

/* ================= LOGIN UI SIMPLES (não interfere no resto) ================= */

function atualizarUI(user) {
    const area = document.querySelector(".login-area");
    if (!area) return;

    if (!user) {
        area.innerHTML = `
            <button onclick="alert('Login ainda não ativo')">
                🔵 Entrar com Google
            </button>
        `;
    }
}

/* ================= INIT ================= */

window.onload = function () {
    atualizarUI(null);

    // garante que começa no início
    trocarPagina({ preventDefault() {} }, "inicio");
};