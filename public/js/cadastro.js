import { cadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();


    const user = form["input-usuario"].value;
    const pass = form["input-senha"].value;
    
    cadastrarUsuario({user, pass});

})