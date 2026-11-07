import { useState } from "react";
import { Text, View, Button, TextInput, KeyboardAvoidingView, Pressable, Keyboard, Platform, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

/**
 * Componente de pantalla de inicio de sesión.
 * Recibe `onRegresar` como prop para notificar al componente padre cuando el usuario desea volver.
 */
export default function Inicio({ onRegresar }) {

    // Estados para almacenar y controlar el texto ingresado en los inputs del formulario
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    return (
        /* 
           KeyboardAvoidingView ajusta automáticamente la pantalla para que el teclado virtual 
           no tape los campos de texto al escribir. El comportamiento varía según la plataforma (iOS/Android).
        */
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar style="auto" />

            {/* 
               Pressable envolvente que detecta toques fuera de los inputs 
               para ocultar/cerrar el teclado (Keyboard.dismiss).
            */}
            <Pressable style={styles.contenido} onPress={Keyboard.dismiss}>

                <Text style={styles.titulo}>Iniciar Sesión</Text>

                {/* Campo para ingresar el correo electrónico */}
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu correo"
                    value={correo}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Campo para ingresar la contraseña con texto oculto (puntos/asteriscos) */}
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu contraseña"
                    value={contrasena}
                    onChangeText={setContrasena}
                    secureTextEntry
                />

                {/* Contenedor del botón para volver a la pantalla anterior */}
                <View style={styles.boton}>
                    <Button title="Regresar" onPress={onRegresar} />
                </View>

            </Pressable>

        </KeyboardAvoidingView>
    );
}

// Estilos para dar estructura y espaciado a los componentes visuales
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