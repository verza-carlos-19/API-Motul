"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserAdmins = exports.getUserClients = exports.verifyUser = exports.registerUser = exports.getAllUsers = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const emailService_1 = __importDefault(require("../services/emailService"));
const utils_1 = require("../utils/utils");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '3344534244';
const ADMIN_VERIFICATION_CODE = process.env.ADMIN_VERIFICATION_CODE || 'ABD247';
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.isVerified) {
            res.status(400).json({ message: 'Usuario no verificado o no registrado' });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Credenciales incorrectas' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login exitoso', token, user });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.loginUser = loginUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllUsers = getAllUsers;
const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Email ya registrado' });
        }
        else {
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const verificationCode = (0, utils_1.generateVerificationCode)();
            await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    isAdmin: false,
                    isVerified: false,
                    verificationCode,
                },
            });
            await (0, emailService_1.default)(email, verificationCode);
            res.status(201).json({ message: 'Usuario registrado. Verifica tu correo electrónico' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.registerUser = registerUser;
const verifyUser = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Usuario no encontrado' });
        }
        else {
            if (code === ADMIN_VERIFICATION_CODE) {
                await prisma.user.update({
                    where: { email },
                    data: { isVerified: true, isAdmin: true, verificationCode: ADMIN_VERIFICATION_CODE },
                });
                res.status(200).json({ message: 'Código de verificacion de Admin, ers un administrador', user });
            }
            else if (user.verificationCode === code) {
                // res.status(200).json({ message: 'Código de verificacion de cliente, ers un cliente', user });
                await prisma.user.update({
                    where: { email },
                    data: { isVerified: true, isAdmin: false, verificationCode: code },
                });
                res.json({ message: 'Email verificado con éxito como cliente', user });
            }
            else {
                res.status(400).json({ message: 'Código de verificación inválido', user });
            }
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.verifyUser = verifyUser;
const getUserClients = async (req, res) => {
    try {
        const users = await prisma.user.findMany({ where: { isAdmin: false } });
        res.json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getUserClients = getUserClients;
const getUserAdmins = async (req, res) => {
    try {
        const users = await prisma.user.findMany({ where: { isAdmin: true } });
        res.json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getUserAdmins = getUserAdmins;
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            res.status(400).json({ message: 'Usuario no encontrado' });
        }
        else {
            await prisma.user.delete({ where: { id } });
            res.json({ message: 'Usuario eliminado con éxito' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.deleteUser = deleteUser;
