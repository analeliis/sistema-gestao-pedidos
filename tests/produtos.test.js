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

        //verificar o retorno
        expect(resultado).toEqual(produto);

        //verificar se o array contem os elementos ou seja se foi armazenado
        expect(produtos).toContainEqual(produto);
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

        expect(resultado).toEqual(produto); //verificando o retorno
        expect(produtos).toContainEqual(produto); //verificar se o array contem os elementos ou seja se foi armazenado
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
        expect(produtos).toContainEqual(produto); //verificar se o array contem os elementos ou seja se foi armazenado
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
        expect(resultado).toContainEqual(produto1); //verificando se os produtos foram armazenados no array
        expect(resultado).toContainEqual(produto2);
    });
});


