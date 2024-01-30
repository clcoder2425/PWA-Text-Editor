import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to accept data and add to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite')
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
}
// Method to get all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly')
  const store = tx.objectStore('jate');
  const request = store.get(1);

  const result = await request;
  console.log('result.value', result);
  return result?.value;
};


initdb();
