import { openDB } from 'idb';

// init function used to start db
const initdb = async () =>
  // open db named jate, version 1, then schema config
  openDB('jate', 1, {
    upgrade(db) {
      // if schema already exists, return
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create object store in db
      // keyPath property that auto increments
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Update to database');

  // Create a connection to the jate database and version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ jate: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Saved to database', result)
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.log('GET from database');
  // connection
  const jateDb = await openDB('jate', 1);
  // transaction
  const tx = jateDb.transaction('jate', 'readonly');
  // open object store
  const store = tx.objectStore('jate');
  // getAll() method
  const request = store.getAll();
  // confirm
  const result = await request;
  console.log('Database data: ', result);
  // return result;
}

initdb();
