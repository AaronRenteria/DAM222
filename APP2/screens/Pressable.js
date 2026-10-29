
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable
} from 'react-native';

import SwitchEjemplo from '../components/SwitchEjemplo';

export default function PantallaPressable({ setScreen }) {

    const [imagenGrande, setImagenGrande] = useState(false);
    const [oscuro, setOscuro] = useState(false);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: oscuro ? '#000000' : '#FFFFFF'
                }
            ]}
        >
            <Pressable onPress={() => alert('Me presionaste')}>
                <Text
                    style={[
                        styles.texto,
                        { color: oscuro ? '#FFFFFF' : '#000000' }
                    ]}
                >
                    Presioname
                </Text>
            </Pressable>

            <Pressable
                onPress={() => setImagenGrande(!imagenGrande)}
            >
                <Image
                    source={require('../assets/icon.png')}
                    style={
                        imagenGrande
                            ? styles.imagenGrande
                            : styles.image
                    }
                />
            </Pressable>

            <SwitchEjemplo
                oscuro={oscuro}
                cambiarModo={setOscuro}
            />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => setScreen('menu')}
            >
                <Text style={styles.backButtonText}>
                    Regresar al menu
                </Text>
            </TouchableOpacity>

            <StatusBar style={oscuro ? 'light' : 'dark'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    texto: {
        fontSize: 20,
        marginBottom: 20,
    },

    image: {
        width: 100,
        height: 100,
    },

    imagenGrande: {
        width: 180,
        height: 180,
    },

    backButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },

    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
