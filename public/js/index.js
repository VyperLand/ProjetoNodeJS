import { obterCookie, removerCookie } from "../utils/cookies.js";
import { adicionarDocumento } from "./socket-front-index.js";

const tokenJwt = obterCookie("jwt");

console.log(tokenJwt);

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");
const btnLogOut = document.getElementById("botao-logout");


btnLogOut.addEventListener("click", ()=>{
    removerCookie("jwt");
    alert("Usuario deslogado");
    window.location.href = "/login";
});

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    adicionarDocumento(inputDocumento.value);
    inputDocumento.value = "";
})

function insertLinkDocument(nome){
    listaDocumentos.innerHTML += `<a href="/documento/index.html?nome=${nome}" class="list-group-item list-group-item-action" id="documento-${nome}">${nome}</a>`;
}

function removerLinkDocumento(nomeDocumento){
    const documento = document.getElementById(`documento-${nomeDocumento}`);

    listaDocumentos.removeChild(documento);
}

export {insertLinkDocument, removerLinkDocumento};
