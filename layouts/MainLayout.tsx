import type { NextPage } from 'next'

import NavigationBar from '../components/NavigationBar'
import Profile from '../components/Profile'

const MainLayout: NextPage<{
  children: React.ReactNode
}> = (props) => {
  const { children } = props

  return (
    <>
      <NavigationBar />
      <section className='w-full px-5 py-10 flex flex-row gap-10'>
        <>
          <Profile />
          {children}
        </>
      </section>
    </>
  )
}

export default MainLayout