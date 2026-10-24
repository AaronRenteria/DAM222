
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Inicio({ onRegresar }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>Iniciar sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Escribe tu correo"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Escribe tu contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <View style={styles.boton}>
            <Button
              title="Ingresar"
              onPress={() => alert('Sesión iniciada')}
            />
          </View>

          <View style={styles.boton}>
            <Button
              title="Regresar"
              onPress={onRegresar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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
