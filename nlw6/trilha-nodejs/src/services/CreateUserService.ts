import { UsersRepositories } from "../repositories/UserRepository"
import {getCustomRepository} from 'typeorm'
import {hash} from 'bcryptjs'

interface IUserRequest {
  name: string,
  password: string,
  email: string,
  admin?: boolean
}

class CreateUserService {

  async execute({ name, email, admin, password }: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error("Invalid Email") 
    }

    const userAlredyExist = await userRepository.findOne({
      email
    })
    if (userAlredyExist) {
      throw new Error("User alredy exists")
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      password: hashedPassword,
      email,
      admin
    })

    await userRepository.save(user)

    return user
  }
}

export {CreateUserService}