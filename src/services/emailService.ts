import nodemailer from 'nodemailer';

async function sendVerificationEmail(to: string, code: string) {
  
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Verificación de Email',
      text: `Tu código de verificación es: ${code}`,
    });
  } catch (error) {
    console.error(error);
  }
}

export default  sendVerificationEmail ;
