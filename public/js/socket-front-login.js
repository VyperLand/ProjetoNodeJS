import { definirCookie } from "../utils/cookies.js";

const socket = io();

function authUsuario(dados){
    socket.emit("auth_usuario", dados);
}

socket.on("atenticacao_sucesso", (tokenJwt)=>{
    definirCookie("jwt",tokenJwt);
    alert("Logado com sucesso");
    window.location.href = "/";
});

socket.on("atenticacao_erro", ()=>{
    alert("Erro ao autenticar");
});

socket.on("autenticacao_usuario_inexistente", ()=>{
    alert("Usuario não encontrado");
});

export  {authUsuario}