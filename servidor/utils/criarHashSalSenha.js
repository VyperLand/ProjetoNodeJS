import {randomBytes, scryptSync} from 'crypto';

export default function criarHashSalSenha(pass){
    const salSenha = randomBytes(16).toString("hex");
    const hashSenha = scryptSync(pass, salSenha, 64).toString("hex");

    return {salSenha, hashSenha};
}