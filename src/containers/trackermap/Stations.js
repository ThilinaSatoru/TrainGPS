import { useEffect } from 'react';
import {
  child, database, get, ref,
} from '../../firebase-config';

export default function Stations() {
  const data = [];

  async function fetch() {
    if (navigator.onLine) {
      try {
        const dbRef1 = ref(database);
        await get(child(dbRef1, 'Stations/')).then((snapshot) => {
          if (snapshot.exists()) {
            const trainlist = [];
            snapshot.forEach((snap) => {
              trainlist.push(snap.val());
            });
            // setData(trainlist);
          }
        });
      } catch (err) {
        // console.log("⚡❗😪");
      }
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return data;
}
