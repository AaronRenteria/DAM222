/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';
import Tarjetas from './Tarjetas';
import SafeScreen from './SafeScreen';
import Pressable from './Pressable';
import TextInput from './TextInput';
import FlatList from './FlatList';
import ImageBackground from './ImageBackgroundEjemplo';
import ActivityIndicator from './ActivityIndicator';
import  Modal from './Modal';



/* 2. Zona Main */
export default function MenuScreen() {

    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'tarjetas':
            return <Tarjetas setScreen={setScreen} />
        case 'safeScreen':
            return <SafeScreen setScreen={setScreen} />
        case 'pressable':
            return <Pressable  setScreen={setScreen}/>
        case 'textInput':
            return <TextInput setScreen={setScreen}/>
        case 'flatList':
            return <FlatList setScreen={setScreen}/>
        case 'imageBackground':
            return <ImageBackground setScreen={setScreen}/>
        case 'modal':
            return <Modal setScreen={setScreen}/>
        case 'activityIndicator':
            return <ActivityIndicator setScreen={setScreen}/>




        case 'menu':
        default:
            return (

                <View style={styles.container}>

                    <Text>Menu de practicas</Text>

                    <Button title='Tarjetas' onPress={() => setScreen('tarjetas')}></Button>
                    <Button title='SafeAreaView' onPress={() => setScreen('safeScreen')}></Button>
                    <Button title='Pressable' onPress={() => setScreen('pressable')}></Button>
                    <Button title='TextInput' onPress={() => setScreen('textInput')}></Button>
                    <Button title='FlatList' onPress={() => setScreen('flatList')}></Button>
                    <Button title='ImageBackground' onPress={() => setScreen('imageBackground')}></Button>
                    <Button title='Modal' onPress={() => setScreen('modal')}></Button>
                    <Button title='ActivityIndicator' onPress={() => setScreen('activityIndicator')}></Button>






                    <StatusBar style="auto" />
                </View>
            );
    }//switch
}//funcion

/* 3. Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    }
});
