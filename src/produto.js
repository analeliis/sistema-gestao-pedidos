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

  let produtoRemovido = null;

  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].id === id) {
      produtoRemovido = produtos[i];
      produtos.splice(i, 1); //remove 1 item do array 
      break;
    }
  }

  if (!produtoRemovido) {
    throw new Error("Produto não encontrado"); //interrompe a execução e retorna um erro
  }

  return produtoRemovido;
}


function editarProduto(id, novosDados) {
  // procura o produto
  const produto = produtos.find(produto => produto.id === id);

  // se não encontrar
  if (!produto) {
    throw new Error("Produto não encontrado");
  }

  // valida preço NovosDados
  if (novosDados.preco !== undefined && novosDados.preco < 0) {
    throw new Error("Preço não pode ser negativo");
  }

  // valida estoque  NovosDados
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
  return produtos.find(produto => produto.id === id); //procura o produto pelo id e retorna 
}

// Exporta funções para uso em outros arquivos
module.exports = {
  produtos,
  cadastrarProduto,
  excluirProduto,
  editarProduto,
  listarProdutos,
  buscarProdutoPorId
};