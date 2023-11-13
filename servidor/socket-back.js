import 'dotenv/config';

import registrarEventosCadastro from "./registrarEventos/eventosCadastro.js";
import registrarEventosDocumento from "./registrarEventos/eventosDocumento.js";
import registrarEventosInicio from "./registrarEventos/eventosInicio.js";
import registrarEventosLogin from "./registrarEventos/eventosLogin.js";
import io from "./server.js";
import autorizarAcesso from './middlewares/autorizarAcesso.js';

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarAcesso);

nspUsuarios.on("connection", (socket)=>{
    registrarEventosInicio(socket, nspUsuarios);
    registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on('connection', (socket)=>{
    

    socket.on("disconnect", (motivo) => {
        // console.log(`Cliente "${socket.id}" desconectado!
        // Motivo: ${motivo}`);
    });

    
    registrarEventosCadastro(socket, io);
    registrarEventosLogin(socket, io);
});