import React, { useState, useEffect } from 'react'

// import layout web
import LayoutWeb from '../../../layouts/Web'

// import komponen alert
import AlertDataEmpty from '../../../components/utilities/AlertDataEmpty'

// import komponen loading
import Loading from '../../../components/utilities/Loading'

//import component card pengunjung
import CardPengunjung from '../../../components/utilities/CardPengunjung'

// path import sesuai helpers ID to STRING
import { getTitle } from '../../../helpers/simrsHelpers'

//import BASE URL API SIMRS
import Backend from '../../../api/backend'

function WebPengunjungShow() {
  // title page
  document.title = 'Pengunjung - Si Asri'

  // init state
  const [pengunjungs, setPengunjungs] = useState([])
  const [loadingPengunjung, setLoadingPengunjung] = useState(true)

  // fetch data pengunjungs
  const fetchDataPengunjungs = async () => {
    // setLoadingKunjungan "true"
    setLoadingPengunjung(true)

    try {
      // fetch data dari API publik menggunakan axios instance "Simrs"
      const response = await Backend.get('api/web/pengunjung')

      // log data untuk memeriksa strukturnya
      console.log('Data yang diambil:', response.data.data.data)

      // menetapkan respons ke state "pengunjungs"
      if (response.data.data.data && response.data.data.data) {
        setPengunjungs(response.data.data.data)
      } else {
        console.error(
          'Struktur data yang tidak terduga:',
          response.data.data.data
        )
      }

      // setLoadingKunjungan "false"
      setLoadingPengunjung(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoadingPengunjung(false)
    }
  }

  // hook useEffect
  useEffect(() => {
    // panggil metode "fetchDataKunjungans"
    fetchDataPengunjungs()
  }, [])

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='text-center'>
                <strong className='text-uppercase'>
                  PENGUNJUNG RSUD KOTAMOBAGU
                </strong>
              </h4>
              <hr />
            </div>
            <div className='col-md-12 mb-4'>
              <div className='row mt-2'>
                {loadingPengunjung ? (
                  <Loading />
                ) : pengunjungs.length > 0 ? (
                  pengunjungs.map((pengunjung) => (
                    <CardPengunjung
                      key={pengunjung.ID}
                      title={getTitle(pengunjung.ID)}
                      value={pengunjung.VALUE}
                      lastUpdated={pengunjung.LASTUPDATED}
                    />
                  ))
                ) : (
                  <AlertDataEmpty />
                )}
              </div>
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

export default WebPengunjungShow
