import {Router} from 'express';
import {SurveyController} from './controllers/SurveyController';
import {UserController} from './controllers/UserController';
import {SendMailController} from './controllers/SendMailController';
import {AnswerController} from './controllers/AnswerController';
import {NpsController} from './controllers/NpsController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const answerController = new AnswerController();
const npsController = new NpsController();
const sendMail = new SendMailController();

router.post('/users', userController.create);
router.get('/users/show', userController.show);

router.post('/surveys', surveyController.create);
router.get('/surveys/show', surveyController.show);

router.post('/send/mail', sendMail.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps', npsController.execute);

export {router};