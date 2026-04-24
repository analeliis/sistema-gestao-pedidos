let produtos = [];
let carrinho = [];
let proximoId = 1;
let editandoId = null;

// Cadastro / edição
window.execCadastrar = function () {
  try {
    const nome = document.getElementById("nome").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const estoque = parseInt(document.getElementById("estoque").value);
    const categoria = document.getElementById("categoria").value;

    if (!nome || isNaN(preco) || isNaN(estoque) || !categoria) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    if (preco < 0) {
      throw new Error("Preço não pode ser negativo.");
    }

    if (estoque < 0) {
      throw new Error("Estoque não pode ser negativo.");
    }

    if (editandoId !== null) {
      const produto = produtos.find((p) => p.id === editandoId);

      if (!produto) {
        throw new Error("Produto não encontrado para edição.");
      }

      produto.nome = nome;
      produto.preco = preco;
      produto.estoque = estoque;
      produto.categoria = categoria;

      editandoId = null;
      document.querySelector(".btn-primary").textContent = "Salvar Produto";
    } else {
      const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        estoque,
        categoria
      };

      produtos.push(novoProduto);
    }

    limparFormularioProduto();
    renderizarProdutos();
    renderizarCarrinho();
  } catch (erro) {
    alert(erro.message);
  }
};

// Buscar produto
window.execBuscar = function () {
  const idBusca = parseInt(document.getElementById("searchId").value);
  const resultado = document.getElementById("resultadoBusca");

  if (isNaN(idBusca)) {
    resultado.textContent = "Digite um ID válido.";
    return;
  }

  const produto = produtos.find((p) => p.id === idBusca);

  if (!produto) {
    resultado.textContent = "Produto não encontrado.";
    return;
  }

  resultado.textContent =
    `Encontrado: ${produto.nome} | Categoria: ${produto.categoria} | Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")} | Estoque: ${produto.estoque}`;
};

// Editar produto
window.execEditarProduto = function (id) {
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  document.getElementById("nome").value = produto.nome;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("estoque").value = produto.estoque;
  document.getElementById("categoria").value = produto.categoria;

  editandoId = id;
  document.querySelector(".btn-primary").textContent = "Atualizar Produto";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Excluir produto
window.execExcluirProduto = function (id) {
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    alert("Produto não encontrado.");
    return;
  }

  const estaNoCarrinho = carrinho.some((item) => item.produto.id === id);

  if (estaNoCarrinho) {
    alert("Não é possível excluir um produto que está no carrinho.");
    return;
  }

  produtos.splice(index, 1);
  renderizarProdutos();
};

// Adicionar ao carrinho
window.execAddCarrinho = function (id) {
  try {
    const produto = produtos.find((p) => p.id === id);

    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    if (produto.estoque <= 0) {
      throw new Error("Não permitir adicionar produto sem estoque.");
    }

    const item = carrinho.find((i) => i.produto.id === id);

    if (item) {
      item.quantidade += 1;
    } else {
      carrinho.push({
        produto,
        quantidade: 1
      });
    }

    produto.estoque -= 1;

    renderizarProdutos();
    renderizarCarrinho();
  } catch (erro) {
    alert(erro.message);
  }
};

// Aumentar quantidade
window.aumentarQuantidade = function (id) {
  const produto = produtos.find((p) => p.id === id);
  const item = carrinho.find((i) => i.produto.id === id);

  if (!produto || !item) {
    alert("Item não encontrado.");
    return;
  }

  if (produto.estoque <= 0) {
    alert("Estoque insuficiente.");
    return;
  }

  item.quantidade += 1;
  produto.estoque -= 1;

  renderizarProdutos();
  renderizarCarrinho();
};

// Diminuir quantidade
window.diminuirQuantidade = function (id) {
  const item = carrinho.find((i) => i.produto.id === id);

  if (!item) {
    alert("Item não encontrado.");
    return;
  }

  item.quantidade -= 1;
  item.produto.estoque += 1;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter((i) => i.produto.id !== id);
  }

  renderizarProdutos();
  renderizarCarrinho();
};

// Remover do carrinho
window.execRemoverCarrinho = function (id) {
  const index = carrinho.findIndex((i) => i.produto.id === id);

  if (index === -1) {
    alert("Produto não está no carrinho.");
    return;
  }

  const item = carrinho[index];
  item.produto.estoque += item.quantidade;
  carrinho.splice(index, 1);

  renderizarProdutos();
  renderizarCarrinho();
};

// Calcular subtotal
function calcularSubtotal() {
  return carrinho.reduce((total, item) => {
    return total + item.produto.preco * item.quantidade;
  }, 0);
}

// Aplicar cupom
function aplicarCupom(valorTotal, cupom) {
  if (!cupom || cupom.trim() === "") {
    return valorTotal;
  }

  const cupons = {
    DEZOFF: 0.10,
    VINTEOFF: 0.20
  };

  const desconto = cupons[cupom.toUpperCase()];

  if (desconto === undefined) {
    throw new Error("Cupom inválido.");
  }

  return valorTotal * (1 - desconto);
}

// Calcular frete
function calcularFrete(cep, valorCompra) {
  const cepLimpo = cep.replace(/\D/g, "");

  if (!cepLimpo || cepLimpo.length !== 8) {
    throw new Error("CEP inválido.");
  }

  if (valorCompra >= 200) {
    return 0;
  }

  return cepLimpo.startsWith("7") ? 10 : 25;
}

// Fechar pedido
window.execFecharPedido = function () {
  try {
    const nomeCliente = document.getElementById("nomeCliente").value.trim();
    const cepCliente = document.getElementById("cepCliente").value.trim();
    const cupom = document.getElementById("cupom").value.trim().toUpperCase();

    if (carrinho.length === 0) {
      throw new Error("Não é permitido fechar pedido com carrinho vazio.");
    }

    if (!nomeCliente) {
      throw new Error("Informe o nome do cliente.");
    }

    if (!cepCliente) {
      throw new Error("Informe o CEP do cliente.");
    }

    const subtotal = calcularSubtotal();
    const valorComDesconto = aplicarCupom(subtotal, cupom);
    const frete = calcularFrete(cepCliente, valorComDesconto);
    const totalFinal = valorComDesconto + frete;

    exibirResumo({
      cliente: nomeCliente,
      subtotal: subtotal,
      desconto: subtotal - valorComDesconto,
      frete: frete,
      total: totalFinal
    });

    carrinho = [];
    renderizarCarrinho();
    renderizarProdutos();

    document.getElementById("nomeCliente").value = "";
    document.getElementById("cepCliente").value = "";
    document.getElementById("cupom").value = "";
  } catch (erro) {
    alert(erro.message);
  }
};

// Render catálogo
function renderizarProdutos() {
  const tabela = document.getElementById("lista-produtos");

  if (produtos.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="6" class="empty-cell">Nenhum produto cadastrado.</td>
      </tr>
    `;
    return;
  }

  tabela.innerHTML = produtos.map((p) => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${p.categoria}</td>
      <td>R$ ${p.preco.toFixed(2).replace(".", ",")}</td>
      <td class="${p.estoque > 0 ? "text-success" : "text-muted"}">${p.estoque}</td>
      <td>
        <div class="actions">
          <button class="action-btn btn-add" onclick="execAddCarrinho(${p.id})">🛒 Adicionar</button>
          <button class="action-btn btn-edit" onclick="execEditarProduto(${p.id})">🖊️ Editar</button>
          <button class="action-btn btn-delete" onclick="execExcluirProduto(${p.id})">🗑 Excluir</button>
        </div>
      </td>
    </tr>
  `).join("");
}

// Render carrinho
function renderizarCarrinho() {
  const tabela = document.getElementById("itens-carrinho");
  const subtotalEl = document.getElementById("subtotal-carrinho");

  subtotalEl.textContent = `R$ ${calcularSubtotal().toFixed(2).replace(".", ",")}`;

  if (carrinho.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="5" class="empty-cell">O carrinho está vazio.</td>
      </tr>
    `;
    return;
  }

  tabela.innerHTML = carrinho.map((item) => `
    <tr>
      <td>${item.produto.nome}</td>
      <td>R$ ${item.produto.preco.toFixed(2).replace(".", ",")}</td>
      <td>
        <div class="qty-box">
          <button class="qty-btn" onclick="diminuirQuantidade(${item.produto.id})">−</button>
          <div class="qty-value">${item.quantidade}</div>
          <button class="qty-btn" onclick="aumentarQuantidade(${item.produto.id})">+</button>
        </div>
      </td>
      <td>R$ ${(item.produto.preco * item.quantidade).toFixed(2).replace(".", ",")}</td>
      <td>
        <button class="action-btn btn-remove" onclick="execRemoverCarrinho(${item.produto.id})">🗑 Remover</button>
      </td>
    </tr>
  `).join("");
}

// Exibir resumo
function exibirResumo(dados) {
  const resultado = document.getElementById("resultado-final");

  resultado.classList.remove("hidden");
  resultado.innerHTML = `
    <p><strong>Cliente:</strong> ${dados.cliente}</p>
    <p><strong>Subtotal:</strong> R$ ${dados.subtotal.toFixed(2).replace(".", ",")}</p>
    <p><strong>Desconto:</strong> R$ ${dados.desconto.toFixed(2).replace(".", ",")}</p>
    <p><strong>Frete:</strong> R$ ${dados.frete.toFixed(2).replace(".", ",")}</p>
    <p><strong>Total Final:</strong> R$ ${dados.total.toFixed(2).replace(".", ",")}</p>
    <p class="text-success"><strong>Status:</strong> Pedido realizado com sucesso.</p>
  `;
}

// Limpar formulário
function limparFormularioProduto() {
  document.getElementById("nome").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("estoque").value = "";
  document.getElementById("categoria").value = "";
}

// Inicialização
renderizarProdutos();
renderizarCarrinho();