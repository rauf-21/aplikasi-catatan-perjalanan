import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'

const Notification: NextPage<{
  isVisible: boolean,
  status: 'success' | 'pending' | 'error',
  children: React.ReactNode
}> = (props) => {
  const { isVisible, status, children } = props

  const successIcon = <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current flex-shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>

  const pendingIcon = <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-info flex-shrink-0 w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path></svg>

  const errorIcon = <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current flex-shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>

  return (
    <>
      {
        isVisible && (
          <div className={`alert ${status === 'success' && 'alert-success'} ${status === 'error' && 'alert-error'} shadow-lg w-1/2 fixed top-5 inset-x-0 mx-auto`}>
            <div>
              {status === 'success' && successIcon}
              {status === 'pending' && pendingIcon}
              {status === 'error' && errorIcon}
              <span>{children}</span>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Notification