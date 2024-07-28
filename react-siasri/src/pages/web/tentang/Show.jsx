//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card 10 kasus terbesar diagnosa
import CardTentang from '../../../components/utilities/CardTentang'

function WebTentangShow() {
  // title page
  document.title = '10 Kasus Terbesar Diagnosa - Si Asri'

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='text-center'>
                <strong className='text-uppercase'>TENTANG SI ASRI</strong>
              </h4>
              <hr />
            </div>
            <div className='col-md-12 mb-4'>
              <CardTentang />
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

export default WebTentangShow
