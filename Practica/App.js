
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import { useState } from 'react';
import Inicio from './Inicio';


export default function App() {
  const [cargando, setCargando] = useState(false);
  const [pantalla, setPantalla] = useState('principal');

  function cambiarPantalla(destino) {
    setCargando(true);

    setTimeout(() => {
      setPantalla(destino);
      setCargando(false);
    }, 1500);
  }

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.texto}>Cargando...</Text>
      </View>
    );
  }

  if (pantalla === 'inicio') {
    return (
      <Inicio
        onRegresar={() => cambiarPantalla('principal')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Pantalla principal</Text>

      <Button
        title="Ir a Inicio"
        onPress={() => cambiarPantalla('inicio')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  cargando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20
  },
  texto: {
    marginTop: 10,
    fontSize: 16
  }
});
