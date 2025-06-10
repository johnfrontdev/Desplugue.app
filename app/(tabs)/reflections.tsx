import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Layout from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { ReflectionCard } from '@/components/reflections/ReflectionCard';
import { useReflections } from '@/hooks/useReflections';
import { PlusCircle, HelpCircle } from 'lucide-react-native';

// Prompts to guide reflection
const REFLECTION_PROMPTS = [
  "O que você percebeu ao se desconectar hoje?",
  "Qual foi seu maior desafio digital hoje?",
  "O que você fez no tempo longe das telas?",
  "Como você se sentiu sem acesso constante ao celular?",
  "O que você aprendeu sobre si mesmo hoje?"
];

export default function ReflectionsScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { reflections, addReflection } = useReflections();
  const [newReflection, setNewReflection] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  
  // Get a random prompt
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * REFLECTION_PROMPTS.length);
    return REFLECTION_PROMPTS[randomIndex];
  };
  
  // Handle saving a new reflection
  const handleSaveReflection = () => {
    if (newReflection.trim()) {
      addReflection(newReflection);
      setNewReflection('');
    }
  };
  
  return (
    <Layout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <View style={[styles.container, isDark && styles.containerDark]}>
          <Text style={[styles.title, isDark && styles.titleDark]}>Reflexões</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Seu diário de desconexão digital
          </Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.promptContainer}>
              <TouchableOpacity 
                onPress={() => setShowPrompts(!showPrompts)}
                style={styles.promptButton}
              >
                <HelpCircle size={20} color={isDark ? '#A786CD' : '#2A9D8F'} />
                <Text style={[styles.promptText, isDark && styles.promptTextDark]}>
                  {showPrompts ? 'Ocultar sugestões' : 'Precisa de ideias?'}
                </Text>
              </TouchableOpacity>
              
              {showPrompts && (
                <View style={[styles.promptsBox, isDark && styles.promptsBoxDark]}>
                  {REFLECTION_PROMPTS.map((prompt, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={styles.promptItem}
                      onPress={() => {
                        setNewReflection(prompt);
                        setShowPrompts(false);
                      }}
                    >
                      <Text style={[styles.promptItemText, isDark && styles.promptItemTextDark]}>
                        {prompt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Escreva sua reflexão..."
              placeholderTextColor={isDark ? '#888888' : '#AAAAAA'}
              value={newReflection}
              onChangeText={setNewReflection}
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                isDark && styles.saveButtonDark,
                !newReflection.trim() && styles.saveButtonDisabled
              ]}
              onPress={handleSaveReflection}
              disabled={!newReflection.trim()}
            >
              <PlusCircle size={16} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Salvar reflexão</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={reflections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ReflectionCard
                text={item.text}
                date={item.date}
              />
            )}
            contentContainerStyle={styles.reflectionsList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
                  Nenhuma reflexão ainda. Que tal escrever sobre sua experiência ao desconectar?
                </Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
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
  inputContainer: {
    marginBottom: 24,
  },
  promptContainer: {
    marginBottom: 8,
  },
  promptButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#505050',
  },
  promptTextDark: {
    color: '#CCCCCC',
  },
  promptsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promptsBoxDark: {
    backgroundColor: '#2A2A2A',
  },
  promptItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  promptItemText: {
    fontSize: 14,
    color: '#333333',
  },
  promptItemTextDark: {
    color: '#EEEEEE',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    textAlignVertical: 'top',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  inputDark: {
    backgroundColor: '#2A2A2A',
    borderColor: '#444444',
    color: '#EEEEEE',
  },
  saveButton: {
    backgroundColor: '#2A9D8F',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveButtonDark: {
    backgroundColor: '#4ECDC4',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  reflectionsList: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 16,
  },
  emptyTextDark: {
    color: '#AAAAAA',
  },
});