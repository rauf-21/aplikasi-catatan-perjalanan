import path from 'path'
import fs from 'fs'

import type { TravelLog } from '../types/travel-log'

export const getTravelLogDataPath = () => {
  return path.join(process.cwd(), 'data', 'travel-logs.txt')
}

export const deserializeTravelLogData = (rawTravelLogData: string) => {
  const rawTravelLogDataPairs = rawTravelLogData.split(',')

  if (rawTravelLogDataPairs[0] === '') {
    return []
  }

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

export const getFilteredTravelLogs = (nik:string, date: string|null, time: string|null, location: string|null) => {
  const travelLogs = getTravelLogsByNik(nik)

  return travelLogs.filter((travelLog) => (
    (date ? travelLog.date === date : true)
    && (time ? travelLog.time === time : true)
    && (location ? travelLog.location.trim().toLowerCase().includes(location.trim().toLowerCase())  : true)
  ))
}

export const addTravelLog = (travelLog: TravelLog) => {
  const travelLogs = getAllTravelLogs() 

  fs.writeFileSync(getTravelLogDataPath(), serializeTravelLogData([...travelLogs, travelLog]))
}