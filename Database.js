import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

export default class Database {
  //function to initialise the db like create the table with the attributes and stuff.
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log('Entered into Promise ');
      SQLite.echoTest()
        .then(() => {
          console.log(' enetered echotest ');
          console.log('going to open db');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database has been opened');
              db.executeSql('SELECT 1 FROM ToDo LIMIT 1')
                .then(() => {
                  console.log('statmnt executed ');
                })
                .catch(error => {
                  console.log('error  ', error);
                  console.log('no db ready yet so well populate it');
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS ToDo (ToDoId, ToDoName, ToDoDesc)',
                    );
                  })
                    .then(() => {
                      console.log('Table has been created');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('didnt enter echoTest');
        });
    });
  }
  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }
  listToDo() {
    return new Promise(resolve => {
      const Todoitems = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT p.ToDoId, p.ToDoName FROM ToDo p', []).then(
              ([tx, results]) => {
                console.log('sql statement  completed');
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(
                    `TODO ID: ${row.ToDoId}, TODO Name: ${row.ToDoName}`,
                  );
                  const {ToDoId, ToDoName} = row;
                  Todoitems.push({
                    ToDoId,
                    ToDoName,
                  });
                }
                console.log(Todoitems);
                resolve(Todoitems);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  getToDoId(id) {
    console.log(id);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM ToDo WHERE ToDoId = ?', [id]).then(
              ([tx, results]) => {
                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  additem(item) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO ToDo VALUES (?, ?, ?)', [
              item.ToDoId,
              item.ToDoName,
              item.ToDoDesc,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
