import type { NextPage } from 'next'
import type { FormEventHandler } from 'react'
import Link from 'next/link'
import { useState } from 'react'

const LoginForm: NextPage = () => {

  const [nik, setNik] = useState('')

  const loginHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <section className='w-full'>
      <form onSubmit={loginHandler} className='md:w-1/2 mt-10 mx-auto p-10 flex flex-col bg-base-200 md:rounded-lg'>
        <h1 className='w-full mb-10 text-4xl text-center font-bold'>
          <span>Selamat Datang di</span>
          <br />
          <span className='mt-10 text-primary'>Aplikasi Catatan Perjalanan</span>
        </h1>
        <label className='input-group input-group-vertical'>
          <span className='py-2'>NIK</span>
          <input type='number' placeholder='Masukkan NIK kamu disini...' className='w-full input input-bordered' required />
        </label>
        <button type='submit' className='my-5 btn btn-primary'>Masuk</button>
        <p className='my-5 text-center'>
          Belum punya akun? Silahkan daftar&nbsp;
          <Link href='/register'>
            <a className='font-bold underline hover:text-primary'>DISINI</a>
          </Link>
        </p>
      </form>
    </section>
  )
}

export default LoginForm