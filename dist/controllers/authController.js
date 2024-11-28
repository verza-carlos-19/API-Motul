"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '3344534244';
const ADMIN_VERIFICATION_CODE = process.env.ADMIN_VERIFICATION_CODE || 'ABD247';
// router.post('/register', async (req : Request, res: Response) => {
//   const { email, password, isAdmin } = req.body;
//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) return res.status(400).json({ message: 'Email ya registrado' });
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const verificationCode = generateVerificationCode();
//   const user = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//       isAdmin: false,
//       isVerified: false,
//       verificationCode,
//     },
//   });
//   await sendVerificationEmail(email, verificationCode);
//   res.status(201).json({ message: 'Usuario registrado. Verifica tu correo electrónico' });
// });
// router.post('/verify-email', async (req: Request, res: Response) => {
//   const { email, code } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });
//   if (code === ADMIN_VERIFICATION_CODE) {
//     await prisma.user.update({
//       where: { email },
//       data: { isVerified: true, isAdmin: true, verificationCode: null },
//     });
//     return res.json({ message: 'Email verificado con éxito como administrador' });
//   } else if (user.verificationCode === code) {
//     await prisma.user.update({
//       where: { email },
//       data: { isVerified: true, isAdmin: false, verificationCode: null },
//     });
//     return res.json({ message: 'Email verificado con éxito como cliente' });
//   } else {
//     return res.status(400).json({ message: 'Código de verificación inválido' });
//   }
// });
// router.post('/login', async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user || !user.isVerified) return res.status(400).json({ message: 'Usuario no verificado o no registrado' });
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) return res.status(400).json({ message: 'Credenciales incorrectas' });
//   const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
//   res.json({ message: 'Login exitoso', token });
// });
exports.default = router;
