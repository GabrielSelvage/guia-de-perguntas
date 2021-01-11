const Sequelize = require('sequelize');

const connection = new Sequelize ('guiadeperguntas', 'root', '123456',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

// Importei o sequelize, fiz a conexão com o meu banco de dados, que precisei criar no mysql, o root é padrão e a senha. Depois embaixo, entre chaves coloquei o local onde está rodando, no caso na minha máquina e depois a linguagem: mysql