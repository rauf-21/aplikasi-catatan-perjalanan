import type { NextPage } from 'next'
import type { FormEventHandler } from 'react'
import { useRef, useState } from 'react'

import useNotificationStore from '../stores/notification-store'
import useUserStore from '../stores/user-store'

const TravelLogForm: NextPage = () => {

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [bodyTemperature, setBodyTemperature] = useState(0)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const getCurrentUser = useUserStore((state) => state.getCurrentUser)
  const showNotification = useNotificationStore((state) => state.showNotification)

  const submitTravelLogHandler: FormEventHandler = async (e) => {
    e.preventDefault()

    showNotification('pending', 'Mengirim data...')

    if (submitButtonRef.current) {
      submitButtonRef.current?.classList.add('btn-disabled')
    }

    const data = JSON.stringify({
      nik: getCurrentUser()?.nik,
      date,
      time: time.replace(':', '-'),
      location,
      bodyTemperature
    })

    const response = await fetch('/api/travel-log', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { success, errors } = await response.json()

    if (!success) {
      showNotification('error', 'Gagal menambahkan catatan perjalanan! Coba beberapa saat lagi')
      return
    }

    showNotification('success', 'Berhasil menambahkan catatan perjalanan!')
    try {

    }
    catch (err) {
      showNotification('error', 'Gagal menghubungkan ke server! Periksa jaringan anda atau coba beberapa saat lagi!')
    }

    if (submitButtonRef.current) {
      submitButtonRef.current?.classList.remove('btn-disabled')
    }
  }

  return (
    <div className='w-full py-5 px-10 bg-base-200'>
      <h1 className='mb-10 text-2xl font-bold'>Tambah Catatan Perjalanan</h1>
      <form className='w-full flex flex-col gap-5' onSubmit={submitTravelLogHandler}>
        <label className='input-group input-group-vertical'>
          <span className='py-3'>Tanggal</span>
          <input type='date' required className='w-full input input-bordered' onChange={e => setDate(e.currentTarget.value)} />
        </label>
        <label className='input-group input-group-vertical'>
          <span className='py-3'>Waktu</span>
          <input type='time' required className='w-full input input-bordered' onChange={e => setTime(e.currentTarget.value)} />
        </label>
        <label className='input-group input-group-vertical'>
          <span className='py-3'>Lokasi</span>
          <input type='text' required className='w-full input input-bordered' onChange={e => setLocation(e.currentTarget.value)} />
        </label>
        <label className='input-group input-group-vertical'>
          <span className='py-3'>Suhu tubuh</span>
          <input type='number' step={0.1} required className='w-full input input-bordered' onChange={e => setBodyTemperature(e.currentTarget.value as unknown as number)} />
        </label>
        <button className='btn btn-primary' ref={submitButtonRef}>Tambah</button>
      </form>
    </div>
  )
}

export default TravelLogForm