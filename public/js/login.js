import { authUsuario } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();


    const user = form["input-usuario"].value;
    const pass = form["input-senha"].value;

    authUsuario({user, pass});

});