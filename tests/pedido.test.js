// Mock
jest.mock('../src/carrinho.js', () => ({
  calcularSubtotal: jest.fn()
}));

const { calcularSubtotal } = require('../src/carrinho.js');
const { aplicarCupom, calcularFrete, fecharPedido } = require('../src/pedido.js');

describe('Testes do módulo pedido.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================================
  // FUNÇÃO 1: aplicarCupom
  // =====================================================
  describe('aplicarCupom', () => {
    test('CT-01: deve aplicar 10% de desconto com o cupom DEZOFF', () => {
      const resultado = aplicarCupom(100, 'DEZOFF');
      expect(resultado).toBe(90);
    });

    test('CT-02: deve aplicar 20% de desconto com o cupom VINTEOFF', () => {
      const resultado = aplicarCupom(200, 'VINTEOFF');
      expect(resultado).toBe(160);
    });

    test('CT-03: deve retornar o valor original quando nenhum cupom for informado', () => {
      const resultado = aplicarCupom(150, null);
      expect(resultado).toBe(150);
    });

    test('CT-04: deve lançar erro ao informar um cupom inválido', () => {
      expect(() => aplicarCupom(100, 'CUPOMFALSO')).toThrow('Cupom inválido');
    });
  });

  // =====================================================
  // FUNÇÃO 2: calcularFrete
  // =====================================================
  describe('calcularFrete', () => {
    test('CT-05: deve retornar frete grátis para compras acima de R$ 200', () => {
      const resultado = calcularFrete('71741000', 250);
      expect(resultado).toBe(0);
    });

    test('CT-06: deve retornar R$ 10 para CEP iniciado por 7', () => {
      const resultado = calcularFrete('71741000', 100);
      expect(resultado).toBe(10);
    });

    test('CT-07: deve retornar R$ 25 para CEP que não inicia por 7', () => {
      const resultado = calcularFrete('01001000', 100);
      expect(resultado).toBe(25);
    });

    test('CT-08: deve lançar erro para CEP inválido', () => {
      expect(() => calcularFrete('123', 100)).toThrow('CEP inválido');
    });
  });

  // =====================================================
  // FUNÇÃO 3: fecharPedido (mock)
  // =====================================================
  describe('fecharPedido com mock', () => {
    const clienteValido = { nome: 'Diego', cep: '71741000' };
    const carrinhoValido = [{ produto: { preco: 100 }, quantidade: 1 }];

    test('CT-09: deve fechar o pedido com sucesso usando subtotal mockado', () => {
      calcularSubtotal.mockReturnValue(100);

      const pedido = fecharPedido(clienteValido, carrinhoValido, 'DEZOFF');

      expect(calcularSubtotal).toHaveBeenCalledWith(carrinhoValido);
      expect(pedido).toEqual({
        cliente: 'Diego',
        subtotal: '100.00',
        desconto: '10.00',
        frete: '10.00',
        totalFinal: '100.00',
        status: 'Pedido Realizado com Sucesso'
      });
    });

    test('CT-10: deve lançar erro se o carrinho estiver vazio', () => {
      expect(() => fecharPedido(clienteValido, [], null))
        .toThrow('Não é permitido fechar pedido com carrinho vazio');
    });

    test('CT-11: deve lançar erro se os dados do cliente estiverem incompletos', () => {
      expect(() => fecharPedido({ nome: 'Diego' }, carrinhoValido, null))
        .toThrow('Dados do cliente incompletos');
    });

    test('CT-12: deve retornar frete grátis quando o subtotal for suficiente', () => {
      calcularSubtotal.mockReturnValue(300);

      const pedido = fecharPedido(clienteValido, carrinhoValido, null);

      expect(calcularSubtotal).toHaveBeenCalledTimes(1);
      expect(pedido.frete).toBe('0.00');
      expect(pedido.totalFinal).toBe('300.00');
      expect(pedido.status).toBe('Pedido Realizado com Sucesso');
    });
  });
});
