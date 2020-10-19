var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    //database: "meetup"
    //multipleStatements: true // this allow you to run multiple queries at once. ??gave a mistake ??when does is use right
});


// create tables
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE DATABASE meetup", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
    connection.query("USE meetup", function (err, result) {
      if (err) throw err;
      console.log("Database used");
    });
    var sql = "CREATE TABLE Invitee (invitee_no int(10), invitee_name VARCHAR(50), invited_by bool)";
    connection.query((sql), function (err, result) {
      if (err) throw err;
      console.log("Table created");
      
    });
    var sqlSecond = "CREATE TABLE Room (room_no int(10), room_name VARCHAR(50), floor_number int(10))";
    connection.query((sqlSecond), function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    var sqlThird = "CREATE TABLE Meeting (meeting_no int(10), meeting_title VARCHAR(50), starting_time time, ending_time time, room_no int(10))";
    connection.query((sqlThird), function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
// adding information rows
// first table plus rows
var sql = "INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES?";
var values = [
    [ 1, 'John', true],
    [2, 'Peter', true],
    [3, 'Amy', false],
    [4, 'Hannah', true],
    [5, 'Michael', true],
    [6, 'Sandy', true],
];
connection.query((sql), [values], function (err, result) {
    if (err) throw err;
    // use "result.affectedRows" to show numbers of added rows
    console.log("Number of records inserted: " + result.affectedRows);
});
// second table plus rows
var sqlSecond = "INSERT INTO Room (room_no, room_name, floor_number) VALUES?";
var valuesSecond = [
    [ 1, 'Standart', 2],
    [2, 'Standart', 2],
    [3, 'Standart', 2],
    [4, 'Standart', 3],
    [5, 'Luxe', 4],
    [6, 'Econom', 2],
];
connection.query((sqlSecond), [valuesSecond], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
});
//  third table plus rows
var sqlThird = "INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES?";
var valuesThird = [
    [ 1, 'Negotiations with investors', "09:30:07", "11:30:07", 5],
    [2, 'Team building', "10:00:07", "12:00:07", 6],
    [3, 'Workshop', "12:00:07", "13:00:07", 2],
    [4, 'Working session', "14:00:07", "15:00:07", 5],
    [5, 'Board meeting', "16:00:07", "17:00:07", 1],
];
connection.query((sqlThird), [valuesThird], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
});
// 
    connection.end(function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
  });
  