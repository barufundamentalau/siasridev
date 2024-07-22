import React from 'react'

export default function CardService(props) {
  return (
    <div className='col-md-4 mb-4'>
      <div
        className='card border-0 shadow-sm rounded-3 text-center text-uppercase'
        key={props.key}
      >
        <div className='card-body mt-2'>
          <div className='text-center mb-3'>
            <img
              src={props.image}
              className='w-100 rounded-lg p-2 mb-2 bg-light'
            />
          </div>
          <h5>{props.name}</h5>
          <hr />
          <h6>
            <i>{props.phone}</i>
          </h6>
        </div>
      </div>
    </div>
  )
}
