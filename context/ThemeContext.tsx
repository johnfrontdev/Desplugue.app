import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const deviceTheme = useColorScheme() as ThemeType;
  const [theme, setThemeState] = useState<ThemeType>(deviceTheme || 'light');
  
  // Load saved theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@desplugue:theme');
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType);
        } else {
          // Use device theme if no saved theme
          setThemeState(deviceTheme || 'light');
        }
      } catch (error) {
        console.error('Error loading theme', error);
      }
    };
    
    loadTheme();
  }, [deviceTheme]);
  
  // Toggle between light and dark themes
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    
    try {
      await AsyncStorage.setItem('@desplugue:theme', newTheme);
    } catch (error) {
      console.error('Error saving theme', error);
    }
  };
  
  // Set theme directly
  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    
    try {
      await AsyncStorage.setItem('@desplugue:theme', newTheme);
    } catch (error) {
      console.error('Error saving theme', error);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);