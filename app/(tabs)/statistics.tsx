import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Layout from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { StatCard } from '@/components/statistics/StatCard';
import { ProgressCircle } from '@/components/statistics/ProgressCircle';
import { useChallenges } from '@/hooks/useChallenges';
import { useReflections } from '@/hooks/useReflections';
import { challengesData } from '@/data/challenges';
import { Calendar, Clock, CheckSquare, PenSquare } from 'lucide-react-native';

export default function StatisticsScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { completedChallenges, streak } = useChallenges();
  const { reflections } = useReflections();
  
  // Calculate challenge completion percentage
  const totalChallenges = challengesData.length;
  const completedCount = completedChallenges.length;
  const completionPercentage = totalChallenges > 0 
    ? Math.round((completedCount / totalChallenges) * 100) 
    : 0;
  
  // Estimate time offline (5 minutes per completed challenge as a simple metric)
  const estimatedOfflineTime = completedCount * 5;
  
  return (
    <Layout>
      <ScrollView
        style={[styles.container, isDark && styles.containerDark]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.title, isDark && styles.titleDark]}>Estatísticas</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Seu progresso no desconectar
        </Text>
        
        <View style={styles.progressSection}>
          <ProgressCircle percentage={completionPercentage} />
          <Text style={[styles.progressText, isDark && styles.progressTextDark]}>
            {completionPercentage}% dos desafios concluídos
          </Text>
        </View>
        
        <View style={styles.statsGrid}>
          <StatCard
            title={`${completedCount}`}
            subtitle="Desafios completos"
            icon={<CheckSquare color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
          />
          
          <StatCard
            title={`${streak}`}
            subtitle="Dias consecutivos"
            icon={<Calendar color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
          />
          
          <StatCard
            title={`${estimatedOfflineTime} min`}
            subtitle="Tempo desconectado"
            icon={<Clock color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
          />
          
          <StatCard
            title={`${reflections.length}`}
            subtitle="Reflexões escritas"
            icon={<PenSquare color={isDark ? '#A786CD' : '#2A9D8F'} size={24} />}
          />
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
  progressSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressText: {
    fontSize: 16,
    color: '#333333',
    marginTop: 8,
  },
  progressTextDark: {
    color: '#EEEEEE',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});