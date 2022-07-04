import type { NextPage } from 'next'
import type { FormEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { sort } from 'fast-sort'

import type { TravelLog } from '../types/travel-log'
import useUserStore from '../stores/user-store'

type Sort = 'noSort' | 'ascending' | 'descending'

const TravelLogs: NextPage = () => {
  const [travelLogs, setTravelLogs] = useState<TravelLog[]>([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [dateSort, setDateSort] = useState<Sort>('ascending')
  const [timeSort, setTimeSort] = useState<Sort>('noSort')
  const [locationSort, setLocationSort] = useState<Sort>('noSort')
  const [bodyTemperatureSort, setBodyTemperatureSort] = useState<Sort>('noSort')
  const getCurrentUser = useUserStore((state) => state.getCurrentUser)

  useEffect(() => {
    const fetchTravelLogs = async () => {
      const response = await fetch(`/api/travel-log?nik=${getCurrentUser()?.nik}`)
      const { data } = await response.json()

      setTravelLogs(data.map((travelLog: TravelLog) => ({
        ...travelLog,
        date: travelLog.date,
        time: travelLog.time
      })))
    }

    fetchTravelLogs()
  }, [getCurrentUser])

  const humanReadableDate = (date: string) => new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const resetSort = (options: { except: string[] }) => {
    const { except } = options

    if (!(except.some(el => el === 'dateSort'))) {
      setDateSort('noSort')
    }
    if (!(except.some(el => el === 'timeSort'))) {
      setTimeSort('noSort')
    }
    if (!(except.some(el => el === 'locationSort'))) {
      setLocationSort('noSort')
    }
    if (!(except.some(el => el === 'bodyTemperatureSort'))) {
      setBodyTemperatureSort('noSort')
    }
  }

  const sortDate = (dateSort: Sort) => {
    setDateSort(dateSort)

    if (dateSort === 'noSort') {
      return
    }

    resetSort({ except: ['dateSort'] })

    const sortedTravelLogs = dateSort === 'ascending'
      ? sort(travelLogs).asc((travelLog) => travelLog.date)
      : sort(travelLogs).desc((travelLog) => travelLog.date)

    setTravelLogs(sortedTravelLogs)
  }

  const sortTime = (timeSort: Sort) => {
    setTimeSort(timeSort)

    if (timeSort === 'noSort') {
      return
    }

    resetSort({ except: ['timeSort'] })

    const sortedTravelLogs = timeSort === 'ascending'
      ? sort(travelLogs).asc((travelLog) => travelLog.time)
      : sort(travelLogs).desc((travelLog) => travelLog.time)

    setTravelLogs(sortedTravelLogs)
  }

  const sortLocation = (locationSort: Sort) => {
    setLocationSort(locationSort)

    if (locationSort === 'noSort') {
      return
    }

    resetSort({ except: ['locationSort'] })

    const sortedTravelLogs = locationSort === 'ascending'
      ? sort(travelLogs).asc((travelLog) => travelLog.location)
      : sort(travelLogs).desc((travelLog) => travelLog.location)

    setTravelLogs(sortedTravelLogs)
  }

  const sortBodyTemperature = (bodyTemperatureSort: Sort) => {
    setBodyTemperatureSort(bodyTemperatureSort)

    if (bodyTemperatureSort === 'noSort') {
      return
    }

    resetSort({ except: ['bodyTemperatureSort'] })

    const sortedTravelLogs = bodyTemperatureSort === 'ascending'
      ? sort(travelLogs).asc((travelLog) => travelLog.bodyTemperature)
      : sort(travelLogs).desc((travelLog) => travelLog.bodyTemperature)

    setTravelLogs(sortedTravelLogs)
  }

  const searchHandler: FormEventHandler = async (e) => {
    e.preventDefault()

    const response = await fetch(`/api/travel-log?nik=${getCurrentUser()?.nik}&date=${date}&time=${time}&location=${location}`)
    const { data } = await response.json()

    setTravelLogs(data)
  }

  return (
    <div className='w-full py-5 px-10 bg-base-200 rounded'>
      <h1 className='mb-10 text-2xl font-bold'>Catatan Perjalanan</h1>
      <div tabIndex={0} className='mb-5 collapse collapse-arrow bg-base-200 rounded-box'>
        <input type='checkbox' />
        <div className='collapse-title text-xl font-medium'>
          <h2 className='font-bold'>Cari data</h2>
        </div>
        <div className='collapse-content'>
          <form tabIndex={0} className='my-5 flex justify-start gap-4' onSubmit={searchHandler}>
            <label className='w-fit input-group'>
              <span>Tanggal</span>
              <input type='date' className='input' onChange={e => setDate(e.currentTarget.value)} />
            </label>
            <label className='w-fit input-group'>
              <span>Waktu</span>
              <input type='time' className='input' onChange={e => setTime(e.currentTarget.value)} />
            </label>
            <label className='w-full input-group'>
              <span>Lokasi</span>
              <input type='text' className='w-full input' onChange={e => setLocation(e.currentTarget.value)} />
            </label>
            <button type='submit' className='btn btn-primary'>Cari</button>
          </form>
        </div>
      </div>
      <div tabIndex={0} className='mb-5 collapse collapse-arrow bg-base-200 rounded-box'>
        <input type='checkbox' />
        <div className='collapse-title text-xl font-medium'>
          <h2 className='font-bold'>Urutkan data</h2>
        </div>
        <div className='collapse-content'>
          <form tabIndex={0} className='my-5 flex justify-start gap-4 flex-wrap'>
            <label className='w-fit input-group'>
              <span>Tanggal</span>
              <select className='select' value={dateSort} onChange={e => sortDate(e.currentTarget.value as Sort)} >
                <option value='noSort'>-</option>
                <option value='ascending'>Naik</option>
                <option value='descending'>Menurun</option>
              </select>
            </label>
            <label className='w-fit input-group'>
              <span>Waktu</span>
              <select className='select' value={timeSort} onChange={e => sortTime(e.currentTarget.value as Sort)}>
                <option value='noSort'>-</option>
                <option value='ascending'>Naik</option>
                <option value='descending'>Menurun</option>
              </select>
            </label>
            <label className='w-fit input-group'>
              <span>Lokasi</span>
              <select className='select' value={locationSort} onChange={e => sortLocation(e.currentTarget.value as Sort)}>
                <option value='noSort'>-</option>
                <option value='ascending'>A-Z</option>
                <option value='descending'>Z-A</option>
              </select>
            </label>
            <label className='w-fit input-group'>
              <span className='text-center'>Suhu Tubuh</span>
              <select className='select' value={bodyTemperatureSort} onChange={e => sortBodyTemperature(e.currentTarget.value as Sort)}>
                <option value='noSort'>-</option>
                <option value='ascending'>Terendah</option>
                <option value='descending'>Tertinggi</option>
              </select>
            </label>
          </form>
        </div>
      </div>
      <div className='w-full'>
      </div>
      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full border border-4 border-base-100'>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Lokasi</th>
              <th>Suhu Tubuh</th>
            </tr>
          </thead>
          <tbody>
            {
              travelLogs.length > 0
                ? (
                  travelLogs.map((travelLog, index) => (
                    <tr key={index}>
                      <td>{humanReadableDate(travelLog.date)}</td>
                      <td>{travelLog.time.replace('-', ':')}</td>
                      <td>{travelLog.location}</td>
                      <td>{travelLog.bodyTemperature}</td>
                    </tr>
                  ))
                )
                : (
                  <tr>
                    <td colSpan={4} className='text-center'>Data tidak ditemukan</td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TravelLogs