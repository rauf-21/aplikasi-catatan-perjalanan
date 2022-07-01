import create from 'zustand'

import type { User } from '../types/user'

type UserStore = {
  nik: string,
  name: string,
  saveUser: (user: User) => void,
  getCurrentUser: () => User|null,
  setCurrentUser: (user: User|null) => void,
  loadUser: () => void,
  removeUser: () => void
}

const STORAGE_KEY = 'user-storage'

const useUserStore = create<UserStore>((set, get) => ({
  nik: '',
  name: '',
  saveUser: (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user }))
  },
  getCurrentUser: () => {
    const userJSON = localStorage.getItem(STORAGE_KEY)

    if (!userJSON) {
      return null
    }

    const user = JSON.parse(userJSON)

    return user
  },
  setCurrentUser: (user) => {
    if (!user) {
      return set(() => ({
        nik: '',
        name: ''
      }))
    }

    get().saveUser(user)

    console.log(user)

    return set(() => ({
      ...user
    }))
  },
  loadUser: () => {
    const user = get().getCurrentUser()

    return get().setCurrentUser(user)
  },
  removeUser: () => {
    get().setCurrentUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }
}))

export default useUserStore