import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import firebase from '../firebaseConnection';

export default function Login(){

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [isUser, setIsUser] = useState(true);

    const navigation = useNavigation()

    async function logar(){
        await firebase.auth().signInWithEmailAndPassword(email,senha)
        .then((value)=>{
            firebase.database().ref(`usuarios/${value.user.uid}`).once('value', (snapshot) => {
                navigation.navigate('Home', {banco: snapshot.val().nome})
            })
        }).catch((error)=>{
            alert('Algo de errado não está certo')
            return
        })

        setEmail('');
        setSenha('');
    }

    async function criarConta() {
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(value =>{
            firebase.database().ref('usuarios').child(value.user.uid).set({
                nome: nome
            })
            console.log(value.user.uid)
            setNome('');
            setEmail('');
            setSenha('');
        }).catch(error => {
            console.log('Error: ' + error)
            return
        })
        
    }

  return (
      <View style={styles.container}>

        {!isUser &&
        <View>
            <Text style={styles.texto}>Nome</Text>
            <TextInput
                value={nome}
                placeholder='Nome'
                style={styles.input}
                onChangeText={(texto)=> setNome(texto)}
            />
        </View>
        }

        <Text style={styles.texto}>Email</Text>
        <TextInput
            value={email}
            placeholder='Email'
            style={styles.input}
            onChangeText={(texto)=> setEmail(texto)}
        />
        <Text style={styles.texto}>Senha</Text>
        <TextInput
            value={senha}
            placeholder='*******'
            style={styles.input}
            onChangeText={(texto)=> setSenha(texto)}
            secureTextEntry={true}
        />

        { isUser ?
        (
            <TouchableOpacity 
            onPress={logar}
            style={styles.areaBtn}
            >
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>   
        ) : (

            <TouchableOpacity 
            onPress={criarConta}
            style={[styles.areaBtn, {backgroundColor: '#000'}]}
            >
                <Text style={styles.btnText}>Criar Conta</Text>
            </TouchableOpacity> 
        )

        }

        {isUser ? (
            <TouchableOpacity 
            onPress={()=> setIsUser(false)}
            style={styles.areaConta}
            >
                <Text>Não possui conta? Criar conta</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity 
            onPress={()=> setIsUser(true)}
            style={styles.areaConta}
            >
                <Text>Possuo Cadastro</Text>
            </TouchableOpacity>
        )}


      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
    },
    texto: {
        fontSize: 20
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 17,
        borderRadius: 5,
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
    },
    areaConta: {
        alignItems: 'center',
        marginTop: 10,
    }
});


