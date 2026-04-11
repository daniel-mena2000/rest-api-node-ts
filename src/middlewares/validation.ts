import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express"

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
//400 cuando envias un req incorrecto, y los errores los pasamos a array
        return res.status(400).json({ errors: errors.array() })
    }
//"next" practicamente lo que dice es, "Ya termine vete a la siguiente funcion"
    next()
}
