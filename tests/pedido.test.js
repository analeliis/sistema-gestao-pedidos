const { aplicarCupom, calcularFrete, fecharPedido } = require("../src/pedido");

describe("Função Aplicar Cupom", () => {

    test("deve aplicar desconto de 10% com o cupom DEZOFF", () => {
        const resultado = aplicarCupom(100, "DEZOFF");

        expect(resultado).toBe(90); //contéudo sendo comparado 
    });

    test("deve retornar o valor original quando não for informado cupom", () => {
        const resultado = aplicarCupom(100, "");

        expect(resultado).toBe(100);
    });

    test("deve lançar erro quando o cupom for inválido", () => {
        expect(() => aplicarCupom(100, "CUPOMERRADO"))
            .toThrow("Cupom inválido");
    });

    test("deve aplicar desconto de 20% com o cupom VINTEOFF", () => {
    const resultado = aplicarCupom(200, "VINTEOFF");

    expect(resultado).toBe(160);
});
}); 