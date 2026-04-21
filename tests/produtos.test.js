const { produtos, cadastrarProduto, excluirProduto, editarProduto, listarProdutos,
    buscarProdutoPorId } = require("../src/produto"); //importando as funções 

describe("Função Cadastrar Produto", () => {

    //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito
    beforeEach(() => {
        produtos.length = 0;
    });

    test("Verificar se o produto é valido", () => {
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

    test("Verificar se o produto foi informado", () => {
        expect(() => cadastrarProduto()) //ao executar essa função, ela lance um erro com a mensagem ‘Produto não informado’”
            .toThrow("Produto não informado");
    });

    test("Verificar campos obrigatórios", () => {
        const produto = {
            id: 2,
            nome: "Blusa do Palmeiras",
            preco: 800,

        };

        expect(() => cadastrarProduto(produto)).toThrow("Todos os campos do produto são obrigatórios"); //ao executar essa função, ela lance um erro com a mensagem ‘Todos os campos do produto são obrigatórios’”
    });

    test("deve retorna Preço não pode ser negativo", () => {
        const produto = {
            id: 3,
            nome: "Equipamento para futsal",
            preco: -500,
            estoque: 100,
            categoria: "Esporte"

        };

        expect(() => cadastrarProduto(produto)).toThrow("Preço não pode ser negativo"); //ao executar essa função, ela lance um erro com a mensagem "Preço não pode ser negativo”
    });


    test("deve permite cadastrar produtos com o preço zero", () => {
        const produto = {
            id: 5,
            nome: "Apito de Treino",
            preco: 0,
            estoque: 20,
            categoria: "Esporte"
        };

        const resultado = cadastrarProduto(produto);

        expect(resultado).toEqual(produto); //comparando o contéudo
        expect(produtos).toContainEqual(produto); //verificando se o array contém um objeto com mesmos valores
    });

    test("deve retornar não permitir estoque negativo", () => {
        const produto = {
            id: 4,
            nome: "Meião",
            preco: 10,
            estoque: -5,
            categoria: "Esporte"

        };

        expect(() => cadastrarProduto(produto)).toThrow("Estoque não pode ser negativo"); //ao executar essa função, ela lance um erro com a mensagem "deve retornar não permitir estoque negativo”
    });

    test("deve permitir cadastrar produto com estoque zero", () => {
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

describe("Função Listar Produtos", () => {
    beforeEach(() => {
        produtos.length = 0;
    }); //limpando o array antes de cada teste , garantido que cada test comece com o array vazio para não gerar conflito

    test("deve retornar lista vazia quando não houver produtos cadastrados", () => {
        const resultado = listarProdutos();

        expect(resultado).toEqual([]); //comparando o contéudo
        expect(resultado).toHaveLength(0); // verificar o tamanho do array 
    });

    test("deve retornar a lista com os produtos cadastrados", () => {
        const produto1 = {
            id: 1,
            nome: "Bola de Vôlei",
            preco: 80,
            estoque: 15,
            categoria: "Esporte"
        };

        const produto2 = {
            id: 2,
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
    test("deve manter estrutura dos produtos", () => {
        const produto = {
            id: 3,
            nome: "Caneleira",
            preco: 50,
            estoque: 20,
            categoria: "Esporte"
        };

        cadastrarProduto(produto);

        const resultado = listarProdutos();

        expect(resultado[0]).toHaveProperty("id"); //Verficação se o campo existe dentro do array 
        expect(resultado[0]).toHaveProperty("nome");
        expect(resultado[0]).toHaveProperty("preco");
        expect(resultado[0]).toHaveProperty("estoque");
        expect(resultado[0]).toHaveProperty("categoria");
    });

    // acompanha corretamente as alterações no sistema, 
    // garantindo que novos produtos adicionados sejam refletidos na lista
    test("deve atualizar a lista após adicionar novos produtos", () => {

        const produto1 = {
            id: 1,
            nome: "Bola",
            preco: 50,
            estoque: 10,
            categoria: "Esporte"
        };

        cadastrarProduto(produto1);

        let resultado = listarProdutos();
        expect(resultado).toHaveLength(1);

        const produto2 = {
            id: 2,
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


