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
    // 1 create Authors tables in the selected database
    var sqlCreateAuthorsTable = `CREATE TABLE Authors(
        author_no int PRIMARY KEY, 
        author_name VARCHAR(20), 
        university VARCHAR(105),
        date_of_birth DATE, 
        h_index int, 
        gender ENUM('m', 'f'))`;
    connection.query((sqlCreateAuthorsTable), function (err, result) {
        if (err) throw err;
        console.log("Table created!");
    
    });
    // query 
    const sqlQueryColumnReference = `ALTER TABLE Authors 
        ADD COLUMN (collaborator int), 
        ADD CONSTRAINT fk_authors_collaborator
        FOREIGN KEY (collaborator) 
        REFERENCES Authors(author_no)`;
    connection.query((sqlQueryColumnReference), function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Table altered!");
    }); 
    // end connection
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
});