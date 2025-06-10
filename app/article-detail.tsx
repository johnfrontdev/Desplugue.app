import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import { articlesData } from '@/data/articles';
import { ArrowLeft, Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react-native';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const { width } = useWindowDimensions();
  
  const [fontSize, setFontSize] = useState(16);
  
  // Find article by id
  const article = articlesData.find(a => a.id === id);
  
  if (!article) {
    return (
      <Layout>
        <View style={[styles.container, isDark && styles.containerDark]}>
          <Text style={[styles.errorText, isDark && styles.errorTextDark]}>
            Artigo não encontrado
          </Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, isDark && styles.backButtonTextDark]}>
              Voltar para artigos
            </Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }
  
  // Increase font size (max 24)
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(current => current + 2);
    }
  };
  
  // Decrease font size (min 14)
  const decreaseFontSize = () => {
    if (fontSize > 14) {
      setFontSize(current => current - 2);
    }
  };
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Layout>
        <View style={[styles.container, isDark && styles.containerDark]}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color={isDark ? '#EEEEEE' : '#333333'} />
              <Text style={[styles.backButtonText, isDark && styles.backButtonTextDark]}>
                Voltar
              </Text>
            </TouchableOpacity>
            
            <View style={styles.controls}>
              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={decreaseFontSize}
              >
                <ZoomOut size={20} color={isDark ? '#EEEEEE' : '#333333'} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={increaseFontSize}
              >
                <ZoomIn size={20} color={isDark ? '#EEEEEE' : '#333333'} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={toggleTheme}
              >
                {isDark ? (
                  <Sun size={20} color="#EEEEEE" />
                ) : (
                  <Moon size={20} color="#333333" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          <ScrollView 
            style={styles.articleContainer}
            contentContainerStyle={styles.articleContent}
          >
            <Text style={[styles.articleTitle, isDark && styles.articleTitleDark]}>
              {article.title}
            </Text>
            
            <View style={styles.articleMeta}>
              <View style={[
                styles.categoryPill, 
                { backgroundColor: isDark ? '#333333' : '#EEEEEE' }
              ]}>
                <Text style={[styles.categoryText, isDark && styles.categoryTextDark]}>
                  {article.category === 'reflection' && 'Reflexão'}
                  {article.category === 'concepts' && 'Conceitos'}
                  {article.category === 'practice' && 'Prática'}
                </Text>
              </View>
              
              <Text style={[styles.readTime, isDark && styles.readTimeDark]}>
                {article.readTime} min de leitura
              </Text>
            </View>
            
            <Text 
              style={[
                styles.articleBody, 
                isDark && styles.articleBodyDark,
                { fontSize: fontSize }
              ]}
            >
              {article.content}
            </Text>
          </ScrollView>
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333333',
  },
  backButtonTextDark: {
    color: '#EEEEEE',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginLeft: 4,
  },
  articleContainer: {
    flex: 1,
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  articleTitleDark: {
    color: '#EEEEEE',
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#505050',
  },
  categoryTextDark: {
    color: '#CCCCCC',
  },
  readTime: {
    fontSize: 14,
    color: '#777777',
  },
  readTimeDark: {
    color: '#AAAAAA',
  },
  articleBody: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  articleBodyDark: {
    color: '#EEEEEE',
  },
  errorText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginTop: 40,
  },
  errorTextDark: {
    color: '#EEEEEE',
  },
});