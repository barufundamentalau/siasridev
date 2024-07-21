//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card 10 kasus terbesar diagnosa
import Card10Kasus from '../../../components/utilities/Card10Kasus'

function WebRawatinapShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <Card10Kasus />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebRawatinapShow
