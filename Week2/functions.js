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
        FROM Research_Papers as r
        LEFT JOIN Author_Research_Papers as p
        ON p.paper_id = r.paper_id
        LEFT JOIN Authors as ac
        ON ac.collaborator = p.author_no
        GROUP BY r.paper_title;`;
    connection.query(selectNumbersOfAuthors, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Query successful!");
    });
    // 2
    var selectSumWomensResearch = `SELECT COUNT(r.paper_id)
        FROM Author_Research_Papers as r
        LEFT JOIN Authors as a
        ON r.author_no = a.author_no
        WHERE a.gender = 'f';`;
    connection.query(selectSumWomensResearch, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Query successful!");
    });
    // 3
    var selectAvgHIndexForUniversity = `SELECT AVG(h_index), university FROM Authors GROUP BY university;`;
    connection.query(selectAvgHIndexForUniversity, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Query successful!");
    });
    // 4
    var countSumOfResearchInUniversitys = `SELECT COUNT(r.paper_title) as Number_of_Research, a.university as University
    FROM Author_Research_Papers p
    LEFT JOIN Research_Papers r
    ON r.paper_id = p.paper_id
    LEFT JOIN Authors a
    ON p.author_no = a.author_no
    GROUP BY a.university;`;
    connection.query(countSumOfResearchInUniversitys, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Query successful!");
    });
    // 5
    var selectMinMaxHIndexAuthorsInUniversitys = `SELECT a1.university, min(a1.h_index) AS Min_h_index, max(a2.h_index) AS Max_h_index
    FROM Authors a1
    LEFT JOIN Authors a2
    ON a1.author_no = a2.author_no
    GROUP BY a1.university;`;
    connection.query(selectMinMaxHIndexAuthorsInUniversitys, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Query successful!");
    });
    // end connection
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
});