import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavigationBar: NextPage = () => {
  const { pathname } = useRouter()

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>PeduliDiri</a>
      </div>
      <div className='flex-none pr-3'>
        <ul className='menu menu-horizontal p-0 gap-2'>
          <li>
            <Link href='/dashboard'>
              <a className={`${pathname.includes('dashboard') ? 'bg-primary text-white' : ''}`}>Dasbor</a>
            </Link>
          </li>
          <li>
            <Link href='/travel-logs'>
              <a className={`${pathname.includes('travel-logs') ? 'bg-primary text-white' : ''}`}>Catatan Perjalanan</a>
            </Link>
          </li>
          <li>
            <Link href='/add-log'>
              <a className={`${pathname.includes('add-log') ? 'bg-primary text-white' : ''}`}>Tambah Catatan</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationBar