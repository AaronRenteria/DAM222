import { StatusBar } from 'expo-status-bar'; // Barra de estado superior (hora, batería)
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator // Indicador visual de carga (ruedita giratoria)
} from 'react-native';
import { useState } from 'react'; // Hook para guardar el estado del componente
import Inicio from './Inicio'; // Importa la pantalla de Inicio

export default function App() {
  // Estado para controlar la pantalla de carga (true/false)
  const [cargando, setCargando] = useState(false);
  // Estado para saber qué pantalla mostrar ('principal' o 'inicio')
  const [pantalla, setPantalla] = useState('principal');

  // Función para simular tiempo de carga entre pantallas
  function cambiarPantalla(destino) {
    setCargando(true); // Muestra la carga

    setTimeout(() => {
      setPantalla(destino); // Cambia la pantalla actual
      setCargando(false); // Oculta la carga
    }, 1500); // Espera 1.5 segundos
  }

  // Vista 1: Si está cargando, muestra la ruedita giratoria
  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.texto}>Cargando...</Text>
      </View>
    );
  }

  // Vista 2: Si la pantalla elegida es 'inicio', carga la pantalla Inicio
  if (pantalla === 'inicio') {
    return (
      <Inicio
        onRegresar={() => cambiarPantalla('principal')}
      />
    );
  }

  // Vista 3: Pantalla Principal (por defecto)
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

// Estilos visuales de los componentes
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