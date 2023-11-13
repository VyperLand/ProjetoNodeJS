import jwt from "jsonwebtoken";

export default function gerarJwt(payload){
    const tokenJwt = jwt.sign(payload, process.env.CHAVE_SECRETA_JWT, {expiresIn: "1h"});

    return tokenJwt;
}