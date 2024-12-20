import Home from './Home';
import Login from './Login';
import Cadastro from './arearestrita/Cadastro';
import Perfil from './arearestrita/Perfil';
import Reservas  from './arearestrita/Reservas'
import 'react-native-gesture-handler';

import BotaoConfirme from '../assets/components/BotaoConfirme';

import Confirmacao from './arearestrita/Confirmacao';
import Relogio from '../assets/components/Relogio'
import Realizados from './arearestrita/Realizados';
import PerfilAdm from './arearestrita/PerfilAdm'
import ListaUsuarios from './arearestrita/listas/ListaUsuarios';
import ListaUsuariosBusca from './arearestrita/listas/ListaUsuariosBusca';

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Outras configurações aqui...

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export { 
    Home, 
    Login, 
    Cadastro, 
    Perfil, 
    BotaoConfirme, 
    Confirmacao, 
    Relogio, 
    Reservas, 
    Realizados,
    PerfilAdm,
    ListaUsuarios,
    ListaUsuariosBusca
};