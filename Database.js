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
}
