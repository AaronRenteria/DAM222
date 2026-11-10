import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';

export default function TarjetasActivas() {
  const tarjetas = [
    { id: '1', nombre: 'Tarjeta de Crédito Oro' },
    { id: '2', nombre: 'Tarjeta de Débito Universidad' },
    { id: '3', nombre: 'Tarjeta de Biblioteca Digital' },
  ];

  const mostrarMensaje = (nombre) => {
    Alert.alert('Tarjeta Seleccionada', `Has presionado: ${nombre}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloSeccion}>Tarjetas Activas</Text>
      {tarjetas.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.nombreTarjeta}>{item.nombre}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
            ]}
            onPress={() => mostrarMensaje(item.nombre)}
          >
            <Text style={styles.textoBoton}>Ver detalles</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nombreTarjeta: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
    flex: 1,
  },
  boton: {
    backgroundColor: '#34C759',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonPresionado: {
    opacity: 0.7,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
