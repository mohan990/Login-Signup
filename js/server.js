const express = require('express')
const bodyParser = require('body-parser')
var app = express()
const path = require('path');
var cons = require('consolidate');

const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    database:'user_entry',
    user:'root',
    password:'123456@aA' // my root user password
})
connection.connect(function (err) {
    if(err){
        console.log("error occurred while connecting",err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 })
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');

const port = 8080

app.listen(port, () => console.log(`server listening on port ${port}`))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.get('/', function (req, res) {
    res.render('index');
});

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'application/json')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

app.post('/login', async (req, res) => {
    try {
        console.log('req.body in app.post', req.body)
        res.send(JSON.stringify(req.body, null, 2))
    } catch (err) {
        res.send(err)
    }
})
