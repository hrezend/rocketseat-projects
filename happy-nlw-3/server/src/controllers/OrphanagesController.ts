import {Request, response, Response} from 'express';
import * as Yup from 'yup';
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default{
    async index(){
        const orphanageRepository = getRepository(Orphanage);
        const orphanages = await orphanageRepository.find({
            relations: ['images']
        });
        return response.status(200).json(orphanageView.renderMany(orphanages));
    },
    async show(request: Request, response: Response){
        const {id} = request.params;
        const orphanageRepository = getRepository(Orphanage);
        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return response.status(200).json(orphanageView.render(orphanage));
    },
    async create(request: Request, response: Response){
        const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body;
        const orphanageRepository = getRepository(Orphanage);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image =>{return {path: image.filename}});
        const data = {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, images};
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().max(300).required(),
            instructions: Yup.string().max(300).required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
            })).required()
        });
        await schema.validate(data, {abortEarly: false});
        const orphanage = orphanageRepository.create(data);
        await orphanageRepository.save(orphanage);
        return response.status(201).json(orphanage);
    }
};