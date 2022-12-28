import {Repository, EntityRepository} from 'typeorm'
import {Compliment} from '../entity/Compliment'

@EntityRepository(Compliment)
class ComplimentsRepository extends Repository<Compliment>{

}

export {ComplimentsRepository}