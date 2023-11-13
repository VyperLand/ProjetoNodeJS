import criarHashSalSenha from "../utils/criarHashSalSenha.js";
import { usuariosColecao } from "./dbConnect.js"

function cadastrarUsuarios({user, pass}){
    const {hashSenha, salSenha} = criarHashSalSenha(pass);

    //return usuariosColecao.insertOne({user, pass})
    return usuariosColecao.insertOne({user, hashSenha, salSenha});
}

function encontrarUsuario(user){
    return usuariosColecao.findOne({
        user
    });
}

export {cadastrarUsuarios, encontrarUsuario}