import { emitirTexto, excluirDocumento, selectDocument } from "./socket-front-documento.js";

const params = new URLSearchParams(window.location.search);
const nomeDocumento = params.get("nome");

const textoEditor = document.getElementById("editor-texto");

const btExcluirDocumento = document.getElementById("excluir-documento");

const listaUsuariosConectados = document.getElementById("usuarios-conectados");

document.getElementById("titulo-documento").textContent = nomeDocumento || "Documento sem título";



function tratarAutorizacaoSucesso (payloadToken){
    selectDocument({nomeDocumento, nomeUsuario: payloadToken.nomeUsuario});
}

textoEditor.addEventListener('keyup', ()=>{
    emitirTexto(textoEditor.value, nomeDocumento);
});

function atualizaTextoEditor(texto){
    textoEditor.value = texto;
}

function alertarERedirecionar(nome){
    if(nomeDocumento === nome){
        alert(`Documento ${nome} foi excluido`);
        window.location.href = "/";
    }
    
}

function atualizarUsuariosDocumento (usuariosDocumento){
    listaUsuariosConectados.innerHTML = "";

    usuariosDocumento.forEach(element => {
        listaUsuariosConectados.innerHTML += `<li class="list-group-item">${element}</li>`
    });
}

btExcluirDocumento.addEventListener("click", ()=>{excluirDocumento(nomeDocumento)});

export {atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarUsuariosDocumento};