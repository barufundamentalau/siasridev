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
              <h4>
                <strong className='text-uppercase'>
                  REGISTRASI ANTRIAN PASIEN BARU
                </strong>
              </h4>
              <hr />
            </div>
          </div>
          <CardRegistrasi />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebRegistrasiShow
