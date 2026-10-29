/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



/* 2. Zona Main */
export default function Modal({setScreen}) {
return (
    <View style={styles.container}>


        <Text> Aqui va la practica de Adrian</Text>

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
    backgroundColor: '#514f6a',
    alignItems: 'center',
    justifyContent: 'center',
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
