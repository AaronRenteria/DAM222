/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Perfil } from '../components/Perfil';

/* 2. Zona Main */
// 1. AQUÍ FALTO RECIBIR { setScreen }
export default function Tarjetas({ setScreen }) {
    return (
        <View style={styles.container}>

            {/* Contenedor horizontal solo para las tarjetas */}
            <View style={styles.cardsContainer}>
                <Perfil style={styles.tarjeta1} nombre="Leo" materia="Movil" carrera="TIID" cuatrimestre="4to" />
                <Perfil style={styles.tarjeta2} nombre="Carlos" materia="Movil" carrera="TIID" cuatrimestre="4to" />
                <Perfil style={styles.tarjeta3} nombre="Aaron" materia="Movil" carrera="TIID" cuatrimestre="4to" />
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => setScreen('menu')}
            >
                <Text style={styles.backButtonText}>Regresar al menu</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

/* 3. Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',      
        justifyContent: 'center',
        gap: 20,
    },
    cardsContainer: {
        flexDirection: 'row',   
        justifyContent: 'space-evenly',
        width: '100%',
    },
    tarjeta1: {
        backgroundColor: '#89e4fd',
    },
    tarjeta2: {
        backgroundColor: '#8aec76',
    },
    tarjeta3: {
        backgroundColor: '#ece034',
    },
    backButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});