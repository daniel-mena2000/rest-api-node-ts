import { Request, Response } from "express"
import Product from "../models/Product.model"


export const getProducts = async(req: Request, res: Response) => {
    try {
//indicamos que obtenemos todos los elementos de "Product"
        const products = await Product.findAll({
//Excluir elementos
            attributes: {exclude: ["createdAt", "updatedAt"]}
        })
        res.json({data: products})
    } catch (error) {
        console.log(error);

    }
}

export const getProductsById = async(req: Request, res: Response) => {
    try {
//Recordar que los params de la URL con string y product espera un numero por eso lo convertimos
       const id = Number(req.params.id)
//findByPk es un método de Sequelize que sirve para buscar un registro por su clave primaria (Primary Key).
//Entonces verifica si el id de los parametros de la URL coincide con la clave primaria de la base de datos
       const product = await Product.findByPk(id)
//Verificamos que el Primary Key - id de exista en nuestra base de datos
       if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            })
       }
            res.json({data: product})


    } catch (error) {
        console.log(error);

    }
}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {
        console.log(error);

    }

}


export const updateProduct = async (req: Request , res: Response) => {
         const id = Number(req.params.id)
       const product = await Product.findByPk(id)
       if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            })
       }
//importante agregar "update" para que solo actualice algun campo en especifico, como ejemplo solo "name", sin update actualizara la tabla pero la reescribira solo con ese campo y borrara lo demas, este update nos protege, ademas de las validaciones en el router, pero para actualizar un solo campo sin riesgo usamos PATCH y put nos sirve en este caso para actualizar todos los campos
         await product.update(req.body)
         await product.save()


            res.json({data: product})
}

//PATCH se usa para modificar partes de un recurso, en este caso hicimos una funcion que solo actualice: availability

export const updateAvailability = async (req: Request, res: Response) => {
       const id = Number(req.params.id)
       const product = await Product.findByPk(id)
       if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            })
       }

       product.availability = req.body.availability
       await product.save()

        res.json({data: product})

}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
       const product = await Product.findByPk(id)
       if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            })
       }

       await product.destroy()
       res.json({data: 'Producto ELIMINADO'})
}
