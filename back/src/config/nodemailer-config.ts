import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const nodemailerConfig = {
    host: process.env.NODEMAILER_HOST, // Cambia esto con tu configuración SMTP
    port: process.env.NODEMAILER_PORT,
    secure: true, // true para 465, false para otros puertos
    auth: {
      user: process.env.NODEMAILER_USER, // Cambia esto con tu correo
      pass: process.env.NODEMAILER_PASSWORD, // Cambia esto con tu contraseña
    },
  
};