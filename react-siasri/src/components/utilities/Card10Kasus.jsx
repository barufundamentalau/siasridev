import React from 'react'

export default function Card10Kasus() {
  return (
    <div class='row mt-2'>
      <div className='col-md-4 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-stethoscope'></i> RAWAT JALAN
            </h5>
            <hr />
            <div className='row'>
              <div className='col-md-6 col-6'>DESKRIPSI</div>
              <div className='col-md-6 col-6'>TOTAL</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-4 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-stethoscope'></i> RAWAT DARURAT
            </h5>
            <hr />
            <div className='row'>
              <div className='col-md-6 col-6'>DESKRIPSI</div>
              <div className='col-md-6 col-6'>TOTAL</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-4 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-stethoscope'></i> RAWAT INAP
            </h5>
            <hr />
            <div className='row'>
              <div className='col-md-6 col-6'>DESKRIPSI</div>
              <div className='col-md-6 col-6'>TOTAL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
