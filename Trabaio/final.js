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
        const idade = Number(inputIdade.value);
        const cupom = inputCupom.value === "true";

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  
        if (carrinho.length === 0) {
            msg.innerText = "Carrinho vazio!";
            msg.style.color = "#ff4444";
            return resetBtn(btn);
        }

   
        if (!nome || isNaN(idade)) {
            msg.innerText = "Preencha todos os dados!";
            msg.style.color = "#ff4444";
            return resetBtn(btn);
        }

        if (nome.length < 10) {
            msg.innerText = "Nome deve ter no mínimo 10 caracteres.";
            msg.style.color = "#ff4444";
            return resetBtn(btn);
        }

        if (idade < 0 || idade > 100) {
            msg.innerText = "Idade inválida.";
            msg.style.color = "#ff4444";
            return resetBtn(btn);
        }

        if (idade < 16) {
            msg.innerText = "Venda bloqueada: menor de 16 anos.";
            msg.style.color = "#ff4444";
            return resetBtn(btn);
        }

 
        msg.innerText = `Venda autorizada: ${nome}`;
        msg.style.color = "#00ff88";

        let valor = carrinho.reduce((t, item) => t + Number(item.valor), 0);
        let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

        lista.innerHTML = "";

        carrinho.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `${item.nome} - R$ ${Number(item.valor).toFixed(2)}`;
            lista.appendChild(li);
        });

        relatorio.style.display = "block";
        relatorio.innerHTML = `
            <strong>RESUMO DO PEDIDO</strong><br><br>
            Cliente: ${nome}<br><br>

            Itens:<br>
            ${carrinho.map(i => `✔ ${i.nome}`).join("<br>")}<br><br>

            Total: R$ ${valor.toFixed(2)}<br>
            <strong>Total com desconto: R$ ${valorFinal.toFixed(2)}</strong>
        `;

        localStorage.removeItem("carrinho");

        resetBtn(btn);

    } catch (error) {
        console.log(error);
    }
}

// 🔧 função auxiliar (melhora muito seu código)
function resetBtn(btn) {
    btn.disabled = false;
    btn.innerText = "Finalizar Venda";
}