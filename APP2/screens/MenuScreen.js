/*1. Zona de importaciones*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';
import Tarjetas from './Tarjetas';
import SafeScreen from './SafeScreen';

/*2. Zona Main */
export default function MenuScreen() {

  const [screen, setScreen] = useState('menu');

  switch (screen) {
    case 'tarjetas':
      return <Tarjetas />
    case 'safeScreen':
      return <SafeScreen />
    case 'menu':
    default:


      return (
        <View style={styles.container}>

          <Text> Menu de Practicas  </Text>
          <Button title='Tarjetas' onPress={()=>setScreen('tarjetas')}></Button>
          <Button title='SafeAreaView' onPress={()=>setScreen('safeScreen')}></Button>
          <StatusBar style="auto" />
        </View>
      );
  }
}

/*3. Zona de estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
