import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const user = getCurrentUser()

    if (!user) {
      return
    }

    setUser({ ...user })
  })

  const logoutHandler = () => {
    removeUser()
    router.push('/')
  }

  return (
    <div className='w-1/4 min-h-full py-5 px-10 flex flex-col gap-5 items-center bg-base-200 rounded'>
      <h1 className='text-2xl font-bold'>Profil</h1>
      <div className='avatar'>
        <div className='w-36 rounded-lg'>
          <Image src='https://placeimg.com/256/256/people' width={256} height={256} />
        </div>
      </div>
      <p className='font-bold capitalize break-all'>{user.name}</p>
      <p className=''>{user.nik}</p>
      <button className='text-error uppercase font-bold' onClick={logoutHandler}>Keluar</button>
    </div>
  )
}

export default Profile