import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error en la API:", err);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
};
