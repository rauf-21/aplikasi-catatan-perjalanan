import type { NextPage } from 'next'

import MainLayout from '../../layouts/MainLayout'
import TravelLogForm from '../../components/TravelLogForm'

const AddLogPage: NextPage = () => {
  return (
    <MainLayout>
      <TravelLogForm />
    </MainLayout>
  )
}

export default AddLogPage