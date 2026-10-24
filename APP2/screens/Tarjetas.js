/*1. Zona de importaciones*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import  Perfil from '../components/Perfil';
/*2. Zona Main */
export default function Tarjetas() {
  return (
    <View style={styles.container}>

      <Perfil style={styles.tarjeta1} nombre="Aaron" materia="Movil" carrera="TIID" />
      <Perfil style={styles.tarjeta2} nombre="Leo" materia="Movil" carrera="TIID" />
      <Perfil style={styles.tarjeta3} nombre="Carlos" materia="Movil" carrera="TIID" />
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
  tarjeta1:{backgroundColor:'green'},
  tarjeta2:{backgroundColor:'red'},
  tarjeta3:{backgroundColor:'pink'},
});
