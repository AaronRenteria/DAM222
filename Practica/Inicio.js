import { useState } from 'react'; // Hook para guardar lo que escribe el usuario
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput, // Campo de texto para ingresar datos
  KeyboardAvoidingView, // Ajusta la pantalla para que el teclado no tape los campos
  Pressable, // Detecta toques en la pantalla
  Keyboard, // Módulo para controlar el teclado
  Platform // Detecta si el sistema es iOS o Android
} from 'react-native';
import { StatusBar } from 'expo-status-bar'; // Barra superior del teléfono (batería, hora)

//El componente Inicio recibe la prop onRegresar y se la asigna al evento onPress de un botón:

export default function Inicio({ onRegresar }) {
  // Variables de estado para guardar el correo y la contraseña
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    // Evita que el teclado tape los elementos ajustando la vista según el SO
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="auto" />

      {/* Al tocar cualquier parte fuera de los inputs, oculta el teclado */}
      <Pressable style={styles.contenido} onPress={Keyboard.dismiss}>
        <Text style={styles.titulo}>Iniciar sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu correo"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address" // Muestra teclado optimizado para emails
          autoCapitalize="none" // Evita la mayúscula automática inicial
        />
        <TextInput
          style={styles.input}
          placeholder="Escribe tu contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry // Oculta los caracteres (puntos de contraseña)
        />

        {/* Botón para simular el inicio de sesión */}
        <View style={styles.boton}>
          <Button
            title="Ingresar"
            onPress={() => alert('Sesión iniciada')}
          />
        </View>

        {/* Botón para volver a la pantalla principal */}
        <View style={styles.boton}>
          <Button
            title="Regresar"
            onPress={onRegresar}
          />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

// Estilos visuales del formulario y contenedores
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16
  },
  boton: {
    marginTop: 10
  }
});