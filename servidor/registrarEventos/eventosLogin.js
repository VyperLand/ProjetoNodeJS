import { encontrarUsuario } from "../db/usuariosDb.js"
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

export default function registrarEventosLogin(socket, io){
    socket.on("auth_usuario", async (dados)=>{
        const usuario = await encontrarUsuario(dados.user);
        

        if(usuario !== null){
            const usuarioAutenticado = autenticarUsuario(dados.pass, usuario);
            
            if(usuarioAutenticado){

                const tokenJwt = gerarJwt({nomeUsuario: dados.user});

                socket.emit("atenticacao_sucesso", tokenJwt);
            }else{
                socket.emit("atenticacao_erro");
            }
        }else{
            socket.emit("autenticacao_usuario_inexistente");
        }

    });
}