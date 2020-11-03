const util = require('util');
const mysql  = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database: 'company'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    connection.connect();
    const UPDATE_BALANCE_FIRSTUSER = `UPDATE account 
        SET balance = balance - 1000 
        WHERE account_number = 101`;
    const UPDATE_BALANCE_SECONDUSER = `UPDATE account 
        SET balance = balance + 1000 
        WHERE account_number = 102`;
    
    const INSERT_ACCOUNT_CHANGES_FIRSTUSER = `INSERT INTO account_changes 
        VALUES (4, 101, -1000, '2020-08-09', 'Transfer 1000 to 102 account was done')`;
    const INSERT_ACCOUNT_CHANGES_SECONDUSER = `INSERT INTO account_changes 
        VALUES (5, 102, 1000, '2020-08-09', 'Transfer 1000 from 101 account was acceptede')`;

    try {
        await execQuery("START TRANSACTION");

        await execQuery(UPDATE_BALANCE_FIRSTUSER);
        await execQuery(UPDATE_BALANCE_SECONDUSER);
        
        await execQuery(INSERT_ACCOUNT_CHANGES_FIRSTUSER);
        await execQuery(INSERT_ACCOUNT_CHANGES_SECONDUSER);

        await execQuery("COMMIT");
    } catch (error) {
        console.error(error);
        await execQuery("ROLLBACK");
        connection.end();
    }

    connection.end();
}

seedDatabase();