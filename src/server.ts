import express from "express";
import router from "./router";
import colors from "colors";
import db from "./config/db";

//conectar a base de datos
//Esperamos con await a que se conecte a la base de datos antes de iniciar el servidor
//db.authenticate() devuelve una promesa, por lo que podemos usar await para esperar a que se resuelva
//db.sync() sincroniza el modelo con la base de datos, creando las tablas si no existen
async function connectBD() {
    try {
        await db.authenticate();
        await db.sync();
        console.log(colors.bgGreen.black('Conexión a la BD exitosa 👍'));
    } catch (error) {
        console.log(error);

        console.log(colors.red.black('Hubo un error al conectar a la BD'));

    }
}

connectBD();

const server = express()

//Leer datos de formularios
server.use(express.json());


server.use('/api/products', router);



export default server;
