import { Router } from 'express';
import controller from '../controllers/productApiController';

const router: Router = Router();

// CREATE
router.post("/products", controller.createProduct);

// GET ALL
router.get("/products", controller.getProducts);

// GET SINGLE
router.get("/products/:id", controller.getProductById);

// UPDATE
router.put("/products/:id", controller.updateProduct);

// DELETE
router.delete("/products/:id", controller.deleteProduct);

export default router;
