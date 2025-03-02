import { Request, Response, NextFunction } from "express";

//Validaciones basicas para la creacion de un producto.
export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
  const { name, description, price } = req.body;

  if (!name || typeof name !== "string" || name.length < 3) {
    res.status(400).json({ message: "El nombre del producto es obligatorio y debe tener al menos 3 caracteres." });
    return;
  }

  if (!description || typeof description !== "string" || description.length < 10) {
    res.status(400).json({ message: "La descripción es obligatoria y debe tener al menos 10 caracteres." });
    return;
  }

  if (!price || typeof price !== "number" || price <= 0) {
    res.status(400).json({ message: "El precio debe ser un número mayor a 0." });
    return;
  }

  next();
};
