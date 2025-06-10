import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { StorageProvider } from '@/context/StorageContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <StorageProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="article-detail" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </StorageProvider>
  );
}