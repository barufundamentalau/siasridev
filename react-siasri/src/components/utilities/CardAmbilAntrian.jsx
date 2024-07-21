import React from 'react'

export default function CardAmbilAntrian(props) {
  return (
    <div className='row'>
      <div className='col-md-7 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h4>CardAmbilAntrian</h4>
          </div>
        </div>
      </div>
      <div className='col-md-5 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-map-marked-alt'></i> CardAmbilAntrian
            </h5>
            <hr />
            <div className='row'>
              <div className='col-md-2 col-2'>
                <div className='icon-info-green'>
                  <i className='fa fa-map-marker-alt'>ASDF</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
