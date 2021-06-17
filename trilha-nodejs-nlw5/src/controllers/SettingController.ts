import { Request, Response } from 'express';
import { SettingService } from '../services/SettingService';

class SettingController{
    async create(request: Request, response: Response){
        const {chat, username} = request.body;

        const settingService = new SettingService();
        
        try{
            const settings = await settingService.create({chat, username});

            return response.status(200).json(settings);
        }
        catch(err){
            return response.status(400).json({message: err.message});
        }

    }
}

export {SettingController}