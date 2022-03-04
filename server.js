const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// CROSS 設定
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

const config  = {
    host: 'localhost',
    user: 'root',
    password: 'qaz6699wsx',
    database: 'shop'
};
const con = mysql.createConnection(config);
con.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }    
    else {
        console.log('Database Connect Success!');
    }
})

// 發送get http request (http://localhost:8080/show)
app.get('/show', (req, res) => {
    let sql = 'SELECT * FROM products;';
    con.query(sql, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'products list.' });
    });
});

app.post('/add', (req, res) => {
    let sql = 'INSERT INTO products (pd_name, pd_category, pd_qty, pd_price) ?';
    let values = [
        ['果凍筆', '筆', '854', '39'],
        ['15cm尺', '尺', '465', '15']
    ]
    con.query(sql, [values], (error, results) => {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'products list.' });
    });
})

app.post('/update', (req, res) => {
    let sql = "UPDATE products SET pd_name = '30cm尺' WHERE pd_id = '5' AND pd_name = '15cm尺'";
    con.query(sql, (error, results) => {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'products list.' });
    });
})

app.post('/delete', (req, res) => {
    let sql = "DELETE FROM products WHERE pd_id = '4'";
    con.query(sql, (error, results) => {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'products list.' });
    });
})