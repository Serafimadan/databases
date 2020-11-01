var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database: 'company'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var alterContact = `ALTER table employees ADD COLUMN email VARCHAR(50)`;
    connection.query((alterContact), function (err, result) {
        if (err) throw err;
        console.log("altered!");
    });
    // var alterContact = `UPDATE employees SET email = 'email@test.com' WHERE employee_id = 101`;
    // connection.query((alterContact), function (err, result) {
    //     if (err) throw err;
    //     console.log("updated!");
    // });
    // end connection
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
            }
    });
});   