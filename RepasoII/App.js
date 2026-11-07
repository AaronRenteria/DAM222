import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StatusBar
} from 'react-native';

export default function App() {
  const [isSplashActive, setIsSplashActive] = useState(true);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashActive(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAgregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((prevLibros) => [nuevoLibro, ...prevLibros]);

      setTitulo('');
      setAutor('');
      setGenero('');

      setLoading(false);

      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (isSplashActive) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.splashTitle}>Registro de Libros</Text>
        <Text style={styles.splashSubtitle}>¡Bienvenido!</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/800/1200' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.mainTitle}>Catálogo de Libros</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            placeholderTextColor="#888"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#888"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            placeholderTextColor="#888"
            value={genero}
            onChangeText={setGenero}
          />

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAgregarLibro}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Agregar Libro'}
            </Text>
          </Pressable>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Guardando libro...</Text>
          </View>
        )}

        <Text style={styles.totalText}>Total de libros: {libros.length}</Text>

        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardText}>Autor: {item.autor}</Text>
              <Text style={styles.cardText}>Género: {item.genero}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#94A3B8',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#60A5FA',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 4,
    fontSize: 14,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
});