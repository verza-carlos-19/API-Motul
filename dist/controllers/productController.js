"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createManyProduct = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Crear un producto
const createProduct = async (req, res) => {
    const { name, price, img, category } = req.body;
    try {
        const product = await prisma.product.create({
            data: { name, price, img, category },
        });
        res.status(201).json({ message: 'Producto creado', product });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createProduct = createProduct;
const createManyProduct = async (req, res) => {
    const products = req.body;
    try {
        if (!Array.isArray(products) || products.length === 0) {
            res.status(406).json("agrega productos");
            return;
        }
        const product = await prisma.product.createMany({
            data: products,
        });
        res.status(201).json({ message: 'Productos creado', product });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};
exports.createManyProduct = createManyProduct;
// Leer todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
exports.getAllProducts = getAllProducts;
// Actualizar un producto
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            res.status(200).json({ error: 'no existe el producto pedido' });
            return;
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, img, category } = req.body;
    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { name, price, img, category },
        });
        res.status(200).json({ message: 'Producto actualizado', updatedProduct });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: 'Producto eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
exports.deleteProduct = deleteProduct;
// Eliminar un producto
