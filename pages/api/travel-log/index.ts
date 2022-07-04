import type { NextApiRequest, NextApiResponse } from 'next'

import type { TravelLog } from '../../../types/travel-log'
import { travelLogValidationSchema } from '../../../schemas/travel-log'
import { validate } from '../../../libs/helper'
import { getFilteredTravelLogs, addTravelLog } from '../../../libs/travel-log'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { nik, date, time, location, bodyTemperature } = req.body
    const travelLog: TravelLog = {
      user_nik: nik,
      date,
      time,
      location,
      bodyTemperature
    } 

    console.log()

    const { isValid, errors } = await validate(travelLogValidationSchema, travelLog)

    if (!isValid) {
      res
        .status(422)
        .json({
          success: false,
          errors
        })
      return
    }

    addTravelLog(travelLog)

    res
      .status(201)
      .json({
        success: true,
        errors: null
      })
    return
  }

  const { nik, date, time, location } = req.query

  const travelLogs = getFilteredTravelLogs(
    nik as string, 
    date as string, 
    time as string, 
    location as string
  )

  res
    .status(200)
    .json({
      success: true,
      errors: null,
      data: travelLogs
    })
  return
}

export default handler