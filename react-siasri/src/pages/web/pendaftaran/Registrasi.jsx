import React from 'react'
import LayoutWeb from '../../../layouts/Web'
import CardRegistrasi from '../../../components/utilities/CardRegistrasi'

function WebRegistrasiShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='text-center'>
                <strong className='text-uppercase'>
                  REGISTRASI ANTRIAN PASIEN PRIORITAS
                </strong>
              </h4>
              <hr />
            </div>
          </div>
          <div className='col-md-12 mb-4'>
            <div class='mt-0'>
              <CardRegistrasi />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <small className='text-muted'>Powered by SIMRS</small>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebRegistrasiShow
