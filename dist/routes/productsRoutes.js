"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/create', productController_1.createProduct);
router.post('/create-many', productController_1.createManyProduct);
router.get('/all', productController_1.getAllProducts);
router.get('/:id', productController_1.getProductById);
router.put('/:id', productController_1.updateProduct);
router.delete('/:id', productController_1.deleteProduct);
exports.default = router;
