const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "100mb", extended:false, parameterLimit: 100000 }));
app.use(bodyParser.json({limit:"100mb"}));
// app.js

// Import the controllers
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const tranferController = require('./controllers/transferController')

// Mount the controllers
app.use(userController);
app.use(adminController);
app.use(tranferController)



//------------PORTA---------------------||
let port = process.env.PORT || 3000;
    app.listen(port,(req, res)=>{
        console.log('servidor rodando');
});

{/*

// Start the server
app.listen(3000, () => {
  console.log('Servidor RODANDO!');
});

let port = process.env.PORT || 3000;
    app.listen(port,(req, res)=>{
        console.log('servidor rodando');
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models=require('./models');
const { sequelize } = require('./models');
const app = express();
const { QueryTypes } = require('sequelize');
const moment = require('moment/moment');
const { response } = require('express');
const fs = require ('fs')
const _ = require('lodash')
app.use(cors());

app.use(bodyParser.urlencoded({ limit: "100mb", extended:false, parameterLimit: 100000 }));
app.use(bodyParser.json({limit:"100mb"}));

let user = models.User;
let atendimento = models.Atendimento;
let atendimento2 = models.Atendimento2;
let atendimento3 = models.Atendimento3;
let atendimento4 = models.Atendimento4;
let atendimento5 = models.Atendimento5;
let atendimento6 = models.Atendimento6;
let atendimento7 = models.Atendimento7;
let atendimento8 = models.Atendimento8;
let atendimento9 = models.Atendimento9;
let atendimento10 = models.Atendimento10;
let atendimento11 = models.Atendimento11;
let atendimento12 = models.Atendimento12;
let atendimento13 = models.Atendimento13;
let atendimento14 = models.Atendimento14;
let atendimento15 = models.Atendimento15;
let realizado = models.Realizados;



app.post('/login', async (req, res)=> {
    let response = await user.findOne({
        where:{usuario: req.body.usuario, senha: req.body.senha}
    });
        if (response === null){
            res.send(JSON.stringify('error')); // se o login estiver errado
        } else {
            res.send(response);
    }
});

app.post('/verificarSenha', async (req,res)=>{
    let response = await user.findOne({
        where:{id: req.body.id, senha: req.body.senhaAntiga}
    });

    if (response === null){
        res.send(JSON.stringify('Senha antiga não confere!')); // se a senha antiga estiver errada
    } else {
        if(req.body.novaSenha === req.body.confNovaSenha){
            response.senha = req.body.novaSenha;
            response.save();
            res.send(JSON.stringify('Senha alterada com sucesso!')); // quando a alteração for bem sucedida
        } else {
            res.send(JSON.stringify('Confirmação de senha não confere!')); // se a confirmação estiver errada
        }        
    }
});

app.post('/criarUsuario', async (req, res)=>{
    try {    
    if (req.body.confirmacao === null || req.body.nome === null || req.body.user === null || req.body.senha === null ) 
    {res.send(JSON.stringify('Nenhum campo pode ficar em branco!'));
        return false;}    
    if (req.body.nome.toString().length < 6 ){res.send(JSON.stringify('Nome inválido!'));
        return false;}   
    if( req.body.usuario.toString().length < 6 ){res.send(JSON.stringify('Usuário inválido!'));
        return false;}
    let response1 = await user.findOne({
        where:{usuario: req.body.usuario}
    });
    if (response1){res.send(JSON.stringify('Usuário já cadastrado!'));
        return false;}
    if( req.body.senha.toString().length < 6 ){res.send(JSON.stringify('Senha inválida!'));
        return false;
            } else {
            const criarUser = await user.create({
                nome: req.body.nome,
                usuario: req.body.usuario,
                senha: req.body.senha,
                confirmacao: req.body.confirmacao,
            });
            res.send(JSON.stringify('Usuário cadastrado com sucesso!'));
            }
    } catch {
    res.send(JSON.stringify('Preencha os campos corretamente!'))
    }    
});
//------------------------------EXCLUIR USUARIO----------------------------------
app.post('/excluirConta', async (req, res) => {
    const deletar = await user.destroy({
        where:{id: req.body.id}
    });
    deletar.save();
    res.json({deletar});
    //console.log(JSON.stringify(deletar));
});

//------------------------LANÇANDO REALIZADOS --------------------------------

app.post('/lancarRealizados', async (req, res) => {
    try {
        async function updateTime () {
            moment().locale();
            let now = moment();
            var relogio = now.format('HH:mm:ss');
            //console.log(relogio);
            try {
                if (relogio === '12:05:10') {
                const response = await atendimento.findOne({
                    where:{id:1}
                });
                if (response.cliente === null){
                    console.log('não deu')
                    return false;
                }
                if (response.cliente !== null){
                    const criarReal = await realizado.create({
                        data: response.data, 
                        hora: response.hora,
                        servico: response.servico,
                        cliente: response.cliente,
                        userId: response.userId
                    })
                    return false;
                }
                }
            
        } catch (e) {
            console.log('erro ao lançar realizados 1')
        }
    }
    setInterval(updateTime, 1000);
    updateTime();
} catch(e) {
    console.log('erro ao lançar realizados 2')
}
})

//------------------------PEGAR REALIZADOS --------------------------------

app.post('/pegarRealizados', async (req, res) => {
    try{
        const pegar = await realizado.findAll({
            where:{userId: req.body.id }
        });
        res.json({pegar})
    }catch (e) {
        res.json({e});
        console.log('erro ao pegar realizados');
    }
});


//------------------------APAGANDO RESERVAS -----------------------------
app.post('/apagarReserva', async (req, res)=> {
    try {

        
        const now = moment().add(5, 'hours')
        const relogio = parseInt(now.format('HH'));
        const pegarHora = parseInt((req.body.hora).slice(0,2))
            if (relogio > pegarHora){
                let response = await atendimento.findOne({
                    where:{hora: req.body.hora}
                });
                res.send(JSON.stringify('Você não pode apagar essa reserva!'));
                return false;
            }
                if (relogio < pegarHora){
                    let response1 = await atendimento.findOne({
                        where:{hora: req.body.hora}
                    });
                    response1.data=null;
                    response1.servico=null;
                    response1.cliente=null;
                    response1.userId=null;
                    response1.save();
                    res.send(JSON.stringify('Reserva cancelada com sucesso!'));
                    return false;}
        } catch(e) {
            console.log('Falha ao apagar reserva')
        }
});

//--------------------------HORAS RESERVADAS------------------------------------

app.post('/devolverHoras', async  (req, res) => {

    const pegarId = (req.body.id);
    try{
        const reserva = await atendimento.findAll({
            where:{userId: pegarId}
        });
        res.json({reserva})
    }catch (e) {
        res.json({e});
            console.log('erro na resposta devolver horas 1');
    }    
});
app.post('/devolverHoras2', async  (req, res) => {

    const pegarId = (req.body.id);
    try{
        const reserva2 = await atendimento2.findAll({
            where:{userId: pegarId}
        });
        res.json({reserva2})
    }catch (e) {
        res.json({e});
            console.log('erro na resposta devolver horas 1');
    }    
});

//-----------------------------------  CRIANDO ATENDIMENTO 1 --------------------------------------------
app.post('/criarAtendimento', async (req, res)=> {
    try {
        let response1 = await atendimento.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;
        }else {
        let response = await atendimento.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar')
    }
});

//--------------------CRIANDO ATENDIMENTO 2 -----------------------------
app.post('/criarAtendimento2', async (req, res)=> {
    try {
        let response1 = await atendimento2.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento2.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 2')
    }
});
//--------------------CRIANDO ATENDIMENTO 3 -----------------------------
app.post('/criarAtendimento3', async (req, res)=> {
    try {
        let response1 = await atendimento3.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento3.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 3')
    }
});
//--------------------CRIANDO ATENDIMENTO 4 -----------------------------
app.post('/criarAtendimento4', async (req, res)=> {
    try {
        let response1 = await atendimento4.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento4.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 4')
    }
});
//--------------------CRIANDO ATENDIMENTO 5 -----------------------------
app.post('/criarAtendimento5', async (req, res)=> {
    try {
        let response1 = await atendimento5.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento5.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 5')
    }
});
//--------------------CRIANDO ATENDIMENTO 6 -----------------------------
app.post('/criarAtendimento6', async (req, res)=> {
    try {
        let response1 = await atendimento6.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento6.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 6')
    }
});
//--------------------CRIANDO ATENDIMENTO 7 -----------------------------
app.post('/criarAtendimento7', async (req, res)=> {
    try {
        let response1 = await atendimento7.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento7.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 7')
    }
});
//--------------------CRIANDO ATENDIMENTO 8 -----------------------------
app.post('/criarAtendimento8', async (req, res)=> {
    try {
        let response1 = await atendimento8.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento8.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 8')
    }
});
//--------------------CRIANDO ATENDIMENTO 9 -----------------------------
app.post('/criarAtendimento9', async (req, res)=> {
    try {
        let response1 = await atendimento9.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento9.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 9')
    }
});
//--------------------CRIANDO ATENDIMENTO 10 -----------------------------
app.post('/criarAtendimento10', async (req, res)=> {
    try {
        let response1 = await atendimento10.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento10.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 10')
    }
});
//--------------------CRIANDO ATENDIMENTO 11 -----------------------------
app.post('/criarAtendimento11', async (req, res)=> {
    try {
        let response1 = await atendimento11.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento11.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 11')
    }
    
});
//--------------------CRIANDO ATENDIMENTO 12 -----------------------------
app.post('/criarAtendimento12', async (req, res)=> {
    try {
        let response1 = await atendimento12.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento12.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 12')
    }
});
//--------------------CRIANDO ATENDIMENTO 13 -----------------------------
app.post('/criarAtendimento13', async (req, res)=> {
    try {
        let response1 = await atendimento13.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento13.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 13')
    }
});
//--------------------CRIANDO ATENDIMENTO 14 -----------------------------
app.post('/criarAtendimento14', async (req, res)=> {
    try {
        let response1 = await atendimento14.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento14.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 14')
    }
});
//--------------------CRIANDO ATENDIMENTO 15 -----------------------------
app.post('/criarAtendimento15', async (req, res)=> {
    try {
        let response1 = await atendimento15.findOne({
        where:{hora: req.body.hora}
        });
        if (response1.cliente !== null){res.send(JSON.stringify('error'));
            console.log('Ja eras')
                return false;  
        }else {
        let response = await atendimento15.findOne({
            where:{hora: req.body.hora}
        });
            response.data=req.body.data;
            response.servico=req.body.servico;
            response.cliente=req.body.cliente;
            response.userId=req.body.userId;
            res.send(response);
            response.save();
        };
    } catch(e) {
        console.log('erro ao agendar 15')
    }
});

//------------------PEGANDO HORA PRO CLIENTE 1--------------------
app.get('/horaClient', async (req, res) => {
    try{
        const qualquer = await atendimento.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}     
    });
    res.json({qualquer});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora');
    }
});

//------------------PEGANDO HORA PRO CLIENTE 2--------------------
app.get('/horaClient2', async (req, res) => {
    try{
        const qualquer2 = await atendimento2.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer2});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 2');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 3--------------------
app.get('/horaClient3', async (req, res) => {
    try{
        const qualquer3 = await atendimento3.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer3});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 3');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 4--------------------
app.get('/horaClient4', async (req, res) => {
    try{
        const qualquer4 = await atendimento4.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer4});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 4');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 5--------------------
app.get('/horaClient5', async (req, res) => {
    try{
        const qualquer5 = await atendimento5.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer5});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 5');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 6--------------------
app.get('/horaClient6', async (req, res) => {
    try{
        const qualquer6 = await atendimento6.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer6});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 6');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 7--------------------
app.get('/horaClient7', async (req, res) => {
    try{
        const qualquer7 = await atendimento7.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer7});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 7');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 8--------------------
app.get('/horaClient8', async (req, res) => {
    try{
        const qualquer8 = await atendimento8.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}
    });
    res.json({qualquer8});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 8');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 9--------------------
app.get('/horaClient9', async (req, res) => {
    try{
        const qualquer9 = await atendimento9.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer9});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 9');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 10--------------------
app.get('/horaClient10', async (req, res) => {
    try{
        const qualquer10 = await atendimento10.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer10});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 10');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 11--------------------
app.get('/horaClient11', async (req, res) => {
    try{
        const qualquer11 = await atendimento11.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer11});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 11');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 12--------------------
app.get('/horaClient12', async (req, res) => {
    try{
        const qualquer12 = await atendimento12.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer12});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 12');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 13--------------------
app.get('/horaClient13', async (req, res) => {
    try{
        const qualquer13 = await atendimento13.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer13});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 13');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 14--------------------
app.get('/horaClient14', async (req, res) => {
    try{
        const qualquer14 = await atendimento14.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}       
    });
    res.json({qualquer14});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 14');
    }
});
//------------------PEGANDO HORA PRO CLIENTE 15--------------------
app.get('/horaClient15', async (req, res) => {
    try{
        const qualquer15 = await atendimento15.findAll({
        attributes: [`id`,`hora`],
        where:{cliente: null}
    });
    res.json({qualquer15});

    }catch (e) {
        res.json({e});
        console.log('erro ao setar hora 15');
    }
});

//-------------------------------exclusão automática de HORARIOS não reservados!--------------------------

app.post('/transferApagarHoras', async (res) => {
    try {
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                    if (relogio === '22:58:00') {
                        response = await atendimento.findOne({
                            where:{id:1, cliente: null}
                    });
                        moment().locale();
                        response.data= moment().format('DD/MM/YY');
                        response.servico= 'XXX-XXX';
                        response.cliente= 'XXX-XXX';
                        response.save();
                            return false;
                }
            } catch (e) {
                console.log('hora ja reservada 8')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 8')
    }
//--------------------------------------------------------------------------------------
    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '22:59:00') {
                    response = await atendimento.findOne({
                        where:{id:2, cliente: null}
                    });
                    moment().locale();
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX';
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 9')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 9')
    }
//-----------------------------------------------------------------------------------
    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '23:00:00') {
                    response = await atendimento.findOne({
                        where:{id:3, cliente: null}
                    });
                    moment().locale();
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX';
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 10')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 10')
    }
//--------------------------------------------------------------------------------------
    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:33:00') {
                    response = await atendimento.findOne({
                        where:{id:4, cliente: null}
                    });
                    moment().locale();
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX'
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 11')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 11')
    }
//---------------------------------------------------------------------------------
try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:34:00') {
                    response = await atendimento.findOne({
                        where:{id:5, cliente: null}
                    });
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX';
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 13')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 13')
    }
//--------------------------------------------------------------------------------------
    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:35:00') {
                    response = await atendimento.findOne({
                        where:{id:6, cliente: null}
                    });
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX'
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 14')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 14')
    }

    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:36:00') {
                    response = await atendimento.findOne({
                        where:{id:7, cliente: null}
                    });
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX';
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 15')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 15')
    }
//--------------------------------------------------------------------------------------
    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:37:00') {
                    response = await atendimento.findOne({
                        where:{id:8, cliente: null}
                    });
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX';
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 16')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 16')
    }

    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:38:00') {
                    response = await atendimento.findOne({
                        where:{id:9, cliente: null}
                    });
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX';
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 17')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 17')
    }
//--------------------------------------------------------------------------------------
    try {
        
            async function updateTime () {
                moment().locale();  
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:39:00') {
                    response = await atendimento.findOne({
                        where:{id:10, cliente: null}
                    });
                    response.data= moment().format('DD/MM/YY');
                    response.servico= 'XXX-XXX';
                    response.cliente= 'XXX-XXX'
                    response.save();
                    return false;
                }
            } catch (e) {
                console.log('hora ja reservada 18')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 18')
    }
//--------------------------------------------------------------------------------------
    try {
            
            async function updateTime () {
                moment().locale();
                let now = moment();
                var relogio = now.format('HH:mm:ss');
                //console.log(relogio);
                try {
                if (relogio === '18:40:00') {
                    response = await atendimento.findOne({
                        where:{id:11, cliente: null}
                    });
                        response.data= moment().format('DD/MM/YY');
                        response.servico= 'XXX-XXX';
                        response.cliente= 'XXX-XXX'
                        response.save();
                        return false;
                }
            } catch (e) {
                console.log('hora ja reservada 19')
            }
        }
        setInterval(updateTime, 1000);
        updateTime();
    } catch(e) {
        console.log('erro ao substituir as 19')
    }

});
//----------------------------------fim da requisição--------------------------------------|

//-----------------------------------------------------------------------------------------|
//------------------------------CONTROLLER ADMINISTRADOR-----------------------------------|
//-----------------------------------------------------------------------------------------|







//---------------------------------TRANFERENCIA DE DIAS------------------------------------|

app.post('/transferRelogio', async (req, res) => {
    
    try{
        
    let hoje = moment()

    if (hoje.day() != 0) {
    //-----------------------------SETANDO RELOGIO--------------------------------
    moment().locale();    
    function updateTime () {     
        const now = moment();
        const relogio2 = now.format('HH:mm:ss');
        //console.log(relogio);
        
//-----------------------TRANSFERENCIA DE TABELAS------------------------------

        if ( relogio2 === '01:18:05') {
            const apagar = sequelize.query(
                `TRUNCATE table atendimentos`, {type: QueryTypes.INSERT}
            );
            return false;
        }
        if ( relogio2 === '01:18:15') {
            const transfer = sequelize.query(                  
                `INSERT INTO atendimentos (id, data, hora, servico, cliente, userId, createdAt, updatedAt)
                SELECT id, data, hora, servico, cliente, userId, createdAt, updatedAt
                FROM atendimento2s `, {type: QueryTypes.INSERT}
            );
            return false;
        }
    }
    setInterval(updateTime, 1000);
    updateTime();
    }

    } catch (e) {
        res.json({e});
        console.log("Error Relogio Transfer Requisição");
    }
    
});
//------------------------------determinando a porta----------------------------

let port = process.env.PORT || 3000;
    app.listen(port,(req, res)=>{
        console.log('servidor rodando');
});

{/*

REQS ANINHADAS

app.post('/devolverHoras', async  (req, res) => {

    const pegarId = (req.body.id);

    try{
        const devolver = await atendimento.findAll({
        where:{userId: pegarId}
    });
    res.json({devolver})

    }catch (e) {
        res.json({e});
            console.log('erro na resposta devolver horas 1');
    }

    app.get('/devolverHoras', async (res) => {
        try{
            const devolver = await atendimento.findAll({
            where:{userId: pegarId}
        });
        res.json({devolver})
    
        }catch (e) {
            res.json({e});
                console.log('erro na resposta devolver horas 2');
        }

    })
})

//--------------------------REQUISIÇÃO EXCLUIR HORAS COM DATE () ----------
var data = new Date()
        var hora = data.getHours()
        var min = data.getMinutes()

//------------------------EXCLUSÃO DE HORAS NÃO RESERVADAS-------------------------
        const apagarAs8 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:1, cliente:null}
        });
        if (apagarAs8 && hora === 16 && min === 17) {
            apagarAs8.cliente= 'XXX-XXX';
            apagarAs8.data = '00/00/0000';
            apagarAs8.servico = 'XXX-XXX';
            apagarAs8.save();
            
        };
        const apagarAs9 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:2, cliente:null}
        });
        if (apagarAs9 && hora === 16 && min === 18) {
            apagarAs9.cliente= 'XXX-XXX';
            apagarAs9.data = '00/00/0000';
            apagarAs9.servico = 'XXX-XXX';
            apagarAs9.save();
                
        };
        const apagarAs10 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:3, cliente:null}
        });
        if (apagarAs10 && hora === 16 && min === 19) {
            apagarAs10.cliente= 'XXX-XXX';
            apagarAs10.data = '00/00/0000';
            apagarAs10.servico = 'XXX-XXX';
            apagarAs10.save();
                
        };
        const apagarAs11 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:4, cliente:null}
        });
        if (apagarAs11 && hora === 6 && min === 35) {
            apagarAs11.cliente= 'XXX-XXX';
            apagarAs11.data = '00/00/0000';
            apagarAs11.servico = 'XXX-XXX';
            apagarAs11.save();
                
        };
        const apagarAs13 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:5, cliente:null}
        });
        if (apagarAs13 && hora === 6 && min === 36) {
            apagarAs13.cliente= 'XXX-XXX';
            apagarAs13.data = '00/00/0000';
            apagarAs13.servico = 'XXX-XXX';
            apagarAs13.save();
                
        };
        const apagarAs14 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:6, cliente:null}
        });
        if (apagarAs14 && hora === 6 && min === 37) {
            apagarAs14.cliente= 'XXX-XXX';
            apagarAs14.data = '00/00/0000';
            apagarAs14.servico = 'XXX-XXX';
            apagarAs14.save();
                
        };
        
        const apagarAs15 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:7, cliente:null}
        });
        if (apagarAs15 && hora === 6 && min === 38) {
            apagarAs15.cliente= 'XXX-XXX';
            apagarAs15.data = '00/00/0000';
            apagarAs15.servico = 'XXX-XXX';
            apagarAs15.save();
               
        };
        const apagarAs16 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:8, cliente:null}
        });
        if (apagarAs16 && hora === 6 && min === 39) {
            apagarAs16.cliente= 'XXX-XXX';
            apagarAs16.data = '00/00/0000';
            apagarAs16.servico = 'XXX-XXX';
            apagarAs16.save();
                
        };
        const apagarAs17 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:9, cliente:null}
        });
        if (apagarAs17 && hora === 6 && min === 40) {
            apagarAs17.cliente= 'XXX-XXX';
            apagarAs17.data = '00/00/0000';
            apagarAs17.servico = 'XXX-XXX';
            apagarAs17.save();
                
        };
        const apagarAs18 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:10, cliente:null}
        });
        if (apagarAs18 && hora === 6 && min === 41) {
            apagarAs18.cliente= 'XXX-XXX';
            apagarAs18.data = '00/00/0000';
            apagarAs18.servico = 'XXX-XXX';
            apagarAs18.save();
                
        };
        const apagarAs19 =  atendimento.findOne({
            attributes:[`id`, `cliente`],
            where:{id:11, cliente:null}
        });
        if (apagarAs19 && hora === 6 && min === 42) {
            apagarAs19.cliente= 'XXX-XXX';
            apagarAs19.data = '00/00/0000';
            apagarAs19.servico = 'XXX-XXX';
            apagarAs19.save();
                
        };


    } catch (e) {
        res.json({e});
        console.log("Error Relogio Apagar Horas Requisição");    }
});

-----------------------------SETANDO RELOGIO--------------------------------
        moment().locale();    
        function updateTime () {     
            const now = moment();
            const relogio = now.format('HH:mm:ss');
            //console.log(relogio);
        }
        setInterval(updateTime, 1000);
        updateTime();
------------------------------------------------------------------------------

setTimeout(function() {
  
}, time - Date.now());

---------------- CHAMADA UseEffect RELOGIO HORAS--------------------------------


    useEffect(() => {
        fetch(config.urlRoot+'transferApagarHoras', {
            method: 'POST'
        }).then(response => response.json())
            .then(response => {
        setRelogio(response.relogio)
        })
        .catch(function (error) {
            console.log("Error Relogio Transfer");
            // ADD THIS THROW error pra parar de dar erro de network
            throw error;
        })
    },[]);


---------------- CHAMADA UseEffect RELOGIO DATAS--------------------------------

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
    -------------------------------------------------------------------------

    ------------------------------------------------------------------------
    if (req.body.usuario === null ||
        req.body.nome === null ||
        req.body.senha === null ||
        req.body.confSenha == null){
        res.send(JSON.stringify('Dados Inválidos!')); // se for deixado em branco
    } else {
        if(req.body.senha !== req.body.confSenha){            
            res.send(JSON.stringify('Confirmação não confere!')); // quando o cadastro for bem sucedido   
        } else {
            res.send(JSON.stringify('Usuário cadastrado com sucesso!')); // se a confirmação de senha estiver errada
                    
        }        
    }

app.get('/create', async (req, res)=>{
    let create = await user.create({
        usuario: 'Simone',
        senha:'789',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Usuário Adicionado com sucesso!!!');
});

CRUD

});

CREATE
app.get('/create', async (req,res) => {
    let create = await user.create({
        usuario: "Jane",
        senha: "171",
        createdAt: new Date(),
        updatedAt: new Date()
     });
     res.send('Usuario Criado com sucesso')
------------------------------------------------------------------------------------------------------------

READ
app.get('/read', async (req,res) => {
    let read = await user.findAll({
        raw:true
    });
    console.log(read);
});
--------------------------------------------------------------------------------------------------------
UPDATE1
app.get('/update', async (req,res) => {
    let update = await user.findByPk(1).then((response) => {
        response.usuario = 'Cristiano';
        response.senha = 'cr81';
        response.save();
    });
});
-------------------------------------------------------------------------------------------------------
UPDATE2
app.get('/update', async (req,res) => {
    let update = await user.findByPk(1,
        {include:[{all:true}]}
    ).then((response)=> {
        console.log(response.Atendimentos[0]);

    });
});
------------------------------------------------------------------------------------------------------
UPDATE3
app.get('/update', async (req,res) => {
    let update = await user.findByPk(1,
        {include:[{all:true}]}
    ).then((response)=> {
        response.Atendimentos[0].hora='19:00:00' //ALTERANDO HORA=Campo da tabela ATENDIMENTOS;
        response.Atendimentos[0].save();

    });
});
------------------------------------------------------------------------------------------------------
DELETE

app.get('/delete', async (req,res) => {
    user.destroy({   
    where:{id:4}   //DESTRUIR  USUARIO DO ID 4
    });    
});

/*
    var salvar = [];
    var realizados2 = (JSON.stringify(devolver));
    salvar.push(realizados2);
    var realizados = (JSON.parse(salvar));


/*app.post('/lancarRealizados', async (req, res) => {

    const pegarId = (req.body.id);
    try{
        const devolver = await atendimento.findAll({
        where:{userId: pegarId}
    });

    var realizados = [JSON.parse(fs.readFileSync('./realizados.json', {encoding: 'utf-8'}))];
    var realizados2 = fs.writeFileSync('./realizados.json',(JSON.stringify(devolver)), {encoding :'utf-8'});
    //console.log({devolver})
    res.json({realizados});
    
    }catch (e) {
        res.json({e});
            console.log('erro na resposta realizados');
    }
});


/*
    const crud = {
    realizados : [],
        pegar() {
            crud.realizados = JSON.parse(fs.readFileSync('./realizados.json', {encoding: 'utf-8'}))
            return crud.realizados
        },
        criar ({devolver}) {
            const dados = {devolver};
            crud.realizados.push(dados);
            console.log(crud.realizados)
                fs.writeFileSync('./realizados.json', JSON.stringify(crud.realizados), {encoding :'utf-8'});
        }
    }
    crud.criar({devolver});
    crud.pegar();

    res.json({realizados});
    
    console.log(realizados);
    console.log({devolver});
    

*/}