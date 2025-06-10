import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageContextProps {
  initialized: boolean;
}

const StorageContext = createContext<StorageContextProps>({
  initialized: false
});

interface StorageProviderProps {
  children: ReactNode;
}

export function StorageProvider({ children }: StorageProviderProps) {
  const [initialized, setInitialized] = useState(false);
  
  // Initialize storage on first load
  useEffect(() => {
    const initializeStorage = async () => {
      try {
        // Check if storage has been initialized before
        const isInitialized = await AsyncStorage.getItem('@desplugue:initialized');
        
        if (!isInitialized) {
          // Set up initial data for the app
          await Promise.all([
            AsyncStorage.setItem('@desplugue:initialized', 'true'),
            AsyncStorage.setItem('@desplugue:completedChallenges', JSON.stringify([])),
            AsyncStorage.setItem('@desplugue:streak', '0'),
            AsyncStorage.setItem('@desplugue:reflections', JSON.stringify([])),
            AsyncStorage.setItem('@desplugue:lastActive', new Date().toISOString()),
          ]);
        }
        
        setInitialized(true);
      } catch (error) {
        console.error('Error initializing storage', error);
        // Consider the app initialized anyway to prevent blocking
        setInitialized(true);
      }
    };
    
    initializeStorage();
  }, []);
  
  return (
    <StorageContext.Provider value={{ initialized }}>
      {children}
    </StorageContext.Provider>
  );
}

export const useStorage = () => useContext(StorageContext);