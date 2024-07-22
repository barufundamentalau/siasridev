import React, { useState, useEffect } from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import BASE URL API
import Api from '../../../api'

//import component alert
import AlertDataEmpty from '../../../components/utilities/AlertDataEmpty'

//import component loading
import Loading from '../../../components/utilities/Loading'

//import component card service
import CardService from '../../../components/utilities/CardService'

export default function WebServicesIndex() {
  //title page
  document.title = 'Layanan - Si Asri'

  //init state
  const [services, setServices] = useState([])
  const [loadingService, setLoadingService] = useState(true)

  //fetch data services
  const fetchDataServices = async () => {
    //setLoadingService "true"
    setLoadingService(true)

    //fetch data
    await Api.get('/api/web/services').then((response) => {
      //assign response to state "services"
      setServices(response.data.data)

      //setLoadingService "false"
      setLoadingService(false)
    })
  }

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataServices"
    fetchDataServices()
  }, [])

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='text-center'>
                <strong className='text-uppercase'>
                  LAYANAN RSUD KOTAMOBAGU
                </strong>
              </h4>
              <hr />
            </div>
            <div className='mt-2'>
              {loadingService ? (
                <Loading />
              ) : services.length > 0 ? (
                services.map((service) => (
                  <CardService
                    key={service.id}
                    name={service.name}
                    image={service.image}
                    phone={service.phone}
                  />
                ))
              ) : (
                <AlertDataEmpty />
              )}
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}
