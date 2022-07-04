import type { NextPage } from 'next'

import DashboardMenu from '../../components/DashboardMenu'
import MainLayout from '../../layouts/MainLayout'

const DashboardPage: NextPage = () => {
  return (
    <>
      <MainLayout>
        <DashboardMenu />
      </MainLayout>
    </>
  )
}

export default DashboardPage