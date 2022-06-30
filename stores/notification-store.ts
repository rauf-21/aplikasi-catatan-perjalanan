import React from 'react'
import create from 'zustand'

type NotificationStore = {
  status: 'success' | 'pending' | 'error',
  isVisible: boolean,
  children: React.ReactNode | null,
  setChildren: (children: React.ReactNode) => void,
  showNotification: (status: NotificationStore['status'], children: NotificationStore['children']) => void,
  hideNotification: () => void
}

const useNotificationStore = create<NotificationStore>((set) => ({
  status: 'success',
  isVisible: false,
  children: null,
  setChildren: (children) => set(() => ({ children })), 
  showNotification: (status, children) => {
    set(() => ({
      status,
      children, 
      isVisible: true 
    }))

    if (status === 'success' || status === 'error') {
      setTimeout(() => {
        set(() => ({ isVisible: false }))
      }, 3000)
    }
  }, 
  hideNotification: () => set(() => ({ isVisible: false }))
}))

export default useNotificationStore