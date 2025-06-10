import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { CategoryPill } from '@/components/articles/CategoryPill';
import { articlesData } from '@/data/articles';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'reflection', name: 'Reflexão' },
  { id: 'concepts', name: 'Conceitos' },
  { id: 'practice', name: 'Prática' },
];

export default function ArticlesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const filteredArticles = selectedCategory === 'all' 
    ? articlesData 
    : articlesData.filter(article => article.category === selectedCategory);

  return (
    <Layout>
      <View style={[styles.container, isDark && styles.containerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Artigos</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Leituras para reflexão e prática
        </Text>
        
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CategoryPill
                title={item.name}
                isSelected={selectedCategory === item.id}
                onPress={() => setSelectedCategory(item.id)}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        <FlatList
          data={filteredArticles}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ArticleCard
              title={item.title}
              category={item.category}
              readTime={item.readTime}
              onPress={() => router.push({
                pathname: '/article-detail',
                params: { id: item.id }
              })}
            />
          )}
          contentContainerStyle={styles.articlesList}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2A9D8F',
    marginTop: 16,
  },
  titleDark: {
    color: '#4ECDC4',
  },
  subtitle: {
    fontSize: 16,
    color: '#505050',
    marginBottom: 24,
  },
  subtitleDark: {
    color: '#CCCCCC',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 16,
  },
  articlesList: {
    paddingBottom: 24,
  },
});