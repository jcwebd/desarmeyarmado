const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Verbos http -> get / post / etc...
router.get('/', function (req, res) {
    // send -> string
    // render -> archivos
    //res.send("Esta la seccion contacto!")

    res.render('contacto.hbs', { title: "Contacto" })

})

router.post('/', function (req, res) {
    console.log(req.body.nombre);
    console.log(req.body.email);
    console.log(req.body.Message);

    let nombreForm, emailForm, localidadForm
    nombreForm = req.body.nombre
    emailForm = req.body.email
    MessageForm = req.body.Message



    //podemos hacer una verificación

    if (nombreForm == "" || emailForm == "" || localidadForm == "") {
        let validacion = "Faltan datos para completar - Favor llenar el Formulario"
        res.render('contacto.hbs', {
            validacion,
            nombreForm,
            emailForm,
            MessageForm
        });
    } else {
        async function main() {
            let tranporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: " juan.carlos.veloso123@gmail.com ",
                    pass: "wjlxtidnhyrphose",
                }
            });

            let info = await tranporter.sendMail({
                from: `${nombreForm} <${emailForm}>`,
                to: " juan.carlos.veloso123@gmail.com ",
                subject: "Nuevo Contacto de la Aplicación",
                html: `Nombre: ${nombreForm} <br> Email: ${emailForm} <br> Localidad: ${MessageForm}`
            });

            res.render('formEnviado.hbs', {
                nombreForm,
                emailForm,
                MessageForm,
                envio: true
            })
        }
        main().catch(console.error);
    }
})

module.exports = router