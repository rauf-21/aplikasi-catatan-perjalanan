import type { AppProps } from 'next/app'

import '../styles/globals.css'
import Notification from '../components/Notification'
import useNotificationStore from '../stores/notification-store'

function MyApp({ Component, pageProps }: AppProps) {
  const { isVisible, status, children } = useNotificationStore((state) => ({
    isVisible: state.isVisible,
    status: state.status,
    children: state.children
  }))

  return (
    <>
      <Notification isVisible={isVisible} status={status} >
        {children}
      </Notification>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
