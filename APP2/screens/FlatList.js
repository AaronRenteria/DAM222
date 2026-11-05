/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SectionList } from 'react-native';

const datosFlat = [
    { id: '1', nombre: 'Aaron' },
    { id: '2', nombre: 'Leo' },
    { id: '3', nombre: 'Carlos' },
    { id: '4', nombre: 'Fran' }
];

const datosSection = [
    {
        titulo: 'Frutas',
        data: ['Manzana', 'Platano']
    },
    {
        titulo: 'Verduras',
        data: ['Zanahoria', 'Lechuga'],
    },
];

/* 2. Zona Main */
export default function ListasScreen({ setScreen }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Ejemplo FlatList</Text>

            <FlatList
                data={datosFlat}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.nombre}</Text>
                )}
            />

            <SectionList
                sections={datosSection}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item}</Text>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.encabezado}>{section.titulo}</Text>
                )}
            />

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
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#C4F3FF',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: 'purple',
    },
    encabezado: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'gold',
        padding: 5,
        color: 'white'
    },
    item: {
        fontSize: 14,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#121212',
    },
    backButton: {
        backgroundColor: 'purple',
        padding: 12,
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});