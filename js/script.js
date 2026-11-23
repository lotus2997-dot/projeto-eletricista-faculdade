console.log("JavaScript funcionando!");

//  DARK MODE 
const botaoTema = document.getElementById("botao-tema");
const corpo = document.body;

function atualizarTextoTema(estaEscuro) {
    botaoTema.textContent = estaEscuro ? "☀️ Modo Claro" : "🌙 Modo Escuro";
}

// Restaura a preferência salva ao recarregar a página
if (localStorage.getItem("tema") === "dark") {
    corpo.classList.add("dark-mode");
    atualizarTextoTema(true);
}

botaoTema.addEventListener("click", function () {
    const estaEscuro = corpo.classList.toggle("dark-mode");
    localStorage.setItem("tema", estaEscuro ? "dark" : "light");
    atualizarTextoTema(estaEscuro);
});

//  MÁSCARA DE TELEFONE 
const campoTelefone = document.getElementById("telefone");

campoTelefone.addEventListener("input", function (evento) {
    let valor = evento.target.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 6) {
        valor = valor.length === 11
            ? valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
            : valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (valor.length > 0) {
        valor = valor.replace(/^(\d*)$/, "($1");
    }

    evento.target.value = valor;
});

//  VALIDAÇÃO COM REGEX E ENVIO WHATSAPP 
const formulario = document.getElementById("formulario-contato");
const mensagemErro = document.getElementById("mensagem-erro");

const campoNome = document.getElementById("name");
const campoBairro = document.getElementById("bairro");
const campoRua = document.getElementById("rua");
const campoNumero = document.getElementById("numero");
const campoDescricao = document.getElementById("descricao");

const campos = [campoNome, campoTelefone, campoBairro, campoRua, campoNumero, campoDescricao];

// Remove o destaque de erro assim que o usuário volta a digitar no campo
campos.forEach(function (campo) {
    campo.addEventListener("input", function () {
        campo.classList.remove("campo-invalido");
    });
});

// Expressões Regulares (Regex)
const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/;
const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const regexBairro = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.'-]{2,}$/;
const regexRua = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,'ºª-]{2,}$/;
const regexNumero = /^(\d{1,6}[A-Za-z]?|S\/N)$/i;
const regexDescricao = /^.{10,}$/s;

function exibirErro(campo, texto) {
    mensagemErro.textContent = texto;
    campo.classList.add("campo-invalido");
    campo.focus();
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mensagemErro.textContent = "";
    campos.forEach(function (campo) {
        campo.classList.remove("campo-invalido");
    });

    const nome = campoNome.value.trim();
    const telefone = campoTelefone.value.trim();
    const bairro = campoBairro.value.trim();
    const rua = campoRua.value.trim();
    const numero = campoNumero.value.trim();
    const descricao = campoDescricao.value.trim();

    if (!regexNome.test(nome)) {
        exibirErro(campoNome, "Digite um nome válido (apenas letras, mínimo de 3 caracteres).");
        return;
    }

    if (!regexTelefone.test(telefone)) {
        exibirErro(campoTelefone, "Digite um telefone completo com DDD. Ex: (17) 99177-0413.");
        return;
    }

    if (!regexBairro.test(bairro)) {
        exibirErro(campoBairro, "Informe um bairro válido.");
        return;
    }

    if (!regexRua.test(rua)) {
        exibirErro(campoRua, "Informe o nome da rua corretamente.");
        return;
    }

    if (!regexNumero.test(numero)) {
        exibirErro(campoNumero, "Informe um número válido (ex: 4214, 120A ou S/N).");
        return;
    }

    if (!regexDescricao.test(descricao)) {
        exibirErro(campoDescricao, "Descreva o serviço com pelo menos 10 caracteres.");
        return;
    }

    const mensagem = `Olá! Gostaria de solicitar um serviço elétrico.

Nome: ${nome}
Telefone: ${telefone}
Bairro: ${bairro}
Rua: ${rua}
Número: ${numero}
Descrição: ${descricao}`;

    const mensagemFormatada = encodeURIComponent(mensagem);
    const numeroEletricista = "5517992113703";
    const linkWhatsapp = `https://wa.me/${numeroEletricista}?text=${mensagemFormatada}`;

    window.location.href = linkWhatsapp;
});