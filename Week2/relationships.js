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
    // 3 firstly cterate variables with necessary values for use it in querys
    var valuesAuthors = [
        [1, 'John', 'Harvard University', "1982-10-08", 2, 'm', null],
        [2, 'Peter', 'University of Cambridge', "1967-05-12", 4, 'm', null],
        [3, 'Amy', 'University of Oxford', "1991-06-01", 1, 'f', null],
        [4, 'Hannah', 'National University of Singapore', "1996-09-20", 1, 'm', null],
        [5, 'Michael', 'University of Cambridge', "1985-07-17", 4, 'm', null],
        [6, 'Sandy', 'ENS - Paris', "1997-03-02", 2, 'f', null],
        [7, 'Ali', 'University of Amsterdam', "1999-09-12", 3, 'm', null],
        [8, 'Sam', 'Utrecht University', "1987-07-22", 5, 'm', null],
        [9, 'Antony', 'Erasmus University Rotterdam', "1988-01-09", 4, 'm', null],
        [10, 'Shon', 'Harvard University', "1976-08-19", 2, 'm', null],
        [11, 'Gerda', 'National University of Singapore', "1989-09-02", 4, 'f', null],
        [12, 'Mariam', 'University of Barcelona', "1967-05-12", 4, 'f', null],
        [13, 'Laura', 'University of Oxford', "1999-08-16", 4, 'f', null],
        [14, 'Richard', 'University of Amsterdam', "1980-11-15", 3, 'm', null],
        [15, 'Konny', 'Utrecht University', "1983-07-18", 1, 'f', null]
    ];
    // it is necessary to assign collaborators for each author
    var authorsCollaborators = new Map([
        [1, 10],
        [2, 1],
        [3, 13],
        [4, 11],
        [5, 2],
        [6, 12],
        [7, 14],
        [8, 15],
        [9, 14],
        [10, 1],
        [11, 4],
        [12, 6],
        [13, 5],
        [14, 7],
        [15, 8]
    ]);
    var valueNameOfResearch = [
        [1, 'Cybersecurity: Can we really be safe?', '2020-10-23 10:37:22', '2020-11-08'],
        [2, 'How can technology help in preventing terrorist attacks?', '2020-10-23 10:37:22', '2020-11-08'],
        [3, 'How do regular people influence technological progress?', '2020-10-23 10:37:22', '2020-11-08'],
        [4, 'How did cloud technologies change data storing?', '2020-10-23 10:37:22', '2020-11-08'],
        [5, 'Effective ways of reducing air pollution.', '2020-10-23 10:37:22', '2020-11-08'],
        [6, 'Recycling. What did you do to make the world a better place?', '2020-10-23 10:37:22', '2020-11-08'],
        [7, 'What is the future of the internet?', '2020-10-23 10:37:22', '2020-11-08'],
        [8, 'How close did we get to Artificial Intelligence?', '2020-10-23 10:37:22', '2020-11-08'],
        [9, 'Analyze cognitive development in children.', '2020-10-23 10:37:22', '2020-11-08'],
        [10, 'What brings about societal stereotypes?', '2020-10-23 10:37:22', '2020-11-08'],
        [11, 'The importance of multilingual education.', '2020-10-23 10:37:22', '2020-11-08'],
        [12, 'Gender stereotypes in the workplace.', '2020-10-23 10:37:22', '2020-11-08'],
        [13, 'Are there effective ways to prevent cancer?', '2020-10-23 10:37:22', '2020-11-08'],
        [14, 'Should religious beliefs influence health matters?', '2020-10-23 10:37:22', '2020-11-08'],
        [15, 'The most popular new age religions.', '2020-10-23 10:37:22', '2020-11-08'],
        [16, 'Can North and South Korea unite again?', '2020-10-23 10:37:22', '2020-11-08'],
        [17, 'Euthanasia – An assisted suicide?', '2020-10-23 10:37:22', '2020-11-08'],
        [18, 'How benefits can make employees happy.', '2020-10-23 10:37:22', '2020-11-08'],
        [19, 'Can virtual reality substitute for an actual reality?', '2020-10-23 10:37:22', '2020-11-08'],
        [20, 'How can we modernize education to make it more appealing?', '2020-10-23 10:37:22', '2020-11-08'],
        [21, 'What technologies does NASA use to explore Mars?', '2020-10-23 10:37:22', '2020-11-08'],
        [22, 'How did Bill Gates and Steve Jobs change the world?', '2020-10-23 10:37:22', '2020-11-08'],
        [23, 'How does global warming alter wildlife?', '2020-10-23 10:37:22', '2020-11-08'],
        [24, 'Drinking water for all – How can we achieve it?', '2020-10-23 10:37:22', '2020-11-08'],
        [25, 'Should there be a law preventing cyber-bullying?', '2020-10-23 10:37:22', '2020-11-08'],
        [26, 'How can one turn a business idea into a successful startup?', '2020-10-23 10:37:22', '2020-11-08'],
        [27, 'Alzheimer’s: ways of prevention.', '2020-10-23 10:37:22', '2020-11-08'],
        [28, 'How do fats positively affect the human body and the mind?', '2020-10-23 10:37:22', '2020-11-08'],
        [29, 'How to achieve literacy for all.', '2020-10-23 10:37:22', '2020-11-08'],
        [30, 'Guns in school. How to achieve a safe environment.', '2020-10-23 10:37:22', '2020-11-08']
    ];
    var arrayId = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15], [16],[17],[18],[19],[20],[21],
        [22],[23],[24],[25],[26],[27],[28],[29],[30]];
    
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
