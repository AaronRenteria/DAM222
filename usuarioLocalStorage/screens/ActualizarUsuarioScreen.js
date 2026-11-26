import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { actualizarUsuario as actualizarEnStorage, obtenerUsuarioPorId } from '../services/usuariosService';

export default function ActualizarUsuarioScreen() {

    const { id } = useLocalSearchParams();
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [mensaje, setMensaje] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const cargar = async () => {
            try {
                const usuario = await obtenerUsuarioPorId(id);
                if (usuario) {
                    setNombre(usuario.nombre);
                    setEdad(String(usuario.edad));
                } else {
                    setMensaje('Usuario no encontrado.');
                }
            } catch (e) {
                setMensaje(e.message);
            }
        };
        cargar();
    }, [id]);

    const actualizarUsuario = async () => {
        setGuardando(true);
        try {
            const resultado = await actualizarEnStorage(id, nombre, edad);
            if (resultado.ok) {
                router.back();
            } else {
                setMensaje(resultado.mensaje);
            }
        } catch (e) {
            setMensaje(e.message);
        } finally {
            setGuardando(false);
        }
    };
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.titulo}>
                Actualizar Usuario
            </Text>

            <View style={styles.card}>

                <Text style={styles.label}>
                    Nombre
                </Text>

                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Nombre"
                />

                <Text style={styles.label}>
                    Edad
                </Text>

                <TextInput
                    style={styles.input}
                    value={edad}
                    onChangeText={setEdad}
                    placeholder="Edad"
                    keyboardType="numeric"
                />

                <Pressable
                    style={[styles.boton, guardando && { opacity: 0.6 }]}
                    onPress={actualizarUsuario}
                    disabled={guardando}
                >
                    <Text style={styles.textoBoton}>
                        {guardando ? 'Guardando...' : 'Guardar cambios'}
                    </Text>
                </Pressable>

                {mensaje && (
                    <Text style={styles.mensajeError}>
                        {mensaje}
                    </Text>
                )}

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1F2937',
        marginBottom: 25,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        elevation: 5,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },

    boton: {
        backgroundColor: '#FACC15',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    textoBoton: {
        color: '#1F2937',
        fontSize: 16,
        fontWeight: 'bold',
    },

    mensajeError: {
        marginTop: 15,
        textAlign: 'center',
        color: '#DC2626',
        fontWeight: 'bold',
    },

});