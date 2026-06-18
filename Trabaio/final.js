function executarSistema() {

    try {
        const inputNome = document.getElementById("inputNome");
        const inputIdade = document.getElementById("inputIdade");
        const inputCupom = document.getElementById("inputCupom");

        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnFinalizar");

        btn.disabled = true;
        btn.innerText = "Processando...";

        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        const cupom = inputCupom.value === "true";

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        if (carrinho.length === 0) {
            msg.innerText = "Carrinho vazio! Adicione produtos antes de finalizar.";
            msg.style.color = "#ff4444";
            btn.disabled = false;
            btn.innerText = "Finalizar Venda";
            return;
        }

        let valor = 0;

        carrinho.forEach(item => {
            valor += item.valor;
        });

        if (!nome || isNaN(idade)) {
            msg.innerText = "Preencha todos os dados por gentileza!";
            msg.style.color = "#ff4444";
            btn.disabled = false;
            btn.innerText = "Finalizar Venda";
            return;
        }

        if (nome.length < 10) {
            msg.innerText = "O nome deve conter no mínimo 10 caracteres.";
            msg.style.color = "#ff4444";
            btn.disabled = false;
            btn.innerText = "Finalizar Venda";
            return;
        }

        if (idade < 0) {
            msg.innerText = "A idade não pode ser negativa.";
            msg.style.color = "#ff4444";
            btn.disabled = false;
            btn.innerText = "Finalizar Venda";
            return;
        }

        if (idade > 100) {
            msg.innerText = "A idade máxima permitida é de 100 anos.";
            msg.style.color = "#ff4444";
            btn.disabled = false;
            btn.innerText = "Finalizar Venda";
            return;
        }

        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#00ff88";

            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

            lista.innerHTML = "";

            carrinho.forEach(item => {
                let li = document.createElement("li");
                li.innerText = `${item.nome} - R$ ${item.valor}`;
                lista.appendChild(li);
            });

            relatorio.style.display = "block";
            relatorio.innerHTML = `
                <strong>RESUMO DO PEDIDO</strong><br><br>

                Cliente: ${nome} <br><br>

                Itens:<br>
                ${carrinho.map(item => `✔ ${item.nome}`).join("<br>")}<br><br>

                Total original: R$ ${valor.toFixed(2)} <br>
                <strong>Total com desconto: R$ ${valorFinal.toFixed(2)}</strong>
            `;

            localStorage.removeItem("carrinho");

        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
            btn.disabled = false;
            btn.innerText = "Finalizar Venda";
        }

    } catch (error) {
        console.log(error);
    }
}