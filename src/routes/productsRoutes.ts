import { createManyProduct, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import express from 'express';
import { checkRoleFromToken} from "../middleware/authMiddleware";


const router = express.Router();

router.post('/create', checkRoleFromToken('admin'), createProduct);

router.post('/create-many', checkRoleFromToken('admin'), createManyProduct);

router.get('/all', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id',checkRoleFromToken('admin'), updateProduct);

router.delete('/:id',checkRoleFromToken('admin'), deleteProduct);

export default router;