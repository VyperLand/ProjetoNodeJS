import jwt from 'jsonwebtoken';

export default function autorizarAcesso(socket, next){

    const tokenJwt = socket.handshake.auth.token

    try {
        const payloadToken = jwt.verify(tokenJwt, process.env.CHAVE_SECRETA_JWT);

        socket.emit("autorizacao_sucesso", payloadToken);

        next();
    } catch (error) {
        next(error);
    }
}