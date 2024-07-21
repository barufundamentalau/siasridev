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
          <CardRawatinap />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebRawatinapShow
