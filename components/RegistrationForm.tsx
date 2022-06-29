import type { NextPage } from 'next'
import type { FormEventHandler } from 'react'
import Link from 'next/link'

const RegistrationForm: NextPage = () => {

  const registrationHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <section className='w-full'>
      <form onSubmit={registrationHandler} className='md:w-1/2 mt-10 mx-auto p-10 flex flex-col gap-5 bg-base-200 md:rounded-lg'>
        <h1 className='w-full mb-5 text-4xl text-center font-bold'>Form Pendaftaran Akun</h1>
        <label className='input-group input-group-vertical'>
          <span className='py-2'>NIK</span>
          <input type='number' placeholder='Masukkan NIK kamu disini...' className='w-full input input-bordered' required />
        </label>
        <label className='input-group input-group-vertical'>
          <span className='py-2'>Nama</span>
          <input type='text' placeholder='Masukkan nama kamu disini...' className='w-full input input-bordered' required />
        </label>
        <button type='submit' className='my-5 btn btn-primary'>Daftar</button>
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