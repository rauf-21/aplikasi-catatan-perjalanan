import type { NextPage } from 'next'

import NavigationBar from '../../components/NavigationBar'
import Profile from '../../components/Profile'
import DashboardMenu from '../../components/DashboardMenu'

const DashboardPage: NextPage = () => {
  return (
    <>
      <NavigationBar />
      <section className='w-full px-5 py-10 flex flex-row gap-10'>
        <Profile />
        <DashboardMenu />
      </section>
    </>
  )
}

export default DashboardPage