import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizaTextoEditor, atualizarUsuariosDocumento, tratarAutorizacaoSucesso } from "./documento.js";

const socket = io("/usuarios",{
    auth: {
        token: obterCookie("jwt")
    }
});

socket.on("connect_error", (error)=>{
    alert(error);
    window.location.href = "/login";
});

socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso);

function selectDocument(dadosEntrada){
    socket.emit("selected_Document", dadosEntrada,  (response)=>{
        atualizaTextoEditor(response);
    });
}

function emitirTexto(valor, documento){
    socket.emit('textChange',valor, documento);
}

socket.on('newText', (newText)=>{
    atualizaTextoEditor(newText);
});

function excluirDocumento(nomeDocumento){
    socket.emit("excluir_documento", nomeDocumento);
}

socket.on("documento_excluido", (nomeDocumento)=>{
    alertarERedirecionar(nomeDocumento);
});

socket.on("usuarios_no_documento", (usuariosDocumento)=>{
    console.log("oi");
    console.log(usuariosDocumento);
    atualizarUsuariosDocumento(usuariosDocumento)
});

socket.on("usuario_ja_no_documento", ()=>{
    alert("Você já esta com o documento aberto em outro local");
    window.location.href = "/";
});

export {emitirTexto, selectDocument, excluirDocumento};