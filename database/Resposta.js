const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    }, //não esquecer essa vírgula
    perguntaID:{
        type: Sequelize.INTEGER, //Aqui estou criando um relacionamento entre a tabela resposta e a tabela pergunta no banco de dados
        allowNull: false
    }
});

Resposta.sync({force: false}); // enviando para o banco de dados com force: false para não criar outra tabela, caso já esteja existente

module.exports = Resposta;