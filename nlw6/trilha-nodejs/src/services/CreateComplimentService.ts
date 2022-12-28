import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { UsersRepositories } from "../repositories/UserRepository"


interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {
  async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const usersRepository = getCustomRepository(UsersRepositories)

    if(user_sender === user_receiver) {
      throw new Error("Incorrect User Reciver")
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver)

    if (!userReceiverExists) {
      throw new Error("User reciver does not exists")
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentsRepository.save(compliment)

    return compliment

  }
}
export {CreateComplimentService}