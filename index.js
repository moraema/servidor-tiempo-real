const express = require('express');
require('dotenv').config();
const cors = require('cors');
const routeTarea = require('./src/routes/router.tarea');



const app = express();


app.use(cors());
app.use(express.json())

app.use('/tarea', routeTarea);


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});