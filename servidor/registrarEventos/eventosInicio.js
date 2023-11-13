import { adicionarDocumento, encontratDocumento, obterDocumentos } from "../db/documentosDb.js";

function registrarEventosInicio(socket, io){
    socket.on("obter_documentos", async (callback)=>{
        const documentos = await obterDocumentos();
        callback(documentos);
    });

    socket.on("adicionar_documento", async (nomeDocumento)=>{

        const documentoExiste = (await encontratDocumento(nomeDocumento)) !== null;

        if(documentoExiste){
            socket.emit("documento_existente", `O documento ${nomeDocumento} ja existe.`);
        }else{
            const resultado = await adicionarDocumento(nomeDocumento);

            if(resultado.acknowledged){
                io.emit("adicionar_documento_interface", nomeDocumento);
            }
        }
        
    });
}

export default registrarEventosInicio