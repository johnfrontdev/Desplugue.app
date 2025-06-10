import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Book, Clock } from 'lucide-react-native';

interface ArticleCardProps {
  title: string;
  category: string;
  readTime: number;
  onPress: () => void;
}

export function ArticleCard({ title, category, readTime, onPress }: ArticleCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Get category display name
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'reflection': return 'Reflexão';
      case 'concepts': return 'Conceitos';
      case 'practice': return 'Prática';
      default: return category;
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, isDark && styles.containerDark]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Book color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={2}>
          {title}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.categoryContainer}>
            <Text style={[styles.category, isDark && styles.categoryDark]}>
              {getCategoryName(category)}
            </Text>
          </View>
          
          <View style={styles.readTimeContainer}>
            <Clock size={14} color={isDark ? '#AAAAAA' : '#666666'} />
            <Text style={[styles.readTime, isDark && styles.readTimeDark]}>
              {readTime} min
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
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
    backgroundColor: '#F0F0F0',
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainerDark: {
    backgroundColor: '#333333',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  titleDark: {
    color: '#EEEEEE',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryContainer: {
    marginRight: 12,
  },
  category: {
    fontSize: 14,
    color: '#2A9D8F',
  },
  categoryDark: {
    color: '#4ECDC4',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  readTimeDark: {
    color: '#AAAAAA',
  },
});