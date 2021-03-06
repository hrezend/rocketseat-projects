import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/ConvertHourToMinute';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    async index(request: Request, response: Response){
        const filters = request.query;
        if(!filters.subject || !filters.week_day || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(filters.time as string);
        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??',[Number(filters.week_day as string)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', filters.subject as string)
            .join('teachers', 'classes.teacher_id', '=', 'teachers.id')
            .select(['classes.*', 'teachers.*']);
            
        return response.json(classes);
    }

    async create(request: Request, response: Response){
        const trx = await db.transaction();
        const {name,avatar,whatsapp,biografia,subject,cost,schedule} = request.body;
    
        try{
            const insertedTeachersIDS = await trx('teachers').insert({name, avatar, whatsapp, biografia});
            const teacher_id = insertedTeachersIDS[0];
            const insertedClassesIDS = await trx('classes').insert({subject, cost, teacher_id});
            const class_id = insertedClassesIDS[0];
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return{
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            });
            await trx('class_schedule').insert(classSchedule);
            await trx.commit();
    
            return response.status(201).send();
        }
        catch(err){
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}