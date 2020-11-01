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
    // 1
    var selectOfPairsAuthorToCollaborator = `SELECT a1.author_name as author, a2.author_name as collaborator 
        FROM company.Authors as a1 
        JOIN company.Authors as a2 
        ON a2.author_no = a1.collaborator`;
    connection.query(selectOfPairsAuthorToCollaborator, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Query successful!");
    });
    // 2
    var selectAllInformOfAuthorsReserch = `SELECT a.*, p.paper_title
    FROM company.Authors as a
    LEFT JOIN company.Author_Research_Papers as r
    ON a.author_no = r.author_no
    LEFT JOIN company.Research_Papers as p
    ON p.paper_id = r.paper_id
    ORDER BY a.author_no ASC;`;
    connection.query(selectAllInformOfAuthorsReserch, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Insert!");
    });

    // end connection
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
});