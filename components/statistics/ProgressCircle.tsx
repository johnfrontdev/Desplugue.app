import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Svg, { Circle } from 'react-native-svg';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressCircle({ 
  percentage, 
  size = 160, 
  strokeWidth = 10 
}: ProgressCircleProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Calculate circle values
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isDark ? '#333333' : '#EEEEEE'}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isDark ? '#A786CD' : '#2A9D8F'}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      
      <View style={styles.textContainer}>
        <Text style={[styles.percentage, isDark && styles.percentageDark]}>
          {percentage}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
  },
  percentageDark: {
    color: '#EEEEEE',
  },
});