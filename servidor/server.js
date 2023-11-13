import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import "./db/dbConnect.js";

const app = express();
const port = process.env.porta || 3001;


const caminhoAPP = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAPP, "../..", "public");

app.use(express.static(diretorioPublico));


const servidorHttp = http.createServer(app);

servidorHttp.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
});


const io = new Server(servidorHttp);

export default io;