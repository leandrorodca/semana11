const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

//para aceitar os parametros do request body
app.use(express.json());
app.use(routes);
app.use(cors();)


app.listen(3333,()=>console.log('servidor rodando, porta 3333'));
