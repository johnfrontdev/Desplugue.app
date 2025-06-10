import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { formatDate } from '@/utils/dateFormatter';

interface ReflectionCardProps {
  text: string;
  date: string;
}

export function ReflectionCard({ text, date }: ReflectionCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.date, isDark && styles.dateDark]}>
        {formatDate(date)}
      </Text>
      
      <Text style={[styles.text, isDark && styles.textDark]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  date: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  dateDark: {
    color: '#AAAAAA',
  },
  text: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  textDark: {
    color: '#EEEEEE',
  },
});