import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middlewares/validation";


const router = Router();


router.get("/", getProducts);

//Este get es para obtener un producto en especifico por medio de su ID, y su validacion de que sea un numero
router.get("/:id",
        param('id').isInt().withMessage('ID no valido'),
        handleInputErrors
    , getProductsById);


router.post('/',
      [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("price").isNumeric().withMessage("El precio debe ser número"),
    body("price").notEmpty().withMessage("El precio es obligatorio"),
//Creamos una validacion llamado "custom" para validar que el valor sea positivo
    body("price").custom(value => value > 0).withMessage("Precio no valido"),
    body("availability").optional().isBoolean().withMessage("Debe ser booleano")
    ],
//Si todo esta bien en "handleInputErrors" se pasa a "createProduct" importante colocar "next()" en el midlaware para que realmente se pase a "createProduct"
      handleInputErrors,
    createProduct
)

router.put('/:id',
     [
    param('id').isInt().withMessage('ID no valido'),

    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("price").isNumeric().withMessage("El precio debe ser número"),
    body("price").notEmpty().withMessage("El precio es obligatorio"),
//Creamos una validacion llamado "custom" para validar que el valor sea positivo
    body("price").custom(value => value > 0).withMessage("Precio no valido"),
    body("availability").isBoolean().withMessage("Debe ser booleano")
    ],
    handleInputErrors,
     updateProduct )

export default router;


router.patch('/:id',[
    param('id').isInt().withMessage('ID no valido'),
],
handleInputErrors,
    updateAvailability)


router.delete('/:id',
    [
    param('id').isInt().withMessage('ID no valido'),
],
handleInputErrors,
     deleteProduct)
