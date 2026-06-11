function executarSistema() {
 
    try {
      
        const inputNome = document.getElementById("inputNome");
        const inputIdade = (document.getElementById("inputIdade"));
        const inputValor = (document.getElementById("inputValor"));
        const inputCupom = document.getElementById("inputCupom");

    
        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnfinalizar")

        btn.disable = true;
        btn.innerText = "Processando..."

        const nome = inputNome.value.trim();
        const idade = parseInt.inputIdade.value;
        const valor = parseFloat.inputValor.value;
        const cupom = inputCupom.value === "true";
        
        if (!nome || isNaN(idade) || isNaN(valor)) {
           msg.innerText="Preencha todos os campos corretamente";
           msg.style.color = ""
            return;
        }

        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = " ";

            let valorFinal = valor > 500 || cupom ? valor * 0.85 : valor;

     
            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = ""; 


            estoque.forEach((item) => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li);
            });

     
            relatorio.style.display = "block";
            relatorio.innerHTML = `
                <strong> RESUMO DO PEDIDO <\strong><br>
                Cliente: ${nome} <br>
                Total Original: R$ ${valor.toFixed(2)} <br>
                <strong> Total com Desconto: R$ ${valorFinal.toFixed(
                2
            )} <\strong>
            `;
        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
        }
    } catch (error) { }
}
