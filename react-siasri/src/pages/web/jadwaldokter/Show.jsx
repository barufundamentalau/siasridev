//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card jadwal
import CardJadwal from '../../../components/utilities/CardJadwalDokter'

function WebJadwalShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <CardJadwal />
        </div>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <small className='text-muted'>Powered by SIMRS</small>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebJadwalShow
