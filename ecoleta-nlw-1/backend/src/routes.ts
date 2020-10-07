//Import
import express from 'express';
import multer from 'multer';

import ValidatorCreatePoint from './validators/ValidatorCreatePoint';

import multerConfig from './configs/multer';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//New Class
const routes = express.Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();
const itemsController = new ItemsController();

//Routes Items
routes.get('/items', itemsController.index);

//Routes Points
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', upload.single('image'), ValidatorCreatePoint, pointsController.create);

//Export
export default routes;