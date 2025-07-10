import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export type UserProgress = {
  [moduleId: string]: boolean;
};

export const getUserProgress = async (userId: string): Promise<UserProgress> => {
  const docRef = doc(db, 'progress', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProgress;
  } else {
    // No progress found, return empty object
    return {};
  }
};

export const updateUserProgress = async (
  userId: string,
  moduleId: string,
  completed: boolean
) => {
  const docRef = doc(db, 'progress', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      [moduleId]: completed,
    });
  } else {
    await setDoc(docRef, {
      [moduleId]: completed,
    });
  }
};
