
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SwitchEjemplo({ oscuro, cambiarModo }) {
    return (
        <View style={styles.container}>
            <Text
                style={[
                    styles.titulo,
                    { color: oscuro ? '#FFFFFF' : '#000000' }
                ]}
            >
                Modo Oscuro
            </Text>

            <Switch
                value={oscuro}
                onValueChange={cambiarModo}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={oscuro ? '#007AFF' : '#f4f3f4'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },

    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
