//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card jadwal
import CardTempatTidur from '../../../components/utilities/CardTempatTidur'

function WebTempatTidurShow() {
  //title page
  document.title = 'Jadwal Tempat Tidur - Si Asri'

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <CardTempatTidur />
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

export default WebTempatTidurShow
