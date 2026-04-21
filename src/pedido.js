const { calcularSubtotal } = require('./carrinho.js');

const CUPONS_VALIDOS = {
  "DEZOFF": 0.10,
  "VINTEOFF": 0.20
};

const VALOR_MINIMO_FRETE_GRATIS = 200;

function aplicarCupom(valorTotal, cupom) {
  if (!cupom) return valorTotal;

  const desconto = CUPONS_VALIDOS[cupom.toUpperCase()];
  
  if (desconto === undefined) {
    throw new Error("Cupom inválido");
  }

  return valorTotal * (1 - desconto);
}

function calcularFrete(cep, valorCompra) {
  if (valorCompra >= VALOR_MINIMO_FRETE_GRATIS) {
    return 0;
  }

  if (!cep || cep.length < 5) {
    throw new Error("CEP inválido");
  }

  return cep.startsWith('7') ? 10 : 25;
}

function fecharPedido(cliente, carrinho, cupom) {
  if (!carrinho || carrinho.length === 0) {
    throw new Error("Não é permitido fechar pedido com carrinho vazio");
  }

  if (!cliente || !cliente.nome || !cliente.cep) {
    throw new Error("Dados do cliente incompletos");
  }

  const subtotal = calcularSubtotal(carrinho);
  const valorComDesconto = aplicarCupom(subtotal, cupom);
  const valorFrete = calcularFrete(cliente.cep, valorComDesconto);
  const totalFinal = valorComDesconto + valorFrete;

  return {
    cliente: cliente.nome,
    subtotal: subtotal.toFixed(2),
    desconto: (subtotal - valorComDesconto).toFixed(2),
    frete: valorFrete.toFixed(2),
    totalFinal: totalFinal.toFixed(2),
    status: "Pedido Realizado com Sucesso"
  };
}

module.exports = {
  aplicarCupom,
  calcularFrete,
  fecharPedido
};
