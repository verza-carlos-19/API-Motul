import { createManyProduct, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import express from 'express';
import { checkRoleFromToken} from "../middleware/authMiddleware";


const router = express.Router();

router.post('/create', createProduct);

router.post('/create-many', createManyProduct);

router.get('/all', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;