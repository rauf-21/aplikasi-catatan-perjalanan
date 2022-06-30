import type {NextApiRequest, NextApiResponse } from 'next'

import type { User } from '../../../types/user'
import { userValidationSchema } from '../../../schemas/user'
import { validate } from '../../../libs/helper'
import { addUser } from '../../../libs/user'

const handler = async (
  req: NextApiRequest, 
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { nik, name } = req.body
    const user: User = {
      nik,
      name
    }

    const { isValid, errors } = await validate(userValidationSchema, user)

    if (!isValid) {
      res
        .status(422)
        .json({
          success: false,
          errors
        })
      return
    }

    const { success, message } = addUser(user)

    if (!success) {
      
      res
        .status(409)
        .json({
          success,
          errors: [ message ]
        })
      
      return
    }

    res
      .status(201)
      .json({
        success: true,
        errors
      })
    return
  }
}

export default handler