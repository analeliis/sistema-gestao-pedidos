const { produtos, cadastrarProduto, excluirProduto, editarProduto, listarProdutos,
    buscarProdutoPorId } = require("../src/produto"); //importando as funções 

// =====================================================
// FUNÇÃO 1: Função Cadastrar Produto
// =====================================================
describe("Função Cadastrar Produto", () => {

    //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito
    beforeEach(() => {
        produtos.length = 0;
    });

    test("CT-1: Verificar se o produto é valido", () => {
        const produto = {
            id: 1,
            nome: "Bola de Basquete",
            preco: 30.50,
            estoque: 150,
            categoria: "Esporte"
        };

        const resultado = cadastrarProduto(produto);

        //comparando o contéudo
        expect(resultado).toEqual(produto);

        //verificar se o array contem os elementos ou seja se foi armazenado
        expect(produtos).toContainEqual(produto); //verificando se o array contém um objeto com mesmos valores
    });

    test("CT-2: Verificar se o produto foi informado", () => {
        expect(() => cadastrarProduto()) //ao executar essa função, ela lance um erro com a mensagem ‘Produto não informado’”
            .toThrow("Produto não informado");
    });

    test("CT-3: Verificar campos obrigatórios", () => {
        const produto = {
            id: 2,
            nome: "Blusa do Palmeiras",
            preco: 800,

        };

        expect(() => cadastrarProduto(produto)).toThrow("Todos os campos do produto são obrigatórios"); //ao executar essa função, ela lance um erro com a mensagem ‘Todos os campos do produto são obrigatórios’”
    });

    test("CT-4: deve retorna Preço não pode ser negativo", () => {
        const produto = {
            id: 3,
            nome: "Equipamento para futsal",
            preco: -500,
            estoque: 100,
            categoria: "Esporte"

        };

        expect(() => cadastrarProduto(produto)).toThrow("Preço não pode ser negativo"); //ao executar essa função, ela lance um erro com a mensagem "Preço não pode ser negativo”
    });


    test("CT-5: deve permite cadastrar produtos com o preço zero", () => {
        const produto = {
            id: 4,
            nome: "Apito de Treino",
            preco: 0,
            estoque: 20,
            categoria: "Esporte"
        };

        const resultado = cadastrarProduto(produto);

        expect(resultado).toEqual(produto); //comparando o contéudo
        expect(produtos).toContainEqual(produto); //verificando se o array contém um objeto com mesmos valores
    });

    test("CT-6: deve retornar não permitir estoque negativo", () => {
        const produto = {
            id: 5,
            nome: "Meião",
            preco: 10,
            estoque: -5,
            categoria: "Esporte"

        };

        expect(() => cadastrarProduto(produto)).toThrow("Estoque não pode ser negativo"); //ao executar essa função, ela lance um erro com a mensagem "deve retornar não permitir estoque negativo”
    });

    test("CT-7: deve permitir cadastrar produto com estoque zero", () => {
        const produto = {
            id: 6,
            nome: "Garrafa Esportiva",
            preco: 25,
            estoque: 0,
            categoria: "Esporte"
        };

        const resultado = cadastrarProduto(produto);

        expect(resultado).toEqual(produto); //verificando o retorno
        expect(produtos).toContainEqual(produto); //verificando se o array contém um objeto com mesmos valores
    });
});

// =====================================================
// FUNÇÃO 2: Função Listar Produto
// =====================================================
describe("Função Listar Produtos", () => {
    beforeEach(() => {
        produtos.length = 0;
    }); //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito

    test("CT-8: deve retornar lista vazia quando não houver produtos cadastrados", () => {
        const resultado = listarProdutos();

        expect(resultado).toEqual([]); //comparando o contéudo
        expect(resultado).toHaveLength(0); // verificar o tamanho do array 
    });

    test("CT-9: deve retornar a lista com os produtos cadastrados", () => {
        const produto1 = {
            id: 7,
            nome: "Bola de Vôlei",
            preco: 80,
            estoque: 15,
            categoria: "Esporte"
        };

        const produto2 = {
            id: 8,
            nome: "Chuteira",
            preco: 250,
            estoque: 8,
            categoria: "Esporte"
        };

        cadastrarProduto(produto1); //aqui estamos cadastrando os produtos
        cadastrarProduto(produto2);

        const resultado = listarProdutos();

        expect(resultado).toHaveLength(2); // verificando a tamanho do array 
        expect(resultado).toContainEqual(produto1); //verificando se o array contém um objeto com mesmos valores
        expect(resultado).toContainEqual(produto2);
    });

    // Testa se os dados retornados possuem as propriedades corretas
    // Verificar integridade dos dados
    test("CT-10: deve manter estrutura dos produtos", () => {
        const produto = {
            id: 9,
            nome: "Caneleira",
            preco: 50,
            estoque: 20,
            categoria: "Esporte"
        };

        cadastrarProduto(produto);

        const resultado = listarProdutos();

        expect(resultado[0]).toHaveProperty("id");  //Verficação se o campo existe dentro do array 
        expect(resultado[0]).toHaveProperty("nome");
        expect(resultado[0]).toHaveProperty("preco");
        expect(resultado[0]).toHaveProperty("estoque");
        expect(resultado[0]).toHaveProperty("categoria");
    });

    // acompanha corretamente as alterações no sistema, 
    // garantindo que novos produtos adicionados sejam refletidos na lista
    test("CT-11: deve atualizar a lista após adicionar novos produtos", () => {

        const produto1 = {
            id: 10,
            nome: "Bola",
            preco: 50,
            estoque: 10,
            categoria: "Esporte"
        };

        cadastrarProduto(produto1);

        let resultado = listarProdutos();
        expect(resultado).toHaveLength(1);

        const produto2 = {
            id: 11,
            nome: "Chuteira",
            preco: 200,
            estoque: 5,
            categoria: "Esporte"
        };

        cadastrarProduto(produto2);

        resultado = listarProdutos();

        expect(resultado).toHaveLength(2);
        expect(resultado).toContainEqual(produto2);

    });
});

// =====================================================
// FUNÇÃO 3: Função Buscar Produto Por Id
// =====================================================
describe("Função Buscar Produto Por Id", () => {
    beforeEach(() => {
        produtos.length = 0;
    }); //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito

    test("CT-12: deve retornar o produto quando o id existir", () => {
        const produto = {
            id: 12,
            nome: "Bola de Futebol",
            preco: 100,
            estoque: 10,
            categoria: "Esporte"
        };

        cadastrarProduto(produto);

        const resultado = buscarProdutoPorId(12);

        expect(resultado).toEqual(produto); //comparando o contéudo ou seja se o produto encontrado e exatamente aquele produto que foi cadastrado
    });


    test("CT-13: deve retornar undefined quando o id não existir", () => {
        const produto = {
            id: 13,
            nome: "Chuteira",
            preco: 200,
            estoque: 5,
            categoria: "Esporte"
        };

        cadastrarProduto(produto);

        const resultado = buscarProdutoPorId(34);

        expect(resultado).toBeUndefined(); //expectativa que o resultado não tenha valor nenhum
    });

    test("CT-14: deve retornar o produto correto em meio a vários produtos", () => {
        const produto1 = {
            id: 14,
            nome: "Medalhas",
            preco: 100.30,
            estoque: 100,
            categoria: "Esporte"
        };

        const produto2 = {
            id: 15,
            nome: "Bolsa esportiva nike",
            preco: 600,
            estoque: 25,
            categoria: "Esporte"
        };

        const produto3 = {
            id: 16,
            nome: "Corda de ginástica",
            preco: 80.30,
            estoque: 4,
            categoria: "Esporte"
        };

        cadastrarProduto(produto1);
        cadastrarProduto(produto2);
        cadastrarProduto(produto3);

        const resultado = buscarProdutoPorId(16);

        expect(resultado).toEqual(produto3);
    });

    test("CT-15: deve retornar undefined quando não houver produtos cadastrados", () => {
        const resultado = buscarProdutoPorId(1);

        expect(resultado).toBeUndefined(); //expectativa que o resultado não tenha valor nenhum
    });

});

// =====================================================
// FUNÇÃO 4: Função Excluir Produto
// =====================================================
describe("Função Excluir Produto", () => {
    beforeEach(() => {
        produtos.length = 0;
    }); //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito


    test("CT-16: deve excluir um produto existente", () => {
        const produto = {
            id: 17,
            nome: "Bola Society",
            preco: 90,
            estoque: 12,
            categoria: "Esporte"
        };

        cadastrarProduto(produto);

        const resultado = excluirProduto(17);

        expect(resultado).toEqual(produto);  //comparando o conteúdo
        expect(produtos).toHaveLength(0); //verificar quantos elementos tem no array 
    });

    test("CT-17: deve lançar erro quando o produto não existir", () => {
        expect(() => excluirProduto(45)).toThrow("Produto não encontrado"); //verifica se o erro aconteceu  
    });                                                                  //sem função anonima o jest não conseguiria verificar o erro 
    // o Jest executa a função e consegue capturar e comparar o erro corretamente.


    test("CT-18: deve excluir o produto correto em meio a vários produtos", () => {
        const produto1 = {
            id: 20,
            nome: "Peso de academia",
            preco: 50,
            estoque: 10,
            categoria: "Esporte"
        };

        const produto2 = {
            id: 21,
            nome: "Bermuda ",
            preco: 200,
            estoque: 5,
            categoria: "Roupa"
        };

        const produto3 = {
            id: 22,
            nome: "Camiseta do Brasil",
            preco: 80,
            estoque: 20,
            categoria: "Roupa"
        };

        cadastrarProduto(produto1);
        cadastrarProduto(produto2);
        cadastrarProduto(produto3);

        const resultado = excluirProduto(21);

        expect(resultado).toEqual(produto2); // verifica se removeu o produto correto
        expect(produtos).toHaveLength(2); // verifica se o array diminuiu
    });

    //verificar se os produtos restantes continuam no array depois da exclusão.
    test("CT-19: deve manter os outros produtos no array após excluir um item", () => {
        const produto1 = {
            id: 30,
            nome: "Bicicleta",
            preco: 1.500,
            estoque: 80,
            categoria: "Esporte Livre"
        };

        const produto2 = {
            id: 31,
            nome: "Barraca de Camping",
            preco: 200,
            estoque: 10,
            categoria: "Esporte Ao Ar Livre"
        };

        cadastrarProduto(produto1);
        cadastrarProduto(produto2);

        excluirProduto(30);

        expect(produtos).toHaveLength(1);
        expect(produtos[0]).toEqual(produto2);
    });

});

// =====================================================
// FUNÇÃO 5: Função Editar Produto
// =====================================================
describe("Função Editar Produto", () => {
    beforeEach(() => {
        produtos.length = 0;
    }); //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito

    test("CT-20: deve editar um produto existente", () => {
        const produto = {
            id: 31,
            nome: "Barraca de Camping",
            preco: 200,
            estoque: 10,
            categoria: "Esporte Ao Ar Livre"
        };

        cadastrarProduto(produto);

        const novosDados = {
            nome: "Bola Profissional",
            preco: 80
        };

        const resultado = editarProduto(31, novosDados);

        expect(resultado.nome).toBe("Bola Profissional"); //comparando o conteúdo
        expect(resultado.preco).toBe(80);
    });

    test("CT-21: deve lançar erro quando o produto não existir", () => {
        const novosDados = {
            nome: "Produto Atualizado",
            preco: 100
        };

        expect(() => editarProduto(38, novosDados)).toThrow("Produto não encontrado");
    });

    test("CT-22: deve lançar erro ao tentar atualizar com preço negativo", () => {
        const produto = {
            id: 30,
            nome: "Bicicleta",
            preco: 1.500,
            estoque: 80,
            categoria: "Esporte Livre"
        };

        cadastrarProduto(produto);

        const novosDados = {
            preco: -20
        };

        expect(() => editarProduto(30, novosDados))
            .toThrow("Preço não pode ser negativo");
    });

    test("CT-23: deve lançar erro ao tentar atualizar com estoque negativo", () => {
        const produto = {
            id: 21,
            nome: "Bermuda",
            preco: 200,
            estoque: 5,
            categoria: "Roupa"
        };

        cadastrarProduto(produto);

        const novosDados = {
            estoque: -10
        };

        expect(() => editarProduto(21, novosDados))
            .toThrow("Estoque não pode ser negativo");
    });


});

