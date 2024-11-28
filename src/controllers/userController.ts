
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import sendVerificationEmail from '../services/emailService';
import { generateVerificationCode } from '../utils/utils';
import { Response, Request } from 'express';



const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '3344534244';
const ADMIN_VERIFICATION_CODE = process.env.ADMIN_VERIFICATION_CODE || 'ABD247';






 export const loginUser = async (req: Request, res: Response) => {
     try {
         const { email, password } = req.body
         const user = await prisma.user.findUnique({ where: { email } });
         
         if (!user || !user.isVerified){
             res.status(400).json({ message: 'Usuario no verificado o no registrado' })
             return;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);   
            if (!isPasswordValid){
                res.status(400).json({ message: 'Credenciales incorrectas' })
                return;
                
            }
            
            const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login exitoso', token, user });
            
            
        } catch (error) {
            res.status(500).json({message: error})
            
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {   
        res.status(500).json(error);
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {    
        const { email, name, password} = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser){
             res.status(400).json({ message: 'Email ya registrado' });
        }else{   
            const hashedPassword = await bcrypt.hash(password, 10);
            const verificationCode = generateVerificationCode()
            await prisma.user.create({
                data:{
                                email,
                                name,
                                password: hashedPassword,
                                isAdmin: false,
                                isVerified: false,
                                verificationCode,
                            },
                        })
                        
                        await sendVerificationEmail(email, verificationCode);
                         res.status(201).json({ message: 'Usuario registrado. Verifica tu correo electrónico'});
                    }
} catch (error) {
    res.status(500).json(error);
}
}

export const verifyUser = async (req: Request, res: Response) => {
    try {
        
        const { email, code } = req.body
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            res.status(400).json({ message: 'Usuario no encontrado' })
        }
        else{
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
                    } else {
                        res.status(400).json({ message: 'Código de verificación inválido', user });
                    }
                }
            } catch (error) {
                res.status(400).json(error)
            }
}
       
export const getUserClients = async (req: Request, res: Response) => {
            try {
                const users = await prisma.user.findMany({ where: { isAdmin: false } });
        res.json(users);
    } catch (error) {   
        res.status(500).json(error);
    }
}

export const getUserAdmins = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({ where: { isAdmin: true } });
        res.json(users);
    } catch (error) {   
        res.status(500).json(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            res.status(400).json({ message: 'Usuario no encontrado' })
            }else{
            await prisma.user.delete({ where: { id } });
            res.json({ message: 'Usuario eliminado con éxito' });
            }
    
        } catch (error) {   
            res.status(500).json(error);
        }
 }


