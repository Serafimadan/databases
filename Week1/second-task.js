var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database: 'new_world'
});

connection.connect(function(err) {
    if (err) throw err;
    // 1
    connection.query("SELECT name AS Country FROM country WHERE population > 8000000", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 2
    connection.query("SELECT name AS Country FROM country WHERE name LIKE '%land%'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 3
    connection.query("SELECT name AS City FROM city WHERE population BETWEEN 500000 AND 1000000", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 4
    connection.query("SELECT name AS Country FROM country WHERE continent = 'Europe'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 5
    connection.query("SELECT name  AS Country FROM country ORDER BY surfaceArea DESC", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 6
    connection.query("SELECT name  AS City FROM city WHERE countryCode = 'nld'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 7
    connection.query("SELECT population  AS 'Population in Rotterdam' FROM city WHERE name = 'Rotterdam'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
     // 8
     connection.query("SELECT name  AS Country FROM country ORDER BY surfaceArea DESC LIMIT 10", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 9
    connection.query("SELECT name  AS City FROM city ORDER BY population DESC LIMIT 10", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // 10
    connection.query("SELECT SUM (population) AS 'World population'  FROM country ", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // end connection
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
}); 