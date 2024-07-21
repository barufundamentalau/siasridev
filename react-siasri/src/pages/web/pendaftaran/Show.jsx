import React from 'react'
import LayoutWeb from '../../../layouts/Web'
import CardPendaftaran from '../../../components/utilities/CardPendaftaran.jsx'

function WebPendaftaranShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4>
                <strong className='text-uppercase'>
                  PENDAFTARAN PASIEN PRIORITAS
                </strong>
              </h4>
              <hr />
            </div>
          </div>
          <CardPendaftaran />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebPendaftaranShow
