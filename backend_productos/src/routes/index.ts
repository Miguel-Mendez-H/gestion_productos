//creamos index para las rutas
import { Router } from "express";
import productRoutes from "./product.routes";

const router = Router();

router.use("/products", productRoutes);

//Api de presentación
router.get("/", (req, res) => {
  res.send("API de productos - hecha por LMMT");
});

export default router;
