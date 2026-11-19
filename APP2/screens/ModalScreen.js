/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Button, Modal } from 'react-native';
import { useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


/* 2. Zona Main */
export default function ModalScreen({ setScreen }) {

    const [visible, setVisible] = useState(false);
    const bottomSheetRef = useRef(null);
    const snapPoints = ['40%', '65%'];

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Text style={styles.titulo}>Tipos de Modal y BottomSheet</Text>
                <Text style={styles.descripcion}>Practica de Modal</Text>

                <View style={styles.boton}>
                    <Button
                        title="Abrir Modal"
                        color="#1E90FF"
                        onPress ={() => setVisible(true)}
                    />
                </View>

                <Modal
                    visible={visible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setVisible(false)}
                >
                    <View style={styles.modalFondo}>
                        <View style={styles.modalContenido}>
                            <Text style={styles.modalTitulo}>Hola!</Text>
                            <Text style={styles.texto}>Aqui va un texto</Text>
                            <Button
                                title="Cerrar"
                                color="#E74C3C"
                                onPress={() => setVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>

                <View style={styles.boton}>
                    <Button
                        title="Abrir BottomSheet"
                        color="#1E90FF"
                        onPress={() => bottomSheetRef.current?.expand()}
                    />
                </View>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setScreen('menu')}
                >
                    <Text style={styles.backButtonText}>Regresar al menu</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />
            </View>

            {/* BottomSheet persistente: siempre visible, no se puede cerrar */}
            <BottomSheet
                index={0}
                snapPoints={['15%', '40%']}
                enablePanDownToClose={false}
                backgroundStyle={{ backgroundColor: '#fff' }}
                handleIndicatorStyle={{ backgroundColor: '#aaa' }}
            >
                <BottomSheetView style={styles.sheetContenido}>
                    <Text style={styles.sheetTitulo}>BottomSheet Persistente</Text>
                    <Text style={styles.texto}>Este panel permanece siempre visible</Text>
                </BottomSheetView>
            </BottomSheet>

            {/* BottomSheet modal: empieza cerrado y se cierra deslizando */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={styles.sheetContenido}>
                    <Text style={styles.sheetTitulo}>BottomSheet Modal</Text>
                    <Text style={styles.texto}>Cubre parte de la pantalla y se cierra deslizando</Text>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

/* 3. Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF2F8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 15,
        textAlign: 'center',
    },

    descripcion: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 25,
    },

    boton: {
        width: '80%',
        marginVertical: 10,
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

    modalFondo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modalContenido: {
        width: '85%',
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        gap: 15,
    },

    modalTitulo: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#2C3E50',
    },

    texto: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },

    sheetContenido: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    sheetTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6C5CE7',
        marginBottom: 15,
        textAlign: 'center',
    },
});
