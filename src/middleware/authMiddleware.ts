import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

// Middleware de autenticación
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    
  
  if (!token){ 
    res.status(401).json({ message: 'Token de autenticación requerido' })
  return;
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Token no válido' })
       return;
      }
      // req.user = decoded as { userId: string; isAdmin: boolean };
    next();
  });
} catch (error) {
  res.status(500).json(error)
}
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
  }
  next();
};

// export default authenticateToken;

export const checkRoleFromToken = (requiredRole: 'admin' | 'client') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token requerido para acceder a este recurso' });
      return;
    }

    try {
      // Decodificar el token
      const decoded = jwt.verify(token, JWT_SECRET) as { isAdmin: boolean };

      // Verificar el rol basado en el campo `isAdmin`
      if (requiredRole === 'admin' && !decoded.isAdmin) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }

      if (requiredRole === 'client' && decoded.isAdmin) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }

      // Continuar si el rol es correcto
      next();
    } catch (error) {
      res.status(403).json({ message: 'Token inválido o expirado' });
    }
  };
}

