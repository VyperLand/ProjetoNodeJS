import {scryptSync, timingSafeEqual} from 'crypto';

export default function autenticarUsuario(pass, usuario){
    const hashTeste = scryptSync(pass, usuario.salSenha, 64);

    const hashOriginal = Buffer.from(usuario.hashSenha, "hex");
    const autenticado = timingSafeEqual(hashTeste, hashOriginal);

    return autenticado;
}