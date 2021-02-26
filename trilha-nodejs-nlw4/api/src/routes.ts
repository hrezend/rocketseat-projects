import {Router} from 'express';
import {SurveyController} from './controllers/SurveyController';
import {UserController} from './controllers/UserController';
import {SendMailController} from './controllers/SendMailController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMail = new SendMailController();

router.post('/users', userController.create);
router.get('/users/show', userController.show);

router.post('/surveys', surveyController.create);
router.get('/surveys/show', surveyController.show);

router.post('/send/mail', sendMail.execute);

export {router};