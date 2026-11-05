console.log("JavaScript funcionando!");

const formulario = document.getElementById("formulario-contato"); //pega o formulario pelo id, e coloca numa variavel

formulario.addEventListener("submit", function(evento) {  //pega o botão pelo id no formulario, e adiciona um evento
    evento.preventDefault();

    const nome = document.getElementById("name").value; //pega o campo do nome pelo id no formulario, e coloca numa variavel
    const bairro = document.getElementById("bairro").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const telefone = document.getElementById("telefone").value;
    const descricao = document.getElementById("descricao").value;

    //cria uma variavel que contem a mensagem que vai ser enviada, colocando os dados dos campos na mensagem
    const mensagem = `Olá! Gostaria de solicitar um serviço elétrico.

Nome: ${nome}
Bairro: ${bairro}
Rua: ${rua}
Número: ${numero}
Telefone: ${telefone}
Descrição: ${descricao}`;

    const mensagemFormatada = encodeURIComponent(mensagem); //deixa a mensagem compativel com um URL e poe numa variavel
    const numeroEletricista = "5517991770413";

    const linkWhatsapp = `https://wa.me/${numeroEletricista}?text=${mensagemFormatada}`; //link do wpp


window.location.href = linkWhatsapp; //abre o link do whatsapp, com a conversa pronta

});