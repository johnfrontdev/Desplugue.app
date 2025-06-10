import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Reflection {
  id: string;
  text: string;
  date: string;
}

export function useReflections() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  
  // Load reflections from storage
  useEffect(() => {
    const loadReflections = async () => {
      try {
        const savedReflections = await AsyncStorage.getItem('@desplugue:reflections');
        
        if (savedReflections) {
          setReflections(JSON.parse(savedReflections));
        }
      } catch (error) {
        console.error('Error loading reflections', error);
      }
    };
    
    loadReflections();
  }, []);
  
  // Add a new reflection
  const addReflection = async (text: string) => {
    try {
      const newReflection: Reflection = {
        id: Date.now().toString(),
        text,
        date: new Date().toISOString(),
      };
      
      const updatedReflections = [newReflection, ...reflections];
      setReflections(updatedReflections);
      
      await AsyncStorage.setItem(
        '@desplugue:reflections', 
        JSON.stringify(updatedReflections)
      );
    } catch (error) {
      console.error('Error adding reflection', error);
    }
  };
  
  // Delete a reflection
  const deleteReflection = async (id: string) => {
    try {
      const updatedReflections = reflections.filter(reflection => reflection.id !== id);
      setReflections(updatedReflections);
      
      await AsyncStorage.setItem(
        '@desplugue:reflections', 
        JSON.stringify(updatedReflections)
      );
    } catch (error) {
      console.error('Error deleting reflection', error);
    }
  };
  
  return {
    reflections,
    addReflection,
    deleteReflection
  };
}