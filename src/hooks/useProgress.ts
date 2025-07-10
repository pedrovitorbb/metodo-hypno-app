'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ProgressData {
  completedModules: number[];
}

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<ProgressData>({ completedModules: [] });
  const [loading, setLoading] = useState(true);

  const initializeProgress = useCallback(async (uid: string) => {
    const progressRef = doc(db, 'progress', uid);
    try {
      const docSnap = await getDoc(progressRef);
      if (!docSnap.exists()) {
        await setDoc(progressRef, { completedModules: [] });
      }
    } catch (error) {
      console.error("Failed to initialize progress:", error);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // This function will be executed only on the client side
    const subscribeToProgress = async () => {
        await initializeProgress(userId);
        const progressRef = doc(db, 'progress', userId);
        const unsubscribe = onSnapshot(progressRef, (doc) => {
          if (doc.exists()) {
            setProgress(doc.data() as ProgressData);
          } else {
            setProgress({ completedModules: [] });
          }
          setLoading(false);
        }, (error) => {
            console.error("Error fetching progress:", error);
            setLoading(false);
        });
        return unsubscribe;
    };

    const unsubscribePromise = subscribeToProgress();

    // Return a cleanup function that resolves the promise and calls the unsubscribe function
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, [userId, initializeProgress]);

  const toggleModuleCompletion = async (moduleId: number) => {
    if (!userId) return;

    setLoading(true); // Visually indicate that an action is in progress
    const progressRef = doc(db, 'progress', userId);
    
    // We get the latest progress from state to determine the operation
    const isCompleted = progress.completedModules.includes(moduleId);

    try {
        if (isCompleted) {
            await updateDoc(progressRef, {
                completedModules: arrayRemove(moduleId)
            });
        } else {
            await updateDoc(progressRef, {
                completedModules: arrayUnion(moduleId)
            });
        }
    } catch (error) {
        console.error("Error updating progress:", error);
        // If there's an error, we should probably stop loading
        setLoading(false);
    } 
    // The onSnapshot listener will update the state and set loading to false on success
  };

  return { progress, loading, toggleModuleCompletion };
}
