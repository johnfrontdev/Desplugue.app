import { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onPress: () => void;
}

export default function NavigationCard({ 
  title, 
  description, 
  icon, 
  onPress 
}: NavigationCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <TouchableOpacity 
      style={[styles.container, isDark && styles.containerDark]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        {title}
      </Text>
      <Text style={[styles.description, isDark && styles.descriptionDark]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  titleDark: {
    color: '#EEEEEE',
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
  descriptionDark: {
    color: '#BBBBBB',
  },
});