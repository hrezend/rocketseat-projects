import { getCustomRepository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingCreate{
    chat: boolean;
    username: string;
}

class SettingService{
    async create({chat, username} : ISettingCreate){
        const settingsRepository = getCustomRepository(SettingsRepository);

        const userAlreadyExists = await settingsRepository.findOne({username});

        if(userAlreadyExists){
            throw new Error("User already exists.");
        }

        const settings = settingsRepository.create({chat, username});

        await settingsRepository.save(settings);

        return settings;
    }

    async findByUsername(username: string){
        const settingsRepository = getCustomRepository(SettingsRepository);

        const settings = await settingsRepository.findOne({username});

        return settings;
    }

    async update(username: string, chat: boolean){
        const settingsRepository = getCustomRepository(SettingsRepository);

        await settingsRepository.createQueryBuilder().update(Setting).set({chat}).where("username = :username", {username}).execute();
    }
}

export {SettingService}