import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { validateProduct } from "../middlewares/validateProduct";

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 */
router.get("/", getProducts);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop Gamer"
 *               description:
 *                 type: string
 *                 example: "Laptop con tarjeta gráfica RTX 3060"
 *               price:
 *                 type: number
 *                 example: 4500000
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", validateProduct, createProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       404:
 *         description: Producto no encontrado.
 */
router.delete("/:id", deleteProduct);

export default router;
