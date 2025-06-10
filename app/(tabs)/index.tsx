import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function TabIndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main home screen
    router.replace('/');
  }, []);

  return null;
}