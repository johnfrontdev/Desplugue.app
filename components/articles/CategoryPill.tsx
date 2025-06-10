import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface CategoryPillProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export function CategoryPill({ title, isSelected, onPress }: CategoryPillProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isDark && styles.containerDark,
        isSelected && styles.containerSelected,
        isSelected && isDark && styles.containerSelectedDark,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.title,
          isDark && styles.titleDark,
          isSelected && styles.titleSelected,
          isSelected && isDark && styles.titleSelectedDark,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  containerDark: {
    backgroundColor: '#333333',
  },
  containerSelected: {
    backgroundColor: '#2A9D8F',
  },
  containerSelectedDark: {
    backgroundColor: '#4ECDC4',
  },
  title: {
    fontSize: 14,
    color: '#505050',
  },
  titleDark: {
    color: '#CCCCCC',
  },
  titleSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  titleSelectedDark: {
    color: '#333333',
  },
});