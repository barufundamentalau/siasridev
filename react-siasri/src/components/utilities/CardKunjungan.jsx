import React from 'react'

export default function CardKunjungan(props) {
  return (
    <div className='col-md-4 mb-4'>
      <div
        className='card border-0 shadow-sm rounded-3 text-center text-uppercase'
        key={props.key}
      >
        <div className='card-body mt-2 '>
          <h5>{props.title}</h5>
          <hr />
          <h4>
            <strong className='text-uppercase'>{props.value}</strong>
          </h4>
          <p className='card-text'>
            <small>
              <i className='fa fa-calendar-alt'></i>
              {'\t'}
              {props.lastUpdated}
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}
