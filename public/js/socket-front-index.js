import { obterCookie } from "../utils/cookies.js";
import { insertLinkDocument, removerLinkDocumento } from "./index.js";

const socket = io("/usuarios",{
    auth: {
        token: obterCookie("jwt")
    }
});


socket.on("connect_error", (error)=>{
    alert(error);
    window.location.href = "/login";
});

socket.emit("obter_documentos", (response)=>{
    response.forEach(doc => {
        insertLinkDocument(doc.nome);
    });
});

function adicionarDocumento(nomeDocumento){
    socket.emit("adicionar_documento", nomeDocumento);
}

socket.on("adicionar_documento_interface", (nomeDocumento)=>{
    insertLinkDocument(nomeDocumento);
});

socket.on("documento_existente",(msg)=>{
    alert(msg);
});

socket.on("documento_excluido", (nomeDocumento)=>{
    removerLinkDocumento(nomeDocumento);
});

export {adicionarDocumento};