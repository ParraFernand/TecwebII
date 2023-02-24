const conexion = require ('../BD/Database.js')
const express = require('express');
const cors = require('cors');
const encrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const {jwt_secret} = require ('../Rutas/parametros.js')


const app = express();
app.use(express.json());
app.use(cors());

const route = express.Router()

// //------------------------------------------------------------------
// //                   JWT SIGN Token a los usuarios              
// // -----------------------------------------------------------------

route.post('/',function(req,res) {
    let data = NombreDeUsuario = req.body.NombreDeUsuario;
    let sql = "Select NombreDeUsuario from usuario where NombreDeUsuario = ? "

    conexion.query(sql, data, (error,filas) => {
        if (error){
            res.json("error")
        }if(filas.length == 0) {
            res.json({mensaje:'Usuario Incorrecto'});
            return;
        }
        jwt.sign(data, jwt_secret, function (err, token){
            if(err) {
                console.log("Error: " +err.message);
            }else{
                res.json(token)
            }
        })
    });
});

// route.post('/',function(req,res) {
//     let data = {
//         NombreDeUsuario:req.body.NombreDeUsuario,
//         Contraseña:req.body.Contraseña,
//         }

//         let sql = 'Select NombreDeUsuario, Contraseña from usuario where NombreDeUsuario = ? and Contraseña = ?';

//         conexion.query( sql, req.body.NombreDeUsuario, (err,resul) =>{
//             if (err) {
//                 resul.json('ERROR')
//             }else{    
//                 conexion.query( sql, req.body.NombreDeUsuario, async function(err,resul){
//                     let ClaveBD = resul[0].clave;
//                     let valido = await encrypt.compare(req.body.Contraseña, ClaveBD);
//                     console.log(valido);
//                     if(valido){
//                         console.log('los datos si coinciden')
//                         //res.json('.3.');
//                     }else{
//                         console.log('los datos no coinciden')
//                         //res.json('.>.')
//                     }
//                 });
//             }

//         jwt.sign(data, jwt_secret, function (err, token){
//             if(err) {
//                 console.log("Error: " +err.message);
//             }else{
//                 res.json(token)
//             }
//         })
//     });
// });


module.exports = route;