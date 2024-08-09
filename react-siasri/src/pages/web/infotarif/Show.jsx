//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card jadwal
import CardInfoTarif from '../../../components/utilities/CardInfoTarif'

function WebInfoTarifShow() {
  //title page
  document.title = 'Info Tarif - Si Asri'
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <CardInfoTarif />
        </div>
        {/* <div className='row'>
          <div className='col-md-12 text-center'>
            <small className='text-muted'>Powered by SIMRS</small>
          </div>
        </div> */}
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebInfoTarifShow
