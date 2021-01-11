const Sequelize = require("sequelize");
const connection = require("./database");

//MODEL
const Pergunta = connection.define('pergunta',{
    titulo:{ //nome do campo
        type: Sequelize.STRING, //define o tipo. STRING é pra textos curtos, TEXT pra textos longos 
        allowNull: false  //impede que esse campo receba valores nulos
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Aqui estou enviando a tabela para o banco de dados (através do sync) e dizendo que só quero que a tabela seja criada uma vez (force: false)
Pergunta.sync({force: false}).then(()=> { //se for criada executa o then
    console.log("Tabela criada com sucesso!");
});

module.exports = Pergunta; // estou exportando esse modulo