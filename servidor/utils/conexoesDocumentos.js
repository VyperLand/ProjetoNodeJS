const conexoesDocumentos = [];

function encontrarConexao(nomeDocumento, nomeUsuario){
    const indice = conexoesDocumentos.findIndex(conexao => conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario);
    return indice != -1 ? true : false;
}

function adicionarConexao(conexao){
    conexoesDocumentos.push(conexao);
}

function removerConexao(nomeDocumento, nomeUsuario){
    const indice = conexoesDocumentos.findIndex(conexao => conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario);
    if(indice != -1){
        conexoesDocumentos.splice(indice,1);
    }
    return conexoesDocumentos.filter(x => x.nomeDocumento === nomeDocumento).map((conexao)=> conexao.nomeUsuario);;
}

function obterUsuariosDocumento(documento){
    return conexoesDocumentos.filter(x => x.nomeDocumento === documento).map((conexao)=> conexao.nomeUsuario);
}

export {adicionarConexao, removerConexao, obterUsuariosDocumento, encontrarConexao};