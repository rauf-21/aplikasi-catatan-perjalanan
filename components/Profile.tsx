import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useMemo } from 'react'

import type { User } from '../types/user'
import useUserStore from '../stores/user-store'

const Profile: NextPage = () => {
  const router = useRouter()
  const getCurrentUser = useUserStore((state) => state.getCurrentUser)
  const removeUser = useUserStore((state) => state.removeUser)
  const [user, setUser] = useState<User>({
    nik: '',
    name: ''
  })
  const userNameInitials = useMemo(() => {
    const initials = user.name
      .trim()
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase())
      .join('')

    console.log(initials)

    return initials
  }, [user])

  useEffect(() => {
    const savedUser = getCurrentUser()

    if (savedUser !== null) {
      setUser(savedUser)
    }

  }, [getCurrentUser])

  const logoutHandler = () => {
    removeUser()
    router.push('/')
  }

  return (
    <div className='w-1/4 h-fit py-5 px-10 sticky top-5 flex flex-col gap-5 items-center bg-base-200 rounded'>
      <h1 className='text-2xl font-bold'>Profil</h1>
      <div className='avatar placeholder'>
        <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
          <span className="text-3xl">{userNameInitials}</span>
        </div>
      </div>
      <p className='font-bold capitalize break-all'>{user.name}</p>
      <p className=''>{user.nik}</p>
      <button className='text-error uppercase font-bold' onClick={logoutHandler}>Keluar</button>
    </div>
  )
}

export default Profile