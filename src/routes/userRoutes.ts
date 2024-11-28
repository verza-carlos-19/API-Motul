import { Router } from "express";
import { deleteUser, getAllUsers, getUserAdmins, getUserClients, loginUser, registerUser, verifyUser } from "../controllers/userController";
import { checkRoleFromToken } from "../middleware/authMiddleware";

const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyUser);
router.get('/client',checkRoleFromToken('admin'), getUserClients);
router.get('/admin',checkRoleFromToken('admin'), getUserAdmins);
router.get('/users',checkRoleFromToken('admin'), getAllUsers);
router.delete('/users/:id',checkRoleFromToken('admin'), deleteUser);

// router.post('/admin-route', checkRoleFromToken('admin'), (req, res) => {
//     res.json({ message: 'Acceso permitido: Solo para administradores' });
//   });
  
//   // Ruta accesible solo para clientes
//   router.post('/client-route', checkRoleFromToken('client'), (req, res) => {
//     res.json({ message: 'Acceso permitido: Solo para clientes' });
//   });




export default router;