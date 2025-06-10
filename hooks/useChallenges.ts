import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useChallenges() {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  
  // Load completed challenges from storage
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const savedChallenges = await AsyncStorage.getItem('@desplugue:completedChallenges');
        const savedStreak = await AsyncStorage.getItem('@desplugue:streak');
        const lastActive = await AsyncStorage.getItem('@desplugue:lastActive');
        
        if (savedChallenges) {
          setCompletedChallenges(JSON.parse(savedChallenges));
        }
        
        if (savedStreak) {
          setStreak(parseInt(savedStreak, 10));
        }
        
        // Check if we need to reset streak (more than 1 day since last activity)
        if (lastActive) {
          const lastActiveDate = new Date(lastActive);
          const currentDate = new Date();
          const daysDifference = Math.floor(
            (currentDate.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysDifference > 1) {
            // Reset streak if more than 1 day has passed
            await AsyncStorage.setItem('@desplugue:streak', '0');
            setStreak(0);
          }
        }
        
        // Update last active date
        await AsyncStorage.setItem('@desplugue:lastActive', new Date().toISOString());
        
      } catch (error) {
        console.error('Error loading challenges', error);
      }
    };
    
    loadChallenges();
  }, []);
  
  // Mark a challenge as completed
  const completeChallenge = async (challengeId: string) => {
    try {
      // Check if this is the first challenge completed today
      const lastActive = await AsyncStorage.getItem('@desplugue:lastActive');
      const currentDate = new Date();
      
      if (lastActive) {
        const lastActiveDate = new Date(lastActive);
        const isToday = 
          lastActiveDate.getDate() === currentDate.getDate() &&
          lastActiveDate.getMonth() === currentDate.getMonth() &&
          lastActiveDate.getFullYear() === currentDate.getFullYear();
        
        // If not today, increase streak
        if (!isToday) {
          const newStreak = streak + 1;
          await AsyncStorage.setItem('@desplugue:streak', newStreak.toString());
          setStreak(newStreak);
        }
      }
      
      // Update last active date
      await AsyncStorage.setItem('@desplugue:lastActive', currentDate.toISOString());
      
      // Add challenge to completed list if not already there
      if (!completedChallenges.includes(challengeId)) {
        const newCompletedChallenges = [...completedChallenges, challengeId];
        setCompletedChallenges(newCompletedChallenges);
        await AsyncStorage.setItem(
          '@desplugue:completedChallenges', 
          JSON.stringify(newCompletedChallenges)
        );
      }
    } catch (error) {
      console.error('Error completing challenge', error);
    }
  };
  
  return {
    completedChallenges,
    streak,
    completeChallenge
  };
}