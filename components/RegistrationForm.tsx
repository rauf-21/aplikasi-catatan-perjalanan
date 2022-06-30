import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { FormEventHandler } from 'react'
import Link from 'next/link'
import { useState, useRef } from 'react'

import useNotificationStore from '../stores/notification-store'

const RegistrationForm: NextPage = () => {
  const router = useRouter()
  const [nik, setNik] = useState('')
  const [name, setName] = useState('')
  const [nikErrors, setNikErrors] = useState<string[]>([])
  const [nameErrors, setNameErrors] = useState<string[]>([])
  const registerButtonRef = useRef<HTMLButtonElement>(null)

  const showNotification = useNotificationStore((state) => state.showNotification)

  const registrationHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    showNotification('pending', 'Mengirim data...')

    setNikErrors([])
    setNameErrors([])

    if (registerButtonRef.current) {
      registerButtonRef.current.classList.add('btn-disabled')
    }

    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        nik,
        name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })


    const { success, errors } = await response.json()


    if (registerButtonRef.current) {
      registerButtonRef.current.classList.remove('btn-disabled')
    }

    if (!success) {
      showNotification('error', 'Pendaftaran gagal!')

      errors.forEach((error: string) => {
        if (error.includes('name')) {
          setNameErrors(value => [...value, error.replace('name', 'nama')])
        }
        else if (error.includes('nik')) {
          setNikErrors(value => [...value, error])
        }
      })

      return
    }

    showNotification('success', 'Pendaftaran berhasil!')
    router.push('/')
  }

  return (
    <section className='w-full mb-5'>
      <form onSubmit={registrationHandler} className='md:w-1/2 mt-10 mx-auto p-10 flex flex-col gap-5 bg-base-200 md:rounded-lg'>
        <h1 className='w-full mb-5 text-4xl text-center font-bold'>Form Pendaftaran Akun</h1>
        <label className='input-group input-group-vertical'>
          <span className='py-2'>NIK</span>
          <input type='number' placeholder='Masukkan NIK kamu disini...' className='w-full input input-bordered' required onChange={(e) => setNik(e.currentTarget.value)} />
        </label>
        {
          nikErrors.length > 0 && <ul className='mb-4 list-disc pl-5'>
            {
              nikErrors.map((error, index) => (
                <li className='text-error' key={index}>{error}</li>
              ))
            }
          </ul>
        }
        <label className='input-group input-group-vertical'>
          <span className='py-2'>Nama</span>
          <input type='text' placeholder='Masukkan nama kamu disini...' className='w-full input input-bordered' required onChange={(e) => setName(e.currentTarget.value)} />
        </label>
        {
          nameErrors.length > 0 && <ul className='mb-4 list-disc pl-5'>
            {
              nameErrors.map((error, index) => (
                <li className='text-error' key={index}>{error}</li>
              ))
            }
          </ul>
        }
        <button type='submit' className='my-5 btn btn-primary' ref={registerButtonRef}>Daftar</button>
        <p className='my-5 text-center'>
          Sudah punya akun? Silahkan login&nbsp;
          <Link href='/'>
            <a className='font-bold underline hover:text-primary'>DISINI</a>
          </Link>
        </p>
      </form>
    </section>
  )
}

export default RegistrationForm