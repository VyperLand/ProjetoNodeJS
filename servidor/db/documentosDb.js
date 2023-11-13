
import { documentosColecao } from "./dbConnect.js";

function encontratDocumento(documento){
    const doc = documentosColecao.findOne({
        nome: documento
    });
    return doc;
}

function atualizaDocumento(nomeDocumento, texto){
    const atualizacao = documentosColecao.updateOne({
        nome: nomeDocumento
    },
    {
        $set: {
            texto: texto
        }
    }
    );

    return atualizacao;
}

function obterDocumentos(){
    const documentos = documentosColecao.find().toArray();

    return documentos;
}

function adicionarDocumento(nomeDocumento){
    const resultado = documentosColecao.insertOne({
        nome: nomeDocumento,
        texto: ""
    });

    return resultado;
}

function excluirDocumento(nomeDocumento){
    const resultado = documentosColecao.deleteOne({
        nome: nomeDocumento
    });

    return resultado;
}

export { encontratDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };