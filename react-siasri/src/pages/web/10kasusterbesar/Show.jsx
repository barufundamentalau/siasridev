//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card rawat inap
import Card10Kasus from '../../../components/utilities/Card10Kasus'

function Web10KasusShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='text-center'>
                <strong className='text-uppercase'>
                  10 Kasus Terbesar Diagnosa
                </strong>
              </h4>
              <hr />
            </div>
            <div className='col-md-12 mb-4'>
              <Card10Kasus />
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

export default Web10KasusShow
