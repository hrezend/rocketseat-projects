import {Request, Response, NextFunction} from "express"
import {verify} from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  request: Request, 
  response: Response,
  next: NextFunction
) {
  const authtoken = request.headers.authorization

  if (!authtoken) {
    return response.status(401).json({message: "Token missing"})
  }

  const [, token] = authtoken.split(" ")

  

  try{
    const {sub} = verify( token,"4f93ac9d10cb751b8c9c646bc9dbccb9") as IPayload

    request.user_id = sub

    return next()

  }catch(err) {
    return response.status(401).end()
  }
}