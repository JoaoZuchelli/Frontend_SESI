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

    window.location.href = "index.html";
}