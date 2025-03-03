"use client";  // Add this line to mark the component as a client-side component

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';

const HomePage = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const snapshot = await db.collection('your_collection').get();  // Access Firestore collection
  //     const fetchedData = snapshot.docs.map(doc => doc.data());
  //     setData(fetchedData);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Data from Firestore</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
