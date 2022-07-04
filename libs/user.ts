import fs from 'fs'
import path from 'path'

import type { User } from '../types/user'

export const getUserDataPath = () => {
  return path.join(process.cwd(), 'data', 'config.txt')
}

export const deserializeUserData = (rawUserData: string) => {
  const rawUserDataPairs = rawUserData.split(',')

  if (rawUserDataPairs[0] === '') {
    return []
  }

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

/**
 * Check whether user has already registered using the same nik.
 * 
 * Returns true if user has already registered.
 */
export const checkUser = (user: User) => {
  const users = getAllUsers()
  const { nik } = user

  return users.some((user) => user.nik === nik) 
}

export const addUser = (user: User) => {
  const users = getAllUsers() 

  if (checkUser(user)) {
    return {
      success: false,
      message: 'nik sudah terdaftar! pakai nik lainnya atau login menggunakan nik yang sudah terdaftar'   
    }
  } 

  fs.writeFileSync(getUserDataPath(), serializeUserData([...users, user]))

  return {
    success: true,
    message: 'Pendaftaran berhasil'
  }
}