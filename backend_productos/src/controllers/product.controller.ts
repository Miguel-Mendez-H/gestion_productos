import { Request, Response } from "express";
import Product from "../models/product";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    await product.destroy();
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
