import React from 'react'

export default function CardTentang({ myKey, image, title, embed, content }) {
  return (
    <div className='row'>
      <div className='col-md-7 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h4>{title}</h4>
            <hr />
            <div className='text-center mb-3'>
              <iframe
                src={embed}
                className='w-100'
                style={{ height: '320px' }}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
      <div className='col-md-5 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-hand-holding-heart'></i> ALUR PELAYANAN
            </h5>
            <hr />
            <div className='d-grid' />
            <img
              src={image}
              className='w-100 rounded-lg p-2 mb-2 bg-light'
              alt={title}
            />
            {/* <div className='d-grid gap-2'>TES</div> */}
            <a
              href={image}
              className='btn btn-success w-100'
              target='_blank'
              rel='noopener noreferrer'
            >
              Download {title}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
