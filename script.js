console.log("I am Leo. my IP is  Mac address is xxx. Ncc student ID is: 223190713");
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database("./book.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the books database.');
});


// user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


// create the table if not exists
db.run('CREATE TABLE IF NOT EXISTS books (ID INTEGER PRIMARY KEY, title713 TEXT, author713 TEXT, ISBN713 TEXT, description713 TEXT)', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Books Table created successfully');

    commandInterface();
});

function listBooks() {
    // list all books
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(`ID: ${row.ID}, Title713: ${row.title}, Author713: ${row.author}, ISBN713: ${row.ISBN}, Description713: ${row.description}`);
        });
    });
}
// queue -> task 1(callback)
function commandInterface() {
    readline.question('Enter book title713: ', (title713) => {
        readline.question('Enter book author713: ', (author713) => {
            readline.question('Enter book ISBN713: ', (ISBN713) => {
                readline.question('Enter book description713: ', (description713) => {
                    // insert the book into the database
                    db.run('INSERT INTO books (title713, author713, ISBN713, description713) VALUES (?, ?, ?, ?)', [title713, author713, ISBN713, description713], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log('Book added successfully.');
                        readline.question('Do you want to add another book? (yes/no): ', (answer) => {
                            if (answer === 'yes') {
                                commandInterface();
                            } else {
                                listBooks();
                                
                                readline.close();
                            }
                        });
                    });
                });
            });
        });
    });
    // callback hell
}