import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import firebase from '../firebaseConnection';

export default function Home({route}){

    const navigation = useNavigation()

    async function deslogar() {
        await firebase.auth().signOut()
        navigation.navigate('Login')

    }

  return (
      <View style={styles.container}>
        <Text style={styles.texto}>Olá, {route.params?.banco} </Text>
        <Text style={styles.texto}>Está na pagina Home</Text>
        <TouchableOpacity 
        onPress={deslogar}
        style={styles.areaBtn}
        >
            <Text style={styles.btnText}>Sair</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center'
    },
    texto: {
        fontSize: 20,
        textAlign: 'center'
    },
    areaBtn: {
        backgroundColor: '#07a0c3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    btnText: {
        fontSize: 17,
        color: '#fff'
    }
});


