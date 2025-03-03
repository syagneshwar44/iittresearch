// src/hooks/useFirestore.ts
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const useFirestore = (collectionName: string) => {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(docsArray);
    };

    fetchData();
  }, [collectionName]);

  return { docs };
};
