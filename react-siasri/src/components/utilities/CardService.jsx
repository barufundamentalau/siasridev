import React from 'react'

export default function CardService(props) {
  return (
    <div className='col-md-4 mb-4'>
      <div
        className='card border-0 shadow-sm rounded-3 text-center text-uppercase'
        key={props.key}
      >
        <div className='card-body mt-2'>
          <div className='mb-3'>
            <img
              src={props.image}
              className='w-100 rounded-lg p-2 mb-2 bg-light'
              alt={props.name}
            />
          </div>
          <h5>{props.name}</h5>
          <hr />
          <a
            href={`https://api.whatsapp.com/send?phone=${props.phone}&text=Halo%20kak%2C%20saya%20ingin%20chat%20dengan%20%3A%20${props.name}`}
            className='btn btn-success'
            target='_blank'
            rel='noopener noreferrer'
          >
            Hubungi Sekarang
          </a>
        </div>
      </div>
    </div>
  )
}
