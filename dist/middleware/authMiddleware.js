"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoleFromToken = exports.isAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
// Middleware de autenticación
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token de autenticación requerido' });
            return;
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: 'Token no válido' });
                return;
            }
            // req.user = decoded as { userId: string; isAdmin: boolean };
            next();
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = (req, res, next) => {
    if (!req.body) {
        res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
    }
    next();
};
exports.isAdmin = isAdmin;
// export default authenticateToken;
const checkRoleFromToken = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token requerido para acceder a este recurso' });
            return;
        }
        try {
            // Decodificar el token
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
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
        }
        catch (error) {
            res.status(403).json({ message: 'Token inválido o expirado' });
        }
    };
};
exports.checkRoleFromToken = checkRoleFromToken;
