
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
  
  const { name, price, img, category } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, price, img, category },
    });
    res.status(201).json({ message: 'Producto creado', product });
  } catch (error) {
    res.status(500).json({ error});
  }
}

export const createManyProduct = async (req: Request, res: Response) => {
  const products = req.body;
  try {
    if (!Array.isArray(products)|| products.length === 0) {
      res.status(406).json("agrega productos");
      return;
    }
    const product = await prisma.product.createMany({
      data: products,
    });
    res.status(201).json({ message: 'Productos creado', product });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

// Leer todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}



      
      // Actualizar un producto
export const getProductById = async (req: Request, res: Response) => {
      const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      res.status(200).json({ error: 'no existe el producto pedido' });
      return;
    }
      res.json(product);
    
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
      }
}



export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, img, category } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price, img, category },
    });
    res.status(200).json({ message: 'Producto actualizado', updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}


export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

// Eliminar un producto


