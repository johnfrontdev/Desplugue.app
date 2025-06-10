import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import QuoteCard from '@/components/home/QuoteCard';
import NavigationCard from '@/components/home/NavigationCard';
import { Book, CheckSquare, BarChart2, PenSquare } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView 
        style={[styles.container, isDark && styles.containerDark]} 
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.titleDark]}>Desplugue</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Viva mais, conecte-se menos
          </Text>
        </View>
        
        <QuoteCard />
        
        <View style={styles.navigationContainer}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Comece sua jornada
          </Text>
          
          <View style={styles.cardsGrid}>
            <NavigationCard
              title="Artigos"
              description="Leituras para reflexão"
              icon={<Book color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
              onPress={() => router.push('/(tabs)/articles')}
            />
            
            <NavigationCard
              title="Desafios"
              description="Pratique o desconectar"
              icon={<CheckSquare color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
              onPress={() => router.push('/(tabs)/challenges')}
            />
            
            <NavigationCard
              title="Estatísticas"
              description="Seu progresso"
              icon={<BarChart2 color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
              onPress={() => router.push('/(tabs)/statistics')}
            />
            
            <NavigationCard
              title="Reflexões"
              description="Seu diário pessoal"
              icon={<PenSquare color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
              onPress={() => router.push('/(tabs)/reflections')}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
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
  contentContainer: {
    padding: 16,
  },
  header: {
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2A9D8F',
    marginBottom: 8,
  },
  titleDark: {
    color: '#4ECDC4',
  },
  subtitle: {
    fontSize: 16,
    color: '#505050',
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#CCCCCC',
  },
  navigationContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
  },
  sectionTitleDark: {
    color: '#EEEEEE',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});