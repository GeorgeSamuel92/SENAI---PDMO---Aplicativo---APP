import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import api from '../../services/api/api';

export default function App() {
  const [cliente, setCliente] = useState([]);
  const [idCli, setIdCli] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleShowAlert = () => {
    setShowAlert(true);
  };


  const getCliente = async (id) => {
    try {
      if (id > 0) {
        const response = await api.get(`/clientes/${id}`)
          .catch(function (error) {
            if (error.response) {
              console.error(error.response.data);
              console.error(error.response.status);
              console.error(error.response.headers);
            } else if (error.request) {
              if ((error.request._response).includes('Failed')) {
                console.log('Erro ao conectar com a API');
              }
            } else {
              console.error('Erro: ', error.message);
            }
          });

        if (response != undefined) {
          if (response.data.length === 0) {
            setCliente([])
            setAlertMessage('Registro não localizado na base de dados, verifique e tente novamente!')
            handleShowAlert();
          } else {
            setCliente(response.data)
            
          }

        }

      } else {
        setCliente([]);
        handleShowAlert();
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput style={styles.textInput}
        placeholder='ID Clientes'
        value={idCli.toString()}
        onChangeText={setIdCli}
      >

      </TextInput>

      <TouchableOpacity
        onPress={() => getCliente(idCli)}
        style={styles.botao}
      >

        <Text style={{ color: 'white' }}> Pressione para pesquisar</Text>

      </TouchableOpacity>

      <Text style={styles.t}>ID</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.id.toString()}></TextInput>
      <Text style={styles.t}>Nome</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.nome}></TextInput>
      <Text style={styles.t}>Idade</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.idade.toString()}></TextInput>


      {showAlert &&
        (Alert.alert('Informação', 'Registro não foi localizado na base de dados',
          [
            { text: 'OK', onPress: () => setShowAlert(false) }
          ]))
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  botao: {

    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    backgroundColor: 'orange',
    borderColor: 'black',
    borderRadius: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 5,
    height: 40,
    width: '80%',

  },
  t: {
    gap: 2,
    textAlign: 'left',
    color: 'orange'
  }
});
