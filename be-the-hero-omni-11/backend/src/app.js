const express = require('express');
const {errors} = require('celebrate');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;


/**
 * Métodos HTTP:
 * GET: Busca uma informação no back-end;
 * POST: Cria uma informação no back-end;
 * PUT: Altera uma informação no back-end;
 * DELETE: Deleta uma informação no back-end;
 * 
 * 
 * Tipos de Parâmetros:
 * QUERY: Parâmetros nomeados enviados na rota após "?" (Filtros,Paginação)
 * ROUTE: Parâmetros utilizados para identificar recursos
 * REQUEST BODY: Corpo da requisição, utilizado para criar ou alterar recursos
*/

