const socket = io();

function cadastrarUsuario(dados){
    socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", ()=>{
    alert("Cadastro efetuado com sucesso");
});
socket.on("cadastro_erro", ()=>{
    alert("Erro ao cadastrar");
});
socket.on("cadastro_usuario_existente",()=>{
    alert("Usuario já cadastrado");
})

export  {cadastrarUsuario}