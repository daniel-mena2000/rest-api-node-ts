
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        servers: [
      {
        url: 'http://localhost:3000',
      }],
        info: {
            title: 'API Productos',
            version: '1.0.0',
            description: 'API para gestión de productos'
        }
    },
      apis: ['./src/router.ts'] // apis: donde estan los edpoints que quiero documentar
}
export const swaggerSpec = swaggerJSDoc(swaggerOptions)
