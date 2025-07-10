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
    const docSnap = await getDoc(progressRef);
    if (!docSnap.exists()) {
      await setDoc(progressRef, { completedModules: [] });
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    initializeProgress(userId);

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

    return () => unsubscribe();
  }, [userId, initializeProgress]);

  const toggleModuleCompletion = async (moduleId: number) => {
    if (!userId) return;

    setLoading(true);
    const progressRef = doc(db, 'progress', userId);
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
    } 
    // No need to setLoading(false) here because the onSnapshot listener will do it
  };

  return { progress, loading, toggleModuleCompletion };
}
