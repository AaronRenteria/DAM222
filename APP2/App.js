/*1. Zona de importaciones*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import { Saludos2 } from './components/Saludos2';
/*2. Zona Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola Mundo React Native !</Text>
      <Image source={require("./assets/wave.png")}></Image>
      <Text>-----------------------------------------------</Text>
      <Saludo></Saludo>
      <Saludo/>
      <Text>-----------------------------------------------</Text>
      <Saludos2></Saludos2>
      <Saludos2/>
      <StatusBar style="auto" />
    </View>
  );
}

/*3. Zona de estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
