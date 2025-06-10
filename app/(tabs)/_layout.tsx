import { Tabs } from 'expo-router';
import { Book, CheckSquare, BarChart2, PenSquare, Home } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const tabBarStyles = {
    backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
    borderTopColor: isDark ? '#333333' : '#EEEEEE',
  };
  
  const labelStyles = {
    color: isDark ? '#CCCCCC' : '#505050',
  };
  
  const activeColor = isDark ? '#A786CD' : '#2A9D8F';
  const inactiveColor = isDark ? '#666666' : '#AAAAAA';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tabBarStyles,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: labelStyles,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: 'Artigos',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Desafios',
          tabBarIcon: ({ color, size }) => <CheckSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reflections"
        options={{
          title: 'Reflexões',
          tabBarIcon: ({ color, size }) => <PenSquare size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}