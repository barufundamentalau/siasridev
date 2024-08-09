//import react
import React, { useState, useEffect } from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import BASE URL API
import Api from '../../../api'

//import component alert
import AlertDataEmpty from '../../../components/utilities/AlertDataEmpty'

//import component loading
import Loading from '../../../components/utilities/Loading'

//import component card tentang
import CardTentang from '../../../components/utilities/CardTentang'

function WebTentangShow() {
  // title page
  document.title = 'Tentang - Si Asri'

  //init state
  const [abouts, setAbouts] = useState([])
  const [loadingAbout, setLoadingAbout] = useState(true)

  //fetch data abouts
  const fetchDataAbouts = async () => {
    //setLoadingAbout "true"
    setLoadingAbout(true)

    //fetch data
    await Api.get('/api/web/abouts').then((response) => {
      //assign response to state "abouts"
      setAbouts(response.data.data)

      //setLoadingAbout "false"
      setLoadingAbout(false)
    })
  }

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataAbouts"
    fetchDataAbouts()
  }, [])

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
              {loadingAbout ? (
                <Loading />
              ) : abouts.length > 0 ? (
                abouts.map((about) => (
                  <CardTentang
                    key={about.id}
                    image={about.image}
                    title={about.title}
                    embed={about.embed}
                    content={about.content}
                  />
                ))
              ) : (
                <AlertDataEmpty />
              )}
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
