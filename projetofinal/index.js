const express = require('express')  //biblioteca express serve para hospedar e rodar JavaScript 
const app = express()               //a variavel app armazena a biblioteca express
const bodyparser = require('body-parser')

const { engine } = require('express-handlebars')
const path = require('path')

app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine', 'handlebars')
app.engine('handlebars', engine())

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

const dadosfalsos = [
    {                  //JAVASCRIPT OBJECT NOTATION       JSON
                       // PROG. ORIENTADA AO OBJETO 
        id: 1,
        nome: "Zezinho da Silva Sauro",
        endereco: "Rua lalalala 100",
        telefone: "55555-5555",
        datanascimento: "24/05/2024"
    },
    {                  
        id: 2,
        nome: "Mariazinha da Silva Sauro",
        endereco: "Rua lalalala 100",
        telefone: "55555-5555",
        datanascimento: "25/05/2024"
    }
]  //LISTAS = VARIÁVEIS COM VÁRIOS VALORES

//let contador = 0

app.get('/', (req,res) => {         //aqui temos um subendereço dentro da aplicação
    //contador = contador + 1
    //res.send("EU NÃO ACREDITO!" + contador)    //programação dinâmica
    res.render('index')
})

app.get('/clientes', function(request, response){
    response.render('clientes/index', {listaclientes: dadosfalsos})
})

app.get('/clientes/novo', function(req,res){
    res.render('clientes/formcliente') //pasta/formcliente
})

//PARSER
app.post('/clientes/save', function(req,res){
    //console.log(req.body)

    let clienteantigo = dadosfalsos.find(c => c.id == req.body.id)

    if(clienteantigo == undefined){  //INCLUIR
        let maiorid = Math.max(...dadosfalsos.map(c => c.id))
        if (maiorid == -Infinity) maiorid = 0
        maiorid = maiorid + 1
        
        let novocliente ={
            id: maiorid,
            nome: req.body.nome,
            endereco: req.body.endereco,
            telefone: req.body.telefone,
            datanascimento: req.body.datanascimento
        }
        dadosfalsos.push(novocliente)
}else{  //ALTERAR
    //codigo de alteração do cliente
    clienteantigo.nome = req.body.nome
    clienteantigo.endereco = req.endereco
    clienteantigo.telefone = req.body.telefone
    clienteantigo.datanascimento = req.body.datanascimento
}
    res.redirect('/clientes')
})

app.get('/clientes/delete/:id', function(req,res){
    let umcliente = dadosfalsos.find(c => c.id == req.params['id'])
    let poscliente = dadosfalsos.indexOf(umcliente)
    if(poscliente > -1){
        dadosfalsos.splice(poscliente,1)
    }
    res.redirect('/clientes')
})

app.get('/clientes/alterar/:id', function(req,res){               //BINDING -> JS PREENCHE OS CAMPOS
    let id = req.params['id']
    let cliente = dadosfalsos.find(c => c.id == id)
    res.render('clientes/formcliente', {cliente: cliente})
})

app.listen(3000, ()=>{              //estamos subindo um servidor, pedindo para q a porta 3000 seja aberta
    console.log('Servidor Online')  // todo programa ligado á uma rede é semelhante a esse código
    console.log('http://localhost:3000/')
})


