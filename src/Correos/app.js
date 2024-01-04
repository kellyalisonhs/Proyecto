const nodemailer = require('nodemailer');

// Función para generar un número aleatorio de 6 dígitos
const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
};

enviarMail = async () => {
    // Configuración del transporte
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'prueba1spa6@gmail.com',
            pass: 'cfvs qlzg dior hxxn'
        }
    };

    // Mensaje con clave de autenticación generada
    const claveAutenticacion = generateRandomCode(); // Generar clave de autenticación
    const mensaje = {
        from: 'prueba1spa6@gmail.com',
        to: 'edgardomagallanes2002@gmail.com',
        subject: 'PROYECTO',
        text: `Tu clave de autenticacion es ${claveAutenticacion}`
    };

    // Crear objeto de transporte
    const transport = nodemailer.createTransport(config);

    // Enviar el correo electrónico
    const info = await transport.sendMail(mensaje);
    console.log(info);
};

enviarMail();