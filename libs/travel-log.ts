import path from 'path'
import fs from 'fs'

import type { TravelLog } from '../types/travel-log'

export const getTravelLogDataPath = () => {
  return path.join(process.cwd(), 'data', 'config.txt')
}

export const deserializeTravelLogData = (rawTravelLogData: string) => {
  const rawTravelLogDataPairs = rawTravelLogData.split(',')

  return rawTravelLogDataPairs.map((data) => {
    const [user_nik, date, time, location, bodyTemperature] = data.split(':')
    return {
      user_nik,
      date, 
      time, 
      location, 
      bodyTemperature: Number(bodyTemperature)
    }
  })
}

export const serializeTravelLogData = (TravelLogData: TravelLog[]) => {
  const rawTravelLogDataPairs = TravelLogData.map((data) => {
    const { user_nik, date, time, location, bodyTemperature } = data

    return `${user_nik}:${date}:${time}:${location}:${bodyTemperature}`
  })

  return rawTravelLogDataPairs.join(',')
}

export const getAllTravelLogs = () => {
  const rawTravelLogDataPath = getTravelLogDataPath()
  const rawTravelLogData = fs.readFileSync(rawTravelLogDataPath, 'utf-8')

  return deserializeTravelLogData(rawTravelLogData)
}

export const getTravelLogsByNik = (nik: string) => {
  const travelLogs = getAllTravelLogs()

  return travelLogs.filter((travelLog) => travelLog.user_nik === nik)
}

export const getFilteredTravelLogs = (date: string|null, time: string|null, location: string|null) => {
  const travelLogs = getAllTravelLogs()

  return travelLogs.filter((travelLog) => (
    (date !== null ? travelLog.date === date : true)
    && (time !== null ? travelLog.time === time : true)
    && (location !== null ? travelLog.location === location : true)
  ))
}

export const addTravelLog = (travelLog: TravelLog) => {
  const travelLogs = getAllTravelLogs() 

  fs.writeFileSync(getTravelLogDataPath(), serializeTravelLogData([...travelLogs, travelLog]))

  return {
    success: true,
    message: 'Log perjalanan berhasil ditambahkan!'
  }
}