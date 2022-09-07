const express = require('express') 
const exhpbs = require('express-handlebars') 
const mysql = require('mysql2') 
const app = express()

app.engine('handlebars', exhpbs.engine()) 
app.set('view engine', 'handlebars') 
app.use(express.urlencoded({extended: true})) 
app.use(express.json())
app.use(express.static('public'))

app.get('/',  function(req, res){   
    let sql = 'SELECT * FROM lista;' 
    coon.query(sql, function(err, sql){ 
        if(err){ 
            console.log(err)
        } else{  
            let tarefa = sql
            res.render('home', {tarefa})
        }
    })
}) 
app.get('/insert', function(req, res){ 
    res.render('insert')
}) 
app.post('/insert/tarefas', function(req, res){ 
    let nome_tarefa = req.body.nome_tarefa 
    let tarefa = req.body.tarefa
    let sql = 'INSERT INTO lista (??, ??) VALUES (?, ?);' 
    let datas = ['nome_tarefa', 'tarefa',nome_tarefa, tarefa] 
    coon.query(sql, datas, function(err){ 
        if(err){ 
            console.log(err)
        } else{ 
            res.redirect('/insert')
        }
    })
})  

app.post('/delete/tarefa/:id', (req, res) => { 
    let id = req.params.id 
    let sql = `DELETE FROM lista WHERE id = ${id};` 
    coon.query(sql, function(err){ 
        if(err){ 
            console.log(err)
        }else{ 
            res.redirect('/')
        }
    })
}) 

app.get('/update/tarefa/:id', (req, res) => {  
    let id = req.params.id
    let sql = `SELECT * FROM lista WHERE id = ${id};`
    coon.query(sql, function(err, data){ 
        if(err){ 
            console.log(err)
        }else{  
            let tarefa = data[0]
            res.render('update', {tarefa})
        }
    })
}) 

app.post('/update/tarefa', (req, res) => { 
    let id = req.body.id   
    let nome_tarefa = req.body.nome_tarefa
    let tarefa = req.body.tarefa
    let sql = "UPDATE lista SET ?? = ?, ?? = ? WHERE ?? = ?;"  
    let datas = ['nome_tarefa', nome_tarefa, "tarefa", tarefa, "id", id]
    coon.query(sql, datas, function(err, data){ 
        if(err){ 
            console.log(err)
        } else{ 
            res.redirect('/')
        }
    })
})

const coon = mysql.createConnection({ 
    host: "localhost", 
    user: "root",  
    password: '',
    database: "lista_tarefas"
}) 

coon.connect((err) => { 
    if(err){ 
        console.log(err)
    }  
    app.listen(3000)
})