import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Button, ActivityIndicator as RNActivityIndicator
} from 'react-native';
import { useState } from 'react';
import Inicio from "./Inicio";

/**
 * Componente principal que simula navegación interna con una pantalla de carga (loader).
 * Recibe `setScreen` desde las props para regresar al menú global de la aplicación.
 */
export default function ActivityIndicator({ setScreen }) {
    // Estado para controlar la visibilidad del indicador de carga (spinner)
    const [cargando, setCargando] = useState(false);

    // Estado para controlar la pantalla actual visible ('principal' o 'inicio')
    const [pantalla, setPantalla] = useState('principal');

    /**
     * Simula la transición asíncrona entre pantallas.
     * Muestra el loader durante 1.5 segundos antes de cambiar la vista actual.
     */
    function cambiarPantalla(destino) {
        setCargando(true);

        setTimeout(() => {
            setPantalla(destino);
            setCargando(false);
        }, 1500);
    }

    // 1. RENDER CONDICIONAL: Estado de Carga
    if (cargando) {
        return (
            <View style={styles.cargando}>
                <RNActivityIndicator size="large" />
                <Text style={styles.texto}>Cargando...</Text>
            </View>
        );
    }

    // 2. RENDER CONDICIONAL: Pantalla 'Inicio'
    if (pantalla === 'inicio') {
        return (
            <Inicio onRegresar={() => cambiarPantalla('principal')} />
        );
    }

    // 3. RENDER PRINCIPAL: Pantalla por defecto ('principal')
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Pantalla Principal</Text>
            <Button title='Ir a Inicio' onPress={() => cambiarPantalla('inicio')} />
            <StatusBar style="auto" />
        </View>
    );
}

// Estilos del componente sin colores ni propiedades de TouchableOpacity
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 15,
    },
    cargando: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20
    },
    texto: {
        marginTop: 10,
        fontSize: 16
    },
});