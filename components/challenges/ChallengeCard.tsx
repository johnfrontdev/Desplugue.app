import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { CheckSquare, Square, Clock } from 'lucide-react-native';

interface ChallengeCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  onComplete: () => void;
}

export function ChallengeCard({
  title,
  description,
  duration,
  difficulty,
  isCompleted,
  onComplete,
}: ChallengeCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return isDark ? '#4ECDC4' : '#2A9D8F';
      case 'medium': return isDark ? '#FFD166' : '#FFB627';
      case 'hard': return isDark ? '#FF6B6B' : '#EF476F';
      default: return isDark ? '#4ECDC4' : '#2A9D8F';
    }
  };
  
  // Get difficulty label
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Fácil';
    }
  };
  
  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={2}>
          {title}
        </Text>
        
        <TouchableOpacity 
          style={styles.checkbox}
          onPress={onComplete}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <CheckSquare size={24} color={isDark ? '#4ECDC4' : '#2A9D8F'} />
          ) : (
            <Square size={24} color={isDark ? '#AAAAAA' : '#CCCCCC'} />
          )}
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.description, isDark && styles.descriptionDark]}>
        {description}
      </Text>
      
      <View style={styles.metaContainer}>
        <View style={styles.timeContainer}>
          <Clock size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.timeText, isDark && styles.timeTextDark]}>
            {duration}
          </Text>
        </View>
        
        <View 
          style={[
            styles.difficultyContainer, 
            { backgroundColor: getDifficultyColor(difficulty) + '20' }
          ]}
        >
          <Text 
            style={[
              styles.difficultyText, 
              { color: getDifficultyColor(difficulty) }
            ]}
          >
            {getDifficultyLabel(difficulty)}
          </Text>
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    marginRight: 16,
  },
  titleDark: {
    color: '#EEEEEE',
  },
  checkbox: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  descriptionDark: {
    color: '#BBBBBB',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  timeTextDark: {
    color: '#AAAAAA',
  },
  difficultyContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
});