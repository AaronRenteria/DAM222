
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

export default function Inicio(setScreen) {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (showSplash) {
        return (
            <View style={styles.splashContainer}>
                <Text style={styles.splashTitle}>BIENVENIDOS</Text>
                <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
                <Text style={styles.splashLoading}>Cargando presentación...</Text>
                <StatusBar style="light" />
            </View>
        );
    }

    return (
        <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.titulo}>ImageBackground & SplashScreen</Text>
                <Text style={styles.subtitulo}>Aaron Renteria</Text>
                <Text style={styles.subtitulo}>Leonardo Suarez</Text>
                <Text style={styles.subtitulo}>Carlos Camargo</Text>
            </View>

            <StatusBar style="light" />
        </Image>
    );
}