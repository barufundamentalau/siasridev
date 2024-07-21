import React from 'react'
import LayoutWeb from '../../../layouts/Web'
import CardAmbilAntrian from '../../../components/utilities/CardAmbilAntrian'

function WebAmbilAntrianShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4>
                <strong className='text-uppercase'>CardAmbilAntrian</strong>
              </h4>
              <hr />
            </div>
          </div>
          <CardAmbilAntrian />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebAmbilAntrianShow
