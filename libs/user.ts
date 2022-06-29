import fs from 'fs'
import path from 'path'

import type { User } from '../types/user'

export const getUserDataPath = () => {
  return path.join(process.cwd(), 'config.txt')
}

export const deserializeUserData = (rawUserData: string) => {
  const rawUserDataPairs = rawUserData.split(',')

  return rawUserDataPairs.map((data) => {
    const [nik, name] = data.split(':')
    return {
      nik,
      name
    }
  })
}

export const serializeUserData = (userData: User[]) => {
  const rawUserDataPairs = userData.map((data) => {
    const { nik, name } = data

    return `${nik}:${name}`
  })

  return rawUserDataPairs.join(',')
}

export const getAllUsers = () => {
  const rawUserDataPath = getUserDataPath()
  const rawUserData = fs.readFileSync(rawUserDataPath, 'utf-8')

  return deserializeUserData(rawUserData)
}

export const getUserByNik = (nik: string) => {
  const users = getAllUsers()

  return users.find((user) => user.nik === nik)
}

export const addUser = (user: User) => {
  const users = getAllUsers()

  fs.writeFileSync(getUserDataPath(), serializeUserData([...users, user]))
}