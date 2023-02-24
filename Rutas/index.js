
const autenticacion_jwt = require ('../middlewares/autentication_jwt.js')

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());

//------------------------------------------------------------------
//                              Tablas             
// -----------------------------------------------------------------

const token = require ('../Configuracion/asignacion_jwt');
app.use('/token', token)

const cliente = require ('../Configuracion/cliente.js');
app.use('/cliente', autenticacion_jwt, cliente)

const usuario = require ('../Configuracion/usuario.js');
app.use('/usuario', autenticacion_jwt, usuario)

const categoria = require ('../Configuracion/categoria.js');
app.use('/categoria', autenticacion_jwt, categoria)

const producto = require ('../Configuracion/producto.js');
app.use('/producto', autenticacion_jwt, producto)

const pago = require ('../Configuracion/pago.js');
app.use('/pago', autenticacion_jwt, pago)

const detalle = require ('../Configuracion/detalle.js');
app.use('/detalle', autenticacion_jwt, detalle) 

const reporte = require ('../Configuracion/reportes.js');
app.use('/reportes', reporte)

//------------------------------------------------------------------
//                    Conexion con el puerto 3000                  
// -----------------------------------------------------------------

const puerto = 3000
app.listen(puerto, function() {
    console.log('Conexion exitosa con el puerto: ' + puerto);
});
