import React, { useState, useEffect } from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import BASE URL API
import Api from '../../../api'

//import component alert
import AlertDataEmpty from '../../../components/utilities/AlertDataEmpty'

//import component loading
import Loading from '../../../components/utilities/Loading'

//import component card jkn mobile
import CardJkn from '../../../components/utilities/CardJkn'

export default function WebJknmobileIndex() {
  //title page
  document.title = 'JKN Mobile - Si Asri'

  //init state
  const [jkns, setJkns] = useState([])
  const [loadingJkn, setLoadingJkn] = useState(true)

  //fetch data jkns
  const fetchDataJkns = async () => {
    //setLoadingJkn "true"
    setLoadingJkn(true)

    //fetch data
    await Api.get('/api/web/jkns').then((response) => {
      //assign response to state "jkns"
      setJkns(response.data.data)

      //setLoadingJkn "false"
      setLoadingJkn(false)
    })
  }

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataJkns"
    fetchDataJkns()
  }, [])

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          {loadingJkn ? (
            <Loading />
          ) : jkns.length > 0 ? (
            jkns.map((jkn) => (
              <CardJkn
                key={jkn.id}
                title={jkn.title}
                embed={jkn.embed}
                content={jkn.content}
                ios={jkn.ios}
                android={jkn.android}
              />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}
