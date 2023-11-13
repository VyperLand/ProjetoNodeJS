import { atualizaDocumento, encontratDocumento, excluirDocumento } from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosDocumento, removerConexao } from "../utils/conexoesDocumentos.js";

function registrarEventosDocumento(socket, io){

    socket.on("selected_Document", async (dados,callback)=>{
        const dc = await encontratDocumento(dados.nomeDocumento);

        if(dc){
            const conexaoEncontrada = encontrarConexao(dados.nomeDocumento, dados.nomeUsuario);

            if(!conexaoEncontrada){
                socket.join(dados.nomeDocumento);

                adicionarConexao({nomeDocumento: dados.nomeDocumento, nomeUsuario: dados.nomeUsuario});

                socket.data = {usuarioEntrou: true}

                const usuariosDocumento = obterUsuariosDocumento(dados.nomeDocumento);
                io.to(dados.nomeDocumento).emit("usuarios_no_documento", usuariosDocumento);

                callback(dc.texto);
            }else{
                socket.emit("usuario_ja_no_documento");
            }

        }

        socket.on("disconnect", ()=>{
            if(socket.data.usuarioEntrou){
                const usuariosDocumentosAtualizado = removerConexao(dados.nomeDocumento,dados.nomeUsuario);
                io.to(dados.nomeDocumento).emit("usuarios_no_documento", usuariosDocumentosAtualizado);
            }
        });
    });

    socket.on('textChange', async (texto, sala) =>{
        var att = await atualizaDocumento(sala, texto);

        if(att.modifiedCount){
            socket.to(sala).emit('newText', texto);
        }
        

        
    });

    socket.on("excluir_documento", async (nomeDocumento)=>{
        const resultado = await excluirDocumento(nomeDocumento);
        if(resultado.deletedCount){
            io.emit("documento_excluido", nomeDocumento);
        }

    });


    // const eventosRegistrados = socket.eventNames();
    // console.log('Eventos registrados:', eventosRegistrados);
    
}

export default registrarEventosDocumento