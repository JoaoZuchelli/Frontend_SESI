let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(nome, valor) {

    carrinho.push({
        nome: nome,
        valor: Number(valor)
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    console.log("Adicionado:", nome, valor);

    alert(nome + " adicionado ao carrinho!");
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}


function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + Number(item.valor), 0);
}


function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalHTML = document.getElementById("total-carrinho");

    if (!lista || !totalHTML) return;

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - R$ ${Number(item.valor).toFixed(2)}
            <button onclick="removerItem(${index})">X</button>
        `;
        lista.appendChild(li);
    });

    totalHTML.innerText = "Total: R$ " + calcularTotal().toFixed(2);
}

window.onload = atualizarCarrinho;