var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    //multipleStatements: true // this allow you to run multiple queries at once.
});



connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE DATABASE meetup", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });

