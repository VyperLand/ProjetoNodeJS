import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://ppamarcos:JNXx86pJtRFFlwua@cluster0.kqpwann.mongodb.net/?retryWrites=true&w=majority");

let documentosColecao;
let usuariosColecao;

try {
    await client.connect();

    const db = client.db("websockets");
    documentosColecao = db.collection("documentos");
    usuariosColecao = db.collection("usuarios");

    console.log("Conectado ao BD com sucesso");
} catch (error) {
    console.log(error);
}

export { documentosColecao, usuariosColecao };
