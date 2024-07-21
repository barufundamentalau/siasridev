import React from 'react'

export default function CardJkn(props) {
  return (
    <div className='row' key={props.key}>
      <div className='col-md-7 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h4>{props.title}</h4>
            <hr />
            <div className='text-center mb-3'>
              <iframe
                src={props.embed}
                className='w-100'
                style={{ height: '320px' }}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.content }} />
          </div>
        </div>
      </div>
      <div className='col-md-5 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-download'></i> DOWNLOAD JKN MOBILE
            </h5>
            <hr />
            <div className='row'>
              <div className='col-md-2 col-2'>
                <div className='icon-info-jkn'>
                  <img
                    src='/src/assets/images/app-store.png'
                    alt='Apple Icon'
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>
              </div>
              <div className='col-md-10 col-10'>
                <div className='sub-title-info'>
                  <a
                    href={props.ios}
                    className='btn btn-success shadow-sm rounded-sm px-4'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Download di AppStore
                  </a>
                </div>
              </div>
              <div className='col-md-2 col-2'>
                <div className='icon-info-jkn'>
                  <img
                    src='/src/assets/images/game.png'
                    alt='Android Icon'
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>
              </div>
              <div className='col-md-10 col-10'>
                <div className='sub-title-info'>
                  <a
                    href={props.android}
                    className='btn btn-success shadow-sm rounded-sm px-4'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Download di PlayStore
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
