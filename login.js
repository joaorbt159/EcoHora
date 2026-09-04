const entrarForm =
document.getElementById("entrarForm");

const criarContaForm =
document.getElementById("criarContaForm");

const loginForm =
document.getElementById("loginForm");

const cadastroForm =
document.getElementById("cadastroForm");

const message =
document.getElementById("message");

/* =========================================================
TROCAR PARA CADASTRO
========================================================= */

function mostrarCadastro() {


loginForm.classList.remove("active");

cadastroForm.classList.add("active");


}

/* =========================================================
TROCAR PARA LOGIN
========================================================= */

function mostrarLogin() {


cadastroForm.classList.remove("active");

loginForm.classList.add("active");


}

/* =========================================================
CRIAR CONTA
========================================================= */

criarContaForm.addEventListener(
"submit",


async function (event) {

    event.preventDefault();


    /* =============================================
       PEGAR DADOS DO FORMULÁRIO
    ============================================= */

    const nome =
        document.getElementById(
            "cadastroNome"
        ).value.trim();


    const ra =
        document.getElementById(
            "cadastroRA"
        ).value.trim();


    const email =
        document.getElementById(
            "cadastroEmail"
        ).value.trim();


    const senha =
        document.getElementById(
            "cadastroSenha"
        ).value;


    const confirmarSenha =
        document.getElementById(
            "confirmarSenha"
        ).value;


    const curso =
        document.getElementById(
            "cadastroCurso"
        ).value;


    const turma =
        document.getElementById(
            "cadastroTurma"
        ).value.trim();


    /* =============================================
       VERIFICAR SENHAS
    ============================================= */

    if (senha !== confirmarSenha) {

        mostrarMensagem(
            "As senhas não são iguais!"
        );

        return;

    }


    /* =============================================
       DADOS DO USUÁRIO
    ============================================= */

    const userData = {

        nome: nome,

        ra: ra,

        email: email,

        password: senha,

        curso: curso,

        turma: turma

    };


    console.log(
        "Dados enviados para cadastro:",
        userData
    );


    try {


        mostrarMensagem(
            "Criando seu perfil..."
        );


        /* =============================================
           CHAMA auth.js
        ============================================= */

        const resposta =
            await register(userData);


        console.log(
            "Usuário criado:",
            resposta
        );


        mostrarMensagem(
            "Perfil criado com sucesso! 🌱"
        );


        criarContaForm.reset();


        /* =============================================
           VOLTA PARA LOGIN
        ============================================= */

        setTimeout(() => {

            mostrarLogin();

        }, 1000);


    }

    catch (erro) {


        console.error(
            "Erro ao criar perfil:",
            erro
        );


        mostrarMensagem(
            erro.message ||
            "Erro ao criar o perfil."
        );


    }

}


);

/* =========================================================
LOGIN
========================================================= */

entrarForm.addEventListener(
"submit",


async function (event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const senha =
        document.getElementById(
            "loginSenha"
        ).value;


    try {


        mostrarMensagem(
            "Entrando..."
        );


        const resposta =
            await login(
                email,
                senha
            );


        console.log(
            "Login realizado:",
            resposta
        );


        /* =============================================
           SALVAR EMAIL DA SESSÃO
        ============================================= */

        localStorage.setItem(
            "usuarioEmail",
            email
        );


        mostrarMensagem(
            "Login realizado com sucesso! 🚀"
        );


        /* =============================================
           IR PARA HOME
        ============================================= */

        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 800);


    }

    catch (erro) {


        console.error(
            "Erro ao fazer login:",
            erro
        );


        mostrarMensagem(
            erro.message ||
            "Email ou senha incorretos!"
        );


    }

}


);

/* =========================================================
MENSAGENS
========================================================= */

let messageTimeout;

function mostrarMensagem(texto) {


clearTimeout(
    messageTimeout
);


message.textContent =
    texto;


message.classList.add(
    "show"
);


messageTimeout =
    setTimeout(() => {

        message.classList.remove(
            "show"
        );

    }, 3000);


}
