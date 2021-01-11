const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta"); //estou recendo o modulo pergunta - MODEL
const Resposta = require("./database/Resposta");

connection.authenticate() //é uma espécie de if (autenticação de erro). Ele vai tentar logar no mysql
            .then(()=> { //O then só ocorre quando a autenticação foi chamada com sucesso
                console.log("Conexão feita com o banco de dados!")
            })
            .catch((msgErro) => { //caso um erro ocorra o catch é chamado
                console.log(msgErro);
            })

//Aqui estou dizendo para o Express que quero utilizar EJS como engine view. Depois terei que criar uma pasta view para salvar todos os meus arquivos HTML lá dentro, porém minha extensão será EJS e não HTML
app.set("view engine", "ejs"); 
app.use(express.static('public'));
//Isso é o que codifica os dados enviados pelo formulário
app.use(bodyParser.urlencoded({extended: false}));
//Aqui consigo codificar os dados via json. Mas só vou usar isso em API
app.use(bodyParser.json());


// ROTAS
app.get("/", (req, res)=>{ 
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});
//findAll procura todas as perguntas no mysql
//raw: true procura só as perguntas (limpa as outras coisas)
//order:[] é para ordenar as respostas e perguntas. Neste caso estamos fazendo pelo id em ordem decrescente (DESC). Nesse caso id e desc estão em um array dentro do array order
//then utilizado aqui é para depois que ele achar, imprime
// puxei o res.render e abri um json e criei uma variável perguntas para enviá-las para o frontend

app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
    });

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo; // O body parser oferece o body. Aqui estou chamando meus names do HTML
    var descricao = req.body.descricao;

    //ISSO É UM INSERT NA TABELA PERGUNTA QUE ESTÁ LÁ DENTRO DO MYSQL
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
    /*//send envia uma msg direta
    res.send("Seu formulário foi enviado com sucesso! titulo" + " " + titulo + "descricao" + " " + descricao );*/
});

app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{ //pergunta não encontrada
            res.redirect("/");
        }
    });
})
// Aqui estou criando mais uma rota e estou passando um parametro id dentro da página pergunta
// Depois na variável id eu importo o parametro e uso o model que representa a tabela (Pergunta) para acessar o banco de dados e encontrar um só arquivo através do findOne
// O where direciona justamente a isso e os id não possuem nenhum numero justamente porque é para ser o numero que o usuário introduzir. Id: é uma variável
// O then vem depois de ser executada a minha pesquisa. O then cria um if para verificar com a msg certo ou redireciona para a home
// No render, abri um json novo e passei a var pergunta com o valor pergunta pra acessar à página pergunta onde está o front

// O body parser oferece o body. Aqui estou chamando meus names do HTML
//ISSO É UM INSERT NA TABELA PERGUNTA QUE ESTÁ LÁ DENTRO DO MYSQL
/*//send envia uma msg direta
    res.send("Seu formulário foi enviado com sucesso! titulo" + " " + titulo + "descricao" + " " + descricao );*/

app.post("/responder",(req, res)=>{
    var corpo = req.body.corpo; 
    var perguntaID = req.body.pergunta;
    console.log(req.body);
    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID
    }).then(() => {
        res.redirect("/pergunta/"+perguntaID);
    });
});


app.listen(8081,()=>{
console.log("App rodando!");});