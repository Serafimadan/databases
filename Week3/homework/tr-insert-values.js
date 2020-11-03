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
    const accountDataset = [
        {
            account_number: 100,
            balance: 10520
        },
        {
            account_number: 101,
            balance: 50500
        },
        {
            account_number: 102,
            balance: 3245
        }
    ];
    const accountChangesDataset = [
        {
            change_number: 1,
            account_number: 100,
            amount: 10520,
            changed_date: '2020-05-05',
            remark: 'Account exist',
        },
        {
            change_number: 2,
            account_number: 101,
            amount: 50500,
            changed_date: '2020-06-15',
            remark: 'Account exist',
        },
        {
            change_number: 3,
            account_number: 102,
            amount: 3245,
            changed_date: '2020-03-01',
            remark: 'Account exist',
        }
    ];
    connection.connect();

    try {
        accountDataset.forEach(async accountData => {
            await execQuery('INSERT INTO account SET ?', accountData);
        });
        accountChangesDataset.forEach(async accountChangesData => {
            await execQuery('INSERT INTO account_changes SET ?', accountChangesData);
        });
    } catch (error) {
        console.error(error);
        connection.end();
        }
    
    connection.end();
    }
    
seedDatabase();
    