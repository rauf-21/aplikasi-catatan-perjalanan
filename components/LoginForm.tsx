import type { NextPage } from 'next'
import type { FormEventHandler } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import useNotificationStore from '../stores/notification-store'
import useUserStore from '../stores/user-store'

const LoginForm: NextPage = () => {
  const router = useRouter()
  const [nik, setNik] = useState('')
  const [nikErrors, setNikErrors] = useState<string[]>([])

  const showNotification = useNotificationStore((state) => state.showNotification)
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)

  const loginHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    showNotification('pending', 'Mengirim data...')

    setNikErrors([])

    const response = await fetch(`/api/user/${nik}`)
    const { success, errors, data } = await response.json()

    if (!success) {
      showNotification('error', 'Login gagal!')

      errors.forEach((error: string) => {
        if (error.includes('nik')) {
          setNikErrors(value => [...value, error])
        }
      })

      return
    }

    showNotification('success', 'Login berhasil')

    setCurrentUser(data)

    router.push('/dashboard')
  }

  return (
    <section className='w-full'>
      <form onSubmit={loginHandler} className='md:w-1/2 mt-10 mx-auto p-10 flex flex-col gap-5 bg-base-200 md:rounded-lg'>
        <h1 className='w-full mb-10 text-4xl text-center font-bold'>
          <span>Selamat Datang di</span>
          <br />
          <span className='mt-10 text-primary'>PeduliDiri</span>
        </h1>
        <label className='input-group input-group-vertical'>
          <span className='py-2'>NIK</span>
          <input type='number' placeholder='Masukkan NIK kamu disini...' className='w-full input input-bordered' required onChange={(e) => setNik(e.currentTarget.value)} />
        </label>
        {
          nikErrors.length > 0 && <ul className='mb-4 list-disc pl-5'>
            {
              nikErrors.map((error, index) => (
                <li className='text-error capitalize' key={index}>{error}</li>
              ))
            }
          </ul>
        }
        <button type='submit' className='my-5 btn btn-primary'>Masuk</button>
        <p className='my-5 text-center'>
          Belum punya akun? Silahkan daftar&nbsp;
          <Link href='/registration'>
            <a className='font-bold underline hover:text-primary'>DISINI</a>
          </Link>
        </p>
      </form>
    </section>
  )
}

export default LoginForm