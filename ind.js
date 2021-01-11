const express = require("express");
const app = express();

app.set("view engine", "ejs"); //Aqui estou dizendo para o Express que quero utilizar EJS como engine view. Depois terei que criar uma pasta view para salvar todos os meus arquivos HTML lá dentro, porém minha extensão será EJS e não HTML
app.use(express.static('public'));


app.get("/:nome/:lang", (req, res)=>{
res.render("index", ()=>{
var nome = req.params.nome;
var lang = req.params.lang;
var exibirMsg = true;

var produtos = [ //array
{nome: "doritos", preco: 3.15},
{nome: "polenta", preco:2},
{nome: "arroz", preco:1.50}
]

res.render("index",{ // Ao digitar render eu estou direcionando para a pasta views. Por isso não preciso colocar barras e outras simbolos do genero. Só utilizo barra se eu tiver sub pasta, por exemplo: principal/perfil. Como se tivesse uma sub pasta principal com um arquivo perfil lá dentro.
nome: nome,
lang: lang,
empresa: "Selvage Code",
inscritos: 8000,
msg: exibirMsg,
produtos: produtos
}); // Ao digitar vírgula e abrir chaves {} depois do index, estou enviando os valores dentro das chaves para o HTML
});

});

app.listen(8081,()=>{
console.log("App rodando!");});
