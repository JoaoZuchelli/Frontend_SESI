function executarSistema() {

    let nome = document.getElementById("inputNome").value;
    let idade = Number(document.getElementById("inputIdade").value);
    let valor = Number(document.getElementById("inputValor").value);
    let cupom = document.getElementById("inputCupom").value;


    if (nome == "") {
        alert("Erro: o nome não pode estar vazio.");
        return;
    }

    if (nome.length < 10) {
        alert("Erro: o nome deve possuir no mínimo 10 caracteres.");
        return;
    }

    if (nome.length > 2300) {
        alert("Erro: o nome pode possuir no máximo 2300 caracteres.");
        return;
    }



    if (idade < 0) {
        alert("Erro: idade não pode ser negativa.");
        return;
    }

    if (idade > 100) {
        alert("Erro: a idade máxima permitida é 100 anos.");
        return;
    }



    if (valor <= 0) {
        alert("Erro: o valor deve ser maior que zero.");
        return;
    }



    if (cupom == "true") {
        valor = valor * 0.85; 
    }



    localStorage.setItem("nomeCliente", nome);
    localStorage.setItem("idadeCliente", idade);
    localStorage.setItem("valorFinal", valor);
    localStorage.setItem("cupom", cupom);



    alert("Venda finalizada com sucesso!");


}
  
function validarAcesso() {

    const inputNome = document.getElementById("inputNome");
    const inputIdade = document.getElementById("inputIdade");
    const mensagem = document.getElementById("mensagem");

    const nome = inputNome.value.trim();
    const idade = parseInt(inputIdade.value);

    if (!nome || isNaN(idade)) {
        mensagem.innerText = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    if (nome.length < 10) {
        mensagem.innerText = "O nome deve conter no mínimo 10 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    if (idade < 16) {
        mensagem.innerText = "Acesso permitido apenas para maiores de 16 anos.";
        mensagem.style.color = "red";
        return;
    }

    if (idade > 100) {
        mensagem.innerText = "A idade máxima permitida é de 100 anos.";
        mensagem.style.color = "red";
        return;
    }

    localStorage.setItem("nome", nome);
    localStorage.setItem("idade", idade);

    mensagem.innerText = "Acesso liberado!";
    mensagem.style.color = "green";

    window.location.href = "trabaio.html";
}
