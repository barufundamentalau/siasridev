import React from 'react'

export default function LoadingHome() {
  return (
    <>
      <div className='text-center'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading Home...</span>
        </div>
      </div>
      <div className='text-center mt-2'>Loading Home...</div>
    </>
  )
}
