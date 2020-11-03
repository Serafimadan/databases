
/**  1. Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and 
* (fetch all the records in the database)
* for example, we can get "OR 1=1" SQL-injection if will use usual syntax as bellow
* `SELECT * FROM country WHERE name = 'Belgium' and code = 'BEL' OR 1=1`
* for escaping such situation we can use a syntax for prepared statements
* PREPARE example `FROM SELECT * FROM country where name = ? and code = ?`;
* SET @name = 'Belgium';
* SET @code = BEL'; 
* EXECUTE example USING @name, @code
*/ 


// 2. Rewrite the function so that it is no longer vulnerable to SQL injection


function getPopulation(country, name, code, cb) {
    // in this way we don't have any possibilities for SQL-injection
    con.query(
        `SELECT Population FROM ? WHERE name = ? and code = ?`, [country, name, code],
        function(err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result[0].name);
        }
    );
}

//   I used the following sources https://medium.com/@jtearl188/preventing-sql-injection-on-node-js-cc8773fa265c
// https://github.com/mysqljs/mysql/issues/81
// https://www.veracode.com/blog/secure-development/how-prevent-sql-injection-nodejs
