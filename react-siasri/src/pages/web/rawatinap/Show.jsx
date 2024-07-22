//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card rawat inap
import CardRawatinap from '../../../components/utilities/CardRawatinap'

function WebRawatinapShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='text-center'>
                <strong className='text-uppercase'>CARD RAWAT INAP</strong>
              </h4>
              <hr />
            </div>
            <div className='col-md-12 mb-4'>
              <CardRawatinap />
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

export default WebRawatinapShow
