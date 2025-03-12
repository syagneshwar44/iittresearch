import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

async function updatePublicationTimestamps() {
  try {
    const pubsRef = collection(db, 'publications');
    const querySnapshot = await getDocs(pubsRef);

    const updates = querySnapshot.docs.map(async (document) => {
      const data = document.data();
      
      // If document doesn't have a timestamp, create one from existing date fields
      if (!data.timestamp) {
        const timestamp = data.date || data.createdAt || serverTimestamp();
        await updateDoc(doc(db, 'publications', document.id), {
          timestamp: timestamp
        });
        console.log(`Updated timestamp for document ${document.id}`);
      }
    });

    await Promise.all(updates);
    console.log('All publications updated successfully');
  } catch (error) {
    console.error('Error updating timestamps:', error);
  }
}

// Run the update
updatePublicationTimestamps(); 