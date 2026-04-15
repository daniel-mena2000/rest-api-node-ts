import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./controllers/product.controller";
import { handleInputErrors } from "./middlewares/validation";


const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del producto
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del Producto
 *           example: Monitor Curvo de 49 Pulgadas
 *         price:
 *           type: number
 *           description: El precio del producto
 *           example: 300
 *         availability:
 *           type: boolean
 *           description: Disponibilidad del producto
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   sumary: Get a lista de productos
 *   tags: [Products]
 *   description: Devolver una lista de productos
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *       aplication/json:
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get un producto por su ID
 *      tags: [Products]
 *      description: Devuelve un producto en función de su ID único.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a recuperar
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *            description: Successful response
 *            content:
 *               aplication/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *          400:
 *              description: Not found
 *          401:
 *              description: Bad Request - Invalid ID
 */


//Este get es para obtener un producto en especifico por medio de su ID, y su validacion de que sea un numero
router.get("/:id",
        param('id').isInt().withMessage('ID no valido'),
        handleInputErrors
    , getProductsById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     description: Registra un producto en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Monitor curvo 32 pulgadas
 *               price:
 *                 type: number
 *                 example: 399
 *     responses:
 *       201:
 *         description: Producto agregado correctamente
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *       400:
 *          description: Bad Request - Invalid input data
 */


router.post('/',
      [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("price").isNumeric().withMessage("El precio debe ser número"),
    body("price").notEmpty().withMessage("El precio es obligatorio"),
    body("price").custom(value => value > 0).withMessage("Precio no valido"),
    body("availability").optional().isBoolean().withMessage("Debe ser booleano")
    ],
      handleInputErrors,
      createProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Products]
 *     description: Actualiza un producto y devuelve el resultado
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Monitor curvo 32 pulgadas
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 */



router.put('/:id',
     [
    param('id').isInt().withMessage('ID no valido'),

    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("price").isNumeric().withMessage("El precio debe ser número"),
    body("price").notEmpty().withMessage("El precio es obligatorio"),
    body("price").custom(value => value > 0).withMessage("Precio no valido"),
    body("availability").isBoolean().withMessage("Debe ser booleano")
    ],
    handleInputErrors,
     updateProduct )

export default router;


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Actualizar availability de un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Availability actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid input data
 *       404:
 *         description: Producto no encontrado
 */

router.patch('/:id',[
    param('id').isInt().withMessage('ID no valido'),
],
handleInputErrors,
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Producto ELIMINADO
 *       400:
 *         description: ID no válido
 *       404:
 *         description: Producto no encontrado
 */

router.delete('/:id',
    [
    param('id').isInt().withMessage('ID no valido'),
],
handleInputErrors,
     deleteProduct)
