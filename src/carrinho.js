function adicionarAoCarrinho(carrinho, produto, quantidade) {
  if (!Array.isArray(carrinho)) {
    throw new Error("Carrinho inválido");
  }

  if (!produto || typeof produto !== "object") {
    throw new Error("Produto inválido");
  }

  if (quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que 0");
  }

  if (produto.estoque <= 0) {
    throw new Error("Produto sem estoque");
  }

  if (produto.estoque < quantidade) {
    throw new Error("Estoque insuficiente");
  }

  const item = carrinho.find(p => p.produto.id === produto.id);

  if (item) {
    item.quantidade += quantidade;
  } else {
    carrinho.push({
      produto,
      quantidade
    });
  }

  produto.estoque -= quantidade;

  return carrinho;
}

function removerDoCarrinho(carrinho, idProduto) {
  if (!Array.isArray(carrinho)) {
    throw new Error("Carrinho inválido");
  }

  const index = carrinho.findIndex(p => p.produto.id === idProduto);

  if (index === -1) {
    throw new Error("Produto não está no carrinho");
  }

  const itemRemovido = carrinho[index];

  itemRemovido.produto.estoque += itemRemovido.quantidade;

  carrinho.splice(index, 1);

  return carrinho;
}

function calcularSubtotal(carrinho) {
  if (!Array.isArray(carrinho)) {
    throw new Error("Carrinho inválido");
  }

  if (carrinho.length === 0) {
    return 0;
  }

  let total = 0;

  carrinho.forEach(item => {
    total += item.produto.preco * item.quantidade;
  });

  return total;
}

module.exports = {
  adicionarAoCarrinho,
  removerDoCarrinho,
  calcularSubtotal
};