//import react
import React from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import component card laboratorium
import CardLaboratorium from '../../../components/utilities/CardLaboratorium'

function WebLaboratoriumShow() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <CardLaboratorium />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebLaboratoriumShow
