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
  // 1 create Airline_passengers tables in the selected database
  var sqlCreatePassengerTable = "CREATE TABLE Airline_passengers(ticket_number int(13) NOT NULL, passenger_name VARCHAR(100) NOT NULL, date_of_birth DATE NOT NULL, passport_number VARCHAR(20) NOT NULL, PRIMARY KEY (ticket_number, passport_number));";
  connection.query((sqlCreatePassengerTable), function (err, result) {
    if (err) throw err;
    console.log("Table created");
    
  });
  // create Account tables in the selected database
  var sqlCreateAccountTable = "CREATE TABLE Account(employee_id int, email varchar(50), PRIMARY KEY (employee_id), CONSTRAINT fk_emp FOREIGN KEY(employee_id) REFERENCES employees(employee_id))";
  connection.query((sqlCreateAccountTable), function (err, result) {
    if (err) throw err;
    console.log("Table created");
    
  });
  // create Project tables in the selected database
  var sqlCreateProjectTable = "CREATE TABLE emp_proj (emp_id int(11), proj_id int(11), PRIMARY KEY(emp_id, proj_id), CONSTRAINT fk_emp_proj_employees_id FOREIGN KEY(emp_id) REFERENCES employees(employee_id),CONSTRAINT fk_emp_proj_projects_id FOREIGN KEY(proj_id) REFERENCES projects(project_id))";
  connection.query((sqlCreateProjectTable), function (err, result) {
    if (err) throw err;
    console.log("Table created");
    
  });
    // 2 INSERT query for the Account table
   connection.query(" INSERT INTO Account VALUES (105, 'schwarzkopf@gmail.com')", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
   // 3 INSERT query for the Project tables
   connection.query(" INSERT INTO emp_proj VALUES (199, 9003)", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
}); 
// 4 
connection.query("SELECT SUM(e.salary) FROM employees as e LEFT JOIN departments as d ON e.dept_id = d.dept_id LEFT JOIN emp_proj p ON e.employee_id = p.emp_id WHERE d.dept_name = 'Sales' and p.proj_id = 9001;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
}); 
// 5 ??? city 
connection.query("SELECT e.employee_name, e.city FROM company.employees e join company.employees c on (c.employee_name = 'Ana' and e.city = c.city);", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
}); 
// 6
connection.query("SELECT e1.employee_name as manager, count(e2.employee_name) FROM employees as e1 LEFT JOIN employees as e2 on e1.employee_id = e2.reports_to GROUP BY e1.employee_name;", function (err, result, fields) {
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