const produtos = [];

function cadastrarProduto(produto) {
  // Verifica se o produto foi informado
  if (!produto) {
    throw new Error("Produto não informado");
  }
  // Verifica campos obrigatórios
  if (
    produto.id === undefined ||
    !produto.nome ||
    produto.preco === undefined ||
    produto.estoque === undefined ||
    !produto.categoria
  ) {
    throw new Error("Todos os campos do produto são obrigatórios");
  }

  // Validação: não permitir preço negativo
  if (produto.preco < 0) {
    throw new Error("Preço não pode ser negativo");
  }

  // Validação: não permitir estoque negativo
  if (produto.estoque < 0) {
    throw new Error("Estoque não pode ser negativo");
  }

  // Adiciona o produto no array
  produtos.push(produto);

  // Retorna o produto cadastrado
  return produto;
}


function excluirProduto(id) {
  const indice = produtos.findIndex(produto => produto.id === id);

  if (indice === -1) {
    throw new Error("Produto não encontrado");
  }

  return produtos.splice(indice, 1)[0];
}

function editarProduto(id, novosDados) {
  // procura o produto
  const produto = produtos.find(produto => produto.id === id);

  // se não encontrar
  if (!produto) {
    throw new Error("Produto não encontrado");
  }

  // valida preço (se vier no novo dado)
  if (novosDados.preco !== undefined && novosDados.preco < 0) {
    throw new Error("Preço não pode ser negativo");
  }

  // valida estoque (se vier no novo dado)
  if (novosDados.estoque !== undefined && novosDados.estoque < 0) {
    throw new Error("Estoque não pode ser negativo");
  }

  // atualiza os dados
  Object.assign(produto, novosDados);

  // retorna o produto atualizado
  return produto;
}


function listarProdutos() {
  return produtos;
}

function buscarProdutoPorId(id) {
  return produtos.find(produto => produto.id === id);
}

// Exporta funções para uso em outros arquivos
export {
  produtos,
  cadastrarProduto,
  excluirProduto,
  editarProduto,
  listarProdutos,
  buscarProdutoPorId
};