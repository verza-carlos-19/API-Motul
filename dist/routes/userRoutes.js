"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.post('/verify-email', userController_1.verifyUser);
router.get('/client', (0, authMiddleware_1.checkRoleFromToken)('admin'), userController_1.getUserClients);
router.get('/admin', (0, authMiddleware_1.checkRoleFromToken)('admin'), userController_1.getUserAdmins);
router.get('/users', (0, authMiddleware_1.checkRoleFromToken)('admin'), userController_1.getAllUsers);
router.delete('/users/:id', (0, authMiddleware_1.checkRoleFromToken)('admin'), userController_1.deleteUser);
// router.post('/admin-route', checkRoleFromToken('admin'), (req, res) => {
//     res.json({ message: 'Acceso permitido: Solo para administradores' });
//   });
//   // Ruta accesible solo para clientes
//   router.post('/client-route', checkRoleFromToken('client'), (req, res) => {
//     res.json({ message: 'Acceso permitido: Solo para clientes' });
//   });
exports.default = router;
