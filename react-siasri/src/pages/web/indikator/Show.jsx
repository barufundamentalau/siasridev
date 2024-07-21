//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card kunjungan
import CardIndikator from '../../../components/utilities/CardIndikator'

function WebIndikatorShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <CardIndikator />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebIndikatorShow
