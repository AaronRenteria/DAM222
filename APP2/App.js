/*1. Zona de importaciones*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import { Saludos2 } from './components/Saludos2';
import {Perfil} from './components/Perfil';
/*2. Zona Main */
export default function App() {
  return (
    <View style={styles.container}>
      
      <Perfil nombre="Aaron" materia="Movil"/>
      <Perfil nombre="Leronardo"/>
      <Perfil nombre="Carlos"/>
      <Perfil nombre="Fran"/>
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
