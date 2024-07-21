import React from 'react'
import LayoutWeb from '../../../layouts/Web'
import CardThx from '../../../components/utilities/CardThx'

function WebThxShow() {
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
          <CardThx />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebThxShow
