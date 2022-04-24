import { useEffect, useState } from 'react';
import {
  database, ref, get, child,
} from '../../firebase-config';

export default function useFetch(url) {
  const [data, setData] = useState('');

  async function fetch(url) {
    if (navigator.onLine) {
      try {
        const dbRef1 = ref(database);
        await get(child(dbRef1, url)).then((snapshot) => {
          if (snapshot.exists()) {
            const trainlist = [];
            snapshot.forEach((snap) => {
              trainlist.push(snap.val());
            });
            setData(trainlist);
          }
        });
        console.log('⚡📡');
      } catch (err) {
        console.log(err);
        console.log('⚡❗😪');
      }
    }
  }

  useEffect(() => {
    fetch(url);
  }, [url]);

  return data;
}
