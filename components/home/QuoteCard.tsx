import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const quotes = [
  {
    text: "A tecnologia deve servir a nós, não o contrário.",
    author: "Desplugue"
  },
  {
    text: "Desconectar-se é reconectar-se consigo mesmo.",
    author: "Desplugue"
  },
  {
    text: "Menos telas, mais vida real.",
    author: "Desplugue"
  },
  {
    text: "O silêncio digital é o novo luxo.",
    author: "Desplugue"
  },
  {
    text: "Estamos perdendo a arte de estar presentes.",
    author: "Desplugue"
  }
];

export default function QuoteCard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Get a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.quoteText, isDark && styles.quoteTextDark]}>
        "{quote.text}"
      </Text>
      <Text style={[styles.quoteAuthor, isDark && styles.quoteAuthorDark]}>
        — {quote.author}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerDark: {
    backgroundColor: '#2A2A2A',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#333333',
    marginBottom: 12,
    lineHeight: 26,
  },
  quoteTextDark: {
    color: '#EEEEEE',
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'right',
  },
  quoteAuthorDark: {
    color: '#BBBBBB',
  },
});