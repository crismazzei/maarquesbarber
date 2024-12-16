import React, {useEffect, useState, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Text, Button} from 'react-native'

import {Home, Login, Relogio} from './views';
import AreaRestrita from './views/arearestrita/AreaRestrita';
import config from './config/config.json'
import Atendimento0 from './views/arearestrita/atendimentos/Atendimento0';
import Atendimento0Adm from './views/arearestrita/atendimentos/Atendimento0Adm';
import  PerfilAdm  from './views/arearestrita/PerfilAdm';
import Perfil from './views/arearestrita/Perfil';
import Nome from './assets/components/Nome';
import Reservas from './views/arearestrita/Reservas';
import Usuarios from './views/arearestrita/Usuarios';
import Realizados from './views/arearestrita/Realizados';
import Usuario from './assets/components/Usuario'
import Cadastro from './views/arearestrita/Cadastro';
import 'react-native-gesture-handler';
import Relatorio from './views/arearestrita/Relatorio';
import ListaUsuariosBusca from './views/arearestrita/listas/ListaUsuariosBusca';
import ListaUsuarios from './views/arearestrita/listas/ListaUsuarios';
import NotificationHandler from './NotificationHandler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  
  const [response, setResponse] = useState([])
  const [relogio2, setRelogio2] = useState([])
  const [lancar, setLancar] = useState([])
  
  const Stack = createNativeStackNavigator();

 

//--------------------------------------- CHAMADA RELOGIO DATAS----------------------------------------//
  
  return (    
    <SafeAreaProvider>
    <NavigationContainer>

      {/* Manipulador de notificação aplicado globalmente */}
      <NotificationHandler />
      
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title:"Seja Bem-Vindo",
            headerTintColor:'#000000',
            headerStyle: {backgroundColor:"#EAC435"},
            headerTitleStyle: {
              fontWeight: 'bold',color:"#000000",
            },
          }}
        />
        <Stack.Screen name="Cadastro" options={{headerShown:false}} component={Cadastro}/>{/*HEADERSHOWN - esconde o header*/}                
        <Stack.Screen name="Login" options={{headerShown:false}} component={Login}/>{/*HEADERSHOWN - esconde o header*/}                
        <Stack.Screen name="Nome " options={{headerShown:false}} component={Nome} />
        <Stack.Screen name="Usuario" options={{headerShown:false}} component={Usuario} />        
        <Stack.Screen name="Perfil" options={{headerShown:false}} component={Perfil} />
        <Stack.Screen name="Reservas" options={{headerShown:false}} component={Reservas} />
        <Stack.Screen name="Atendimento0" options={{headerShown:false}} component={Atendimento0} />
        <Stack.Screen name="Atendimento0Adm" options={{headerShown:false}} component={Atendimento0Adm} />
        <Stack.Screen name="AreaRestrita" options={{headerShown:false}} component={AreaRestrita}/>
        <Stack.Screen name="Realizados" options={{headerShown:false}} component={Realizados}/>
        <Stack.Screen name="PerfilAdm" options={{headerShown:false}} component={PerfilAdm}/>
        <Stack.Screen name="Usuarios" options={{headerShown:false}} component={Usuarios}/>
        <Stack.Screen name="Relatorio" options={{headerShown:false}} component={Relatorio}/>
        <Stack.Screen name="ListaUsuarioBusca" options={{headerShown:false}} component={ListaUsuariosBusca}/>
        <Stack.Screen name="ListaUsuarios" options={{headerShown:false}} component={ListaUsuarios}/>

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  
  );
}

{/*

//---------------------------------------- CHAMANDO REALIZADOS ----------------------------------------//

  useEffect(() => {
    fetch(config.urlRoot+'lancarRealizados', {
        method: 'POST'
    }).then(response => response.json())
        .then(response => {
    setLancar(response.lancar)
    })
    .catch(function (error) {
        console.log("Error Relogio realizados");
        // ADD THIS THROW error pra parar de dar erro de network
        throw error;
    })
},[]);

//----------------------------------------- CHAMADA RELOGIO HORAS--------------------------------------//

    useEffect(() => {
        fetch(config.urlRoot+'transferApagarHoras', {
            method: 'POST'
        }).then(response => response.json())
            .then(response => {
        setResponse(response.response)
        })
        .catch(function (error) {
            console.log("Error Relogio Transfer");
            // ADD THIS THROW error pra parar de dar erro de network
            throw error;
        })
    },[]);

//----------------------------------------- CHAMADA RELOGIO DATAS---------------------------------------//

useEffect(() => {
        fetch(config.urlRoot+'transferRelogio', {
            method: 'POST'
        }).then(response => response.json())
            .then(response => {
        setRelogio2(response.relogio2)
        })
        .catch(function (error) {
            console.log("Error Relogio Trans 1");
            // ADD THIS THROW error pra parar de dar erro de network
            throw error;
        })
    },[]);


*/}