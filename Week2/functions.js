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

    // 1 all research papers and the number of authors (authors+collaborators) that wrote that paper 
    // all the time for each researh we have 1 author and a few or 1 collaborators
    var selectNumbersOfAuthors = `SELECT count(ac.author_no) + 1 AS Authors_number, r.paper_title AS Research_title
    from Research_Papers as r
    left join Author_Research_Papers as p
    on p.paper_id = r.paper_id
    left join Authors as ac
    on ac.collaborator = p.author_no
    GROUP BY r.paper_title;`;
    connection.query(selectNumbersOfAuthors, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Query successful!");
    });
    // 2
    
    // end connection
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
});