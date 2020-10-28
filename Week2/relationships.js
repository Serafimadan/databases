var mysql      = require('mysql');
const valuesAuthors = require('./data/valuesAuthors');
const authorsCollaborators = require('./data/authorsCollaborators');
const valueNameOfResearch = require('./data/valueNameOfResearch');
const arrayId = require('./data/arrayId');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database: 'company'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // 1 create Research_Papers tables in the selected database
    var createPapersTable = `CREATE TABLE Research_Papers(
        paper_id int PRIMARY KEY, 
        paper_title VARCHAR(250) NOT NULL, 
        conference DATETIME , 
        publish_date DATE)`;
    connection.query((createPapersTable), function (err, result) {
        if (err) throw err;
        console.log("Table Research_Papers created!");
    });
    // 2 create another one table to connect Author and Paper tables
    var createConnectionTable = `CREATE TABLE Author_Research_Papers(
        paper_id INT, 
        author_no INT,
        CONSTRAINT fk_author_research_papers_paper_id FOREIGN KEY (paper_id) REFERENCES Research_Papers(paper_id),
        CONSTRAINT fk_author_research_papers_author_no FOREIGN KEY (author_no) REFERENCES Authors(author_no))`;
    connection.query((createConnectionTable), function (err, result) {
        if (err) throw err;
        console.log("Table Author_Research_Papers created!");
    });
    
    // 4 inserting data to Authours table
    var insertDataToAuthors = `INSERT INTO Authors (
        author_no, 
        author_name, 
        university, 
        date_of_birth, 
        h_index, gender, 
        collaborator) VALUES?`;
    connection.query((insertDataToAuthors), [valuesAuthors], function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Insert!");
    });
    //   second step with Authours table, to fill collaborators column because we have connection with authors_no
    // and it is impossible to assign some collaborators until authors don't exist
    var sqlUpdateCollaboratorsColumn = `UPDATE Authors SET collaborator = ? WHERE author_no = ?`;
    for (let data of authorsCollaborators) {
        connection.query(sqlUpdateCollaboratorsColumn, [data[1], data[0]], (error, results, fields) => {
        if (error){
            return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
        });
    };
    // 5 inserting data in Research_Papers table
    var insertNameOfResearch = `INSERT INTO Research_Papers (
        paper_id, 
        paper_title, 
        conference, 
        publish_date) VALUES?`;
    connection.query((insertNameOfResearch), [valueNameOfResearch], function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Values to Research_Papers table Inserted!");
    });
    // 6 inserting paper_id data to Author_Research_Papers table
    var insertToIdResearchPaper = `INSERT INTO Author_Research_Papers (paper_id) VALUES?`;
    connection.query(insertToIdResearchPaper, [arrayId], function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Values to paper_id inserted!");
    });
    // 7 updating author_no data in random order to Author_Research_Papers table
    var updateToAuthorId = `UPDATE Author_Research_Papers SET author_no = FLOOR(1 + (RAND() * 15));`;
    connection.query(updateToAuthorId, function (err, result, fields) {
        if (err) throw err;
        console.log(result , "Rows author_no updated!");
    });
    // end connection
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
});
