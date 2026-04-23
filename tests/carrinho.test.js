const { adicionarAoCarrinho, removerDoCarrinho, calcularSubtotal } = require("../src/carrinho"); //importando as funções 

  // =====================================================
  // FUNÇÃO 1: Função Adicionar ao Carrinho
  // =====================================================
describe("Função Adicionar ao Carrinho", () => {
    let carrinho;

    beforeEach(() => {
        carrinho = [];
    }); //limpado o array 

    test("CT-01: deve adicionar um produto ao carrinho", () => {
        const produto = {
            id: 1,
            nome: "Bola de Futebol",
            preco: 100,
            estoque: 10,
            categoria: "Esporte"
        };

        const resultado = adicionarAoCarrinho(carrinho, produto, 2);

        expect(resultado).toHaveLength(1); //quantidade de elementos que possui o array
        expect(resultado[0].produto).toEqual(produto); //comparando o conteudo 
        expect(resultado[0].quantidade).toBe(2);
    });

    test("CT-02:deve lançar erro quando a quantidade for menor ou igual a zero", () => {
        const produto = {
            id: 2,
            nome: "Chuteira",
            preco: 200,
            estoque: 10,
            categoria: "Esporte"
        };

        expect(() => adicionarAoCarrinho(carrinho, produto, 0))
            .toThrow("Quantidade deve ser maior que 0");
    });

    test("CT-03: deve lançar erro quando o produto estiver sem estoque", () => {
        const produto = {
            id: 3,
            nome: "Camisa",
            preco: 80,
            estoque: 0,
            categoria: "Roupa"
        };

        expect(() => adicionarAoCarrinho(carrinho, produto, 1))
            .toThrow("Produto sem estoque");
    });

    test("CT-04: deve lançar erro quando a quantidade for maior que o estoque", () => {
        const produto = {
            id: 4,
            nome: "Tênis",
            preco: 300,
            estoque: 2,
            categoria: "Calçados"
        };

        expect(() => adicionarAoCarrinho(carrinho, produto, 5))
            .toThrow("Estoque insuficiente");
    });

    test("CT-05: deve lançar erro quando o carrinho for inválido", () => {
        const produto = {
            id: 5,
            nome: "Luva",
            preco: 50,
            estoque: 10,
            categoria: "Esporte"
        };

        expect(() => adicionarAoCarrinho(null, produto, 1))
            .toThrow("Carrinho inválido");
    });

    test("CT-06: deve lançar erro quando o produto for inválido", () => {
        expect(() => adicionarAoCarrinho(carrinho, null, 1))
            .toThrow("Produto inválido");
    });

    test("CT-07: deve reduzir o estoque do produto após adicionar ao carrinho", () => {
        const produto = {
            id: 6,
            nome: "Meia",
            preco: 20,
            estoque: 8,
            categoria: "Esporte"
        };

        adicionarAoCarrinho(carrinho, produto, 3);

        expect(produto.estoque).toBe(5);
    });

    test("CT-08: deve somar a quantidade quando o produto já estiver no carrinho", () => {
        const produto = {
            id: 7,
            nome: "Garrafa",
            preco: 30,
            estoque: 10,
            categoria: "Esporte"
        };

        adicionarAoCarrinho(carrinho, produto, 2);
        adicionarAoCarrinho(carrinho, produto, 3);

        expect(carrinho).toHaveLength(1);
        expect(carrinho[0].quantidade).toBe(5);
    });

});

  // =====================================================
  // FUNÇÃO 2: Função Remover do Carrinho
  // =====================================================

describe("Função Remover do Carrinho", () => {
    let carrinho;

    beforeEach(() => {
        carrinho = [];
    }); //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito

    
    test("CT-09: deve remover um produto do carrinho", () => {
        const produto = {
            id: 1,
            nome: "Bola",
            preco: 100,
            estoque: 10,
            categoria: "Esporte"
        };

        adicionarAoCarrinho(carrinho, produto, 2);

        const resultado = removerDoCarrinho(carrinho, 1);

        expect(resultado).toHaveLength(0);
    });

    test("CT-10: deve lançar erro quando o produto não estiver no carrinho", () => {
        expect(() => removerDoCarrinho(carrinho, 10))
            .toThrow("Produto não está no carrinho");
    });

    test("CT-11: deve devolver a quantidade removida ao estoque do produto", () => {
        const produto = {
            id: 2,
            nome: "Chuteira",
            preco: 200,
            estoque: 10,
            categoria: "Esporte"
        };

        adicionarAoCarrinho(carrinho, produto, 3);

        removerDoCarrinho(carrinho, 2);

        expect(produto.estoque).toBe(10);
    });

    test("CT-12: deve lançar erro quando o carrinho for inválido", () => {
        expect(() => removerDoCarrinho(null, 1))
            .toThrow("Carrinho inválido");
    });


});

  // =====================================================
  // FUNÇÃO 3: Função Calcular Subtotal
  // =====================================================
describe("Função Calcular Subtotal", () => {
    let carrinho;

    beforeEach(() => {
        carrinho = [];
    }); //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito

    test("CT-13: deve calcular corretamente o subtotal do carrinho", () => {
        carrinho = [
            {
                produto: {
                    id: 1,
                    nome: "caneleira",
                    preco: 100,
                    estoque: 10,
                    categoria: "Esporte"
                },
                quantidade: 2
            },
            {
                produto: {
                    id: 2,
                    nome: "golzinho",
                    preco: 200,
                    estoque: 5,
                    categoria: "Esporte"
                },
                quantidade: 1
            }
        ];

        const resultado = calcularSubtotal(carrinho);

        expect(resultado).toBe(400);
    });


    test("CT-14: deve retornar 0 quando o carrinho estiver vazio", () => {
        const resultado = calcularSubtotal(carrinho);

        expect(resultado).toBe(0);
    });

    test("CT-15: deve lançar erro quando o carrinho for inválido", () => {
        expect(() => calcularSubtotal(null))
            .toThrow("Carrinho inválido");
    });

    test("CT-16: deve calcular corretamente com apenas um item no carrinho", () => {
        carrinho = [
            {
                produto: {
                    id: 5,
                    nome: "Luva",
                    preco: 50,
                    estoque: 10,
                    categoria: "Esporte"
                },
                quantidade: 3
            }
        ];

        const resultado = calcularSubtotal(carrinho);

        expect(resultado).toBe(150);
    });


});