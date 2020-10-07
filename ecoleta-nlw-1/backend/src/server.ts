import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import {errors} from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(errors());
app.listen(3333);

//ROTA: Endereco completo da requisicao
//RECURSO: Qual entidade estamos acessando no sistema

//GET: Listar uma informacao do backend
//POST: Criar uma informacao do backend
//PUT: Alterar uma informacao do backend
//DELETE: Remover uma informacao do backend

//REQUEST PARAM: Parametros que vem na propria rota que identifica um recurso
//QUERY PARAM: Parametros que vem na rota, geralmente opcionais, para filtro, paginacao, etc
//REQUEST BODY: Parametros que vem no corpo da requisicao, para criacao, atualizacao, etc