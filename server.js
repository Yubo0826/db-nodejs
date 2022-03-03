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
    password: 'qaz6699wsx'
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


app.get('/show', function (req, res) {
    mc.query('SELECT * FROM shop.products;', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'products list.' });
    });
});