import { NextPage } from 'next'

import MainLayout from '../../layouts/MainLayout'
import TravelLogs from '../../components/TravelLogs'

const TravelLogsPage: NextPage = () => {
  return (
    <MainLayout>
      <TravelLogs />
    </MainLayout>
  )
}

export default TravelLogsPage