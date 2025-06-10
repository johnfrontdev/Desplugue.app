import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Layout from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { useChallenges } from '@/hooks/useChallenges';
import { challengesData } from '@/data/challenges';

export default function ChallengesScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { completedChallenges, completeChallenge } = useChallenges();
  
  return (
    <Layout>
      <View style={[styles.container, isDark && styles.containerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Desafios</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Pratique o desconectar no seu dia a dia
        </Text>
        
        <FlatList
          data={challengesData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const isCompleted = completedChallenges.includes(item.id);
            
            return (
              <ChallengeCard
                title={item.title}
                description={item.description}
                duration={item.duration}
                difficulty={item.difficulty}
                isCompleted={isCompleted}
                onComplete={() => {
                  if (!isCompleted) {
                    completeChallenge(item.id);
                  }
                }}
              />
            );
          }}
          contentContainerStyle={styles.challengesList}
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
  challengesList: {
    paddingBottom: 24,
  }
});