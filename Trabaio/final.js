function executarSistema() {

    try {
        const inputNome = document.getElementById("inputNome");
        const inputIdade = document.getElementById("inputIdade");
        const inputValor = document.getElementById("inputValor");
        const inputCupom = document.getElementById("inputCupom");

        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnFinalizar");

        btn.disable = true;
        btn.innerText = "Processando...";

        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";

        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "Peencha todos os dados por gentileza!";
            msg.style.color = "#ff4444";
            return;
        }

    if (nome.length < 10) {
    msg.innerText = "O nome deve conter no mínimo 10 caracteres.";
    msg.style.color = "#ff4444";
    return;
}

    if (idade < 0) {
    msg.innerText = "A idade não pode ser negativa.";
    msg.style.color = "#ff4444";
    return;
}

    if (idade > 100) {
    msg.innerText = "A idade máxima permitida é de 100 anos.";
    msg.style.color = "#ff4444";
    return;
}

        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#00ff88";

            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = ""; 

            estoque.forEach(item => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li); 
            });

            relatorio.style.display = "block";
            relatorio.innerHTML = `
            <strong> RESUMO DO PEDIDO <\strong><br>
            Cliente: ${nome} <br>
            Total Original: R$ ${valor.toFixed(2)} <br>
            <strong> Total com Desconto: R$ ${valorFinal.toFixed(2)} <\strong>
        `;
        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
        }
    } catch (error) {

    }
}