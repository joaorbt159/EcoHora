const entrarForm = document.getElementById("entrarForm");
const criarContaForm = document.getElementById("criarContaForm");

const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

const message = document.getElementById("message");


/* =========================================================
   CARREGAR CURSOS E TURMAS
   Busca as opções disponíveis na API e preenche os campos
   do formulário de cadastro.
========================================================= */

async function carregarOpcoesCadastro() {
    try {
        const { courses, classes } = await loadRegistrationOptions();

        const cursoSelect = document.getElementById("cadastroCurso");
        const turmaInput = document.getElementById("cadastroTurma");

        // Preenche o campo de cursos com os dados da API
        cursoSelect.innerHTML = `
            <option value="">
                Selecione seu curso
            </option>
        `;

        courses.forEach(curso => {
            const option = document.createElement("option");

            // O ID é enviado para a API e o nome é exibido na tela
            option.value = curso.id;
            option.textContent = curso.course;

            cursoSelect.appendChild(option);
        });

        // Cria um campo de seleção para as turmas
        const turmaSelect = document.createElement("select");

        turmaSelect.id = "cadastroTurma";
        turmaSelect.required = true;

        turmaSelect.innerHTML = `
            <option value="">
                Selecione sua turma
            </option>
        `;

        classes.forEach(turma => {
            const option = document.createElement("option");

            option.value = turma.id;
            option.textContent = turma.class_code;

            turmaSelect.appendChild(option);
        });

        // Substitui o campo de texto original pelo select
        turmaInput.replaceWith(turmaSelect);

    } catch (erro) {
        console.error("Erro ao carregar cursos e turmas:", erro);

        mostrarMensagem(
            "Não foi possível carregar cursos e turmas."
        );
    }
}


/* =========================================================
   NAVEGAÇÃO ENTRE LOGIN E CADASTRO
========================================================= */

function mostrarCadastro() {
    loginForm.classList.remove("active");
    cadastroForm.classList.add("active");
}

function mostrarLogin() {
    cadastroForm.classList.remove("active");
    loginForm.classList.add("active");
}


/* =========================================================
   CADASTRO
   Valida os dados básicos e envia as informações para a API.
========================================================= */

criarContaForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("cadastroNome").value.trim();
    const ra = document.getElementById("cadastroRA").value.trim();
    const email = document.getElementById("cadastroEmail").value.trim();

    const senha = document.getElementById("cadastroSenha").value;
    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    const curso = document.getElementById("cadastroCurso").value;
    const turma = document.getElementById("cadastroTurma").value;

    // Verifica se as duas senhas digitadas são iguais
    if (senha !== confirmarSenha) {
        mostrarMensagem("As senhas não são iguais!");
        return;
    }

    // Formato esperado pelo endpoint de cadastro
    const userData = {
        name: nome,
        ra: ra,
        email: email,
        password: senha,
        course: Number(curso),
        user_class: Number(turma)
    };

    console.log("Dados enviados para cadastro:", userData);

    try {
        mostrarMensagem("Criando seu perfil...");

        // Envia os dados através da camada de autenticação
        const resposta = await register(userData);

        console.log("Usuário criado:", resposta);

        mostrarMensagem("Perfil criado com sucesso! 🌱");

        criarContaForm.reset();

        // Após o cadastro, retorna para a tela de login
        setTimeout(() => {
            mostrarLogin();
        }, 1000);

    } catch (erro) {
        console.error("Erro ao criar perfil:", erro);

        mostrarMensagem(
            erro.message || "Erro ao criar o perfil."
        );
    }
});


/* =========================================================
   LOGIN
   Envia o e-mail e a senha e redireciona o usuário após
   a autenticação.
========================================================= */

entrarForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value;

    try {
        mostrarMensagem("Entrando...");

        // Realiza o login através da camada de autenticação
        const resposta = await login(email, senha);

        console.log("Login realizado:", resposta);

        // Mantém o e-mail disponível para uso no frontend
        localStorage.setItem("usuarioEmail", email);

        mostrarMensagem("Login realizado com sucesso! 🚀");

        // Redireciona para a página principal
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);

    } catch (erro) {
        console.error("Erro ao fazer login:", erro);

        mostrarMensagem(
            erro.message || "Email ou senha incorretos!"
        );
    }
});


/* =========================================================
   MENSAGENS
   Exibe mensagens temporárias para o usuário.
========================================================= */

let messageTimeout;

function mostrarMensagem(texto) {
    clearTimeout(messageTimeout);

    message.textContent = texto;
    message.classList.add("show");

    messageTimeout = setTimeout(() => {
        message.classList.remove("show");
    }, 3000);
}


/* =========================================================
   INICIALIZAÇÃO
   Carrega cursos e turmas assim que a página é aberta.
========================================================= */

carregarOpcoesCadastro();