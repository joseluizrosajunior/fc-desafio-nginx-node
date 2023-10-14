const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Junior')`
connection.query(sql)
connection.end()


app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)

    const sql = `SELECT * FROM people;`
    connection.query(sql, (errors, rows) => {
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${mapResult(rows).join('')}</ul>`);
    })

    connection.end()
})

function mapResult(rows) {
    return rows.map(row => `<li>${row.name}</li>`);
}

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})