import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface StatCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export function StatCard({ title, subtitle, icon }: StatCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <Text style={[styles.title, isDark && styles.titleDark]}>
        {title}
      </Text>
      
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerDark: {
    backgroundColor: '#2A2A2A',
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  titleDark: {
    color: '#EEEEEE',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#AAAAAA',
  },
});