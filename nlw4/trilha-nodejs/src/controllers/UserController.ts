import {Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import * as yup from 'yup';

import {AppError} from '../errors/AppError';
import {UsersRepository} from '../repositories/UsersRepository';

class UserController{
    async create(request: Request, response: Response){
        const {name, email} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("O nome é obrigatório."),
            email: yup.string().email().required("O email é obrigatório."),
        });

        try{
            await schema.isValid(request.body, {abortEarly: false});
        }catch(err){
            throw new AppError(err, 400);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email});
        if(userAlreadyExists){
            throw new AppError('This email is already being used.', 400);
        }

        const user = usersRepository.create({name, email});
        await usersRepository.save(user);

        return response.status(201).json(user);
    }

    async show(request: Request, response: Response){
        const usersRepository = getCustomRepository(UsersRepository);
        const all = await usersRepository.find();

        response.status(200).json(all);
    }
}

export {UserController}