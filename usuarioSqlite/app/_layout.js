import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Stack } from "expo-router";
import { inicializarBaseDeDatos } from "../database/database";

export default function RootLayout() {
    const [lista, setLista] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const iniciar = async () => {
            try {
                await inicializarBaseDeDatos();
                setLista(true);
            } catch (e) {
                setError(e.message);
            }
        };
        iniciar();
    }, []);

    if (!lista) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                {error
                    ? <Text style={{ color: "#DC2626", textAlign: "center" }}>No se pudo abrir la base de datos: {error}</Text>
                    : <ActivityIndicator size="large" />}
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen name="(Tabs)" options={{ headerShown: false, title: "Listado" }} />
            <Stack.Screen name="detalle" options={{title:"Detalle del usuario"}}/>
            <Stack.Screen name="actualiza" options={{title:"Actualizar usuario"}}/>
        </Stack>

    );
}
