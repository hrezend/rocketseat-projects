import {getCustomRepository} from 'typeorm'
import {TagRepository} from '../repositories/TagsRepository'


class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagRepository)

    if (!name) {
      throw new Error("Incorrect Name")
    }

    const tagAlredyExists = await tagsRepository.findOne({
      name
    })

    if(tagAlredyExists) {
      throw new Error("Tag alredy exist")
    }

    const tag = tagsRepository.create({
      name
    })

    await tagsRepository.save(tag)

    return tag
  }
}

export {CreateTagService}