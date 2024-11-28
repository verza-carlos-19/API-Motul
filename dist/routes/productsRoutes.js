"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/create', (0, authMiddleware_1.checkRoleFromToken)('admin'), productController_1.createProduct);
router.post('/create-many', (0, authMiddleware_1.checkRoleFromToken)('admin'), productController_1.createManyProduct);
router.get('/all', productController_1.getAllProducts);
router.get('/:id', productController_1.getProductById);
router.put('/:id', (0, authMiddleware_1.checkRoleFromToken)('admin'), productController_1.updateProduct);
router.delete('/:id', (0, authMiddleware_1.checkRoleFromToken)('admin'), productController_1.deleteProduct);
exports.default = router;
