var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    //multipleStatements: true // this allow you to run multiple queries at once. ??gave a mistake ??when does is use right
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //  create database
  connection.query("CREATE DATABASE meetup", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  // select nesessary database
  connection.query("USE meetup", function (err, result) {
    if (err) throw err;
    console.log("Database used ");
  });
  // create tables in the selected database
  var sqlCreateInviteeTable = "CREATE TABLE Invitee (invitee_no int(10), invitee_name VARCHAR(50), invited_by VARCHAR(50))";
  connection.query((sqlCreateInviteeTable), function (err, result) {
    if (err) throw err;
    console.log("Table created");
    
  });
  var sqlCreateRoomTable = "CREATE TABLE Room (room_no int(10), room_name VARCHAR(50), floor_number int(10))";
  connection.query((sqlCreateRoomTable), function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sqlCreateMeetingTable = "CREATE TABLE Meeting (meeting_no int(10), meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no int(10))";
  connection.query((sqlCreateMeetingTable), function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
// adding information rows
// first table plus 6 rows
var insertingValuesToInvitee = "INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES?";
var valuesInvitee = [
  [ 1, 'John', 'Karl'],
  [2, 'Peter', 'Miranda'],
  [3, 'Amy', 'Anna'],
  [4, 'Hannah', 'Miranda'],
  [5, 'Michael', 'Albert'],
  [6, 'Sandy', 'Roy'],
];
connection.query((insertingValuesToInvitee), [valuesInvitee], function (err, result) {
  if (err) throw err;
  // use "result.affectedRows" to show numbers of added rows
  console.log("Number of records inserted: " + result.affectedRows);
});
// second table plus 6 rows
var insertingValuesToInvitee = "INSERT INTO Room (room_no, room_name, floor_number) VALUES?";
var valuesRoom = [
  [ 1, 'Standart', 2],
  [2, 'Standart', 2],
  [3, 'Standart', 2],
  [4, 'Standart', 3],
  [5, 'Luxe', 4],
  [6, 'Econom', 2],
];
connection.query((insertingValuesToInvitee), [valuesRoom], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});
//  third table plus 5 rows
var insertingValuesToMeeting = "INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES?";
var valuesMeeting = [
  [ 1, 'Negotiations with investors', "2020-01-23 09:30:07", "2020-01-23 11:30:07", 5],
  [2, 'Team building', "2020-02-13 10:00:07", "2020-02-13 12:00:07", 6],
  [3, 'Workshop', "2020-02-13 12:00:07", "2020-02-13 13:00:07", 2],
  [4, 'Working session', "2020-01-20 14:00:07", "2020-01-20 15:00:07", 5],
  [5, 'Board meeting', "2020-01-23 16:00:07", "2020-01-23 17:00:07", 1],
];
connection.query((insertingValuesToMeeting), [valuesMeeting], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});
// end connection
  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});