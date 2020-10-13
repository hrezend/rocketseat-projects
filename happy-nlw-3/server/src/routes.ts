import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages/list', OrphanagesController.index);
routes.get('/orphanages/list/:id', OrphanagesController.show);
routes.post('/orphanages/add', upload.array('images'), OrphanagesController.create);

export default routes;