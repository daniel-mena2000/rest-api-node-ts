import express from "express";
import router from "./router";
import colors from "colors";
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import db from "./config/db";


async function connectBD() {
    try {
        await db.authenticate();
        await db.sync();
    } catch (error) {
        console.log(error);

        console.log(colors.red.black('Hubo un error al conectar a la BD'));

    }
}

connectBD();

const server = express()

server.use(express.json());

server.use('/api/products', router);

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;
