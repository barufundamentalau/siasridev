import React, { useState, useEffect } from 'react'

// import layout web
import LayoutWeb from '../../../layouts/Web'

// import komponen alert
import AlertDataEmpty from '../../../components/utilities/AlertDataEmpty'

// import komponen loading
import Loading from '../../../components/utilities/Loading'

// import komponen card kunjungan
import CardKunjungan from '../../../components/utilities/CardKunjungan'

// path import sesuai helpers ID to STRING
import { getTitle } from '../../../helpers/simrsHelpers'

//import BASE URL API SIMRS
import Backend from '../../../api/backend'

function WebKunjunganShow() {
  // title page
  document.title = 'Kunjungan - Si Asri'

  // init state
  const [kunjungans, setKunjungans] = useState([])
  const [loadingKunjungan, setLoadingKunjungan] = useState(true)

  // fetch data kunjungans
  const fetchDataKunjungans = async () => {
    // setLoadingKunjungan "true"
    setLoadingKunjungan(true)

    try {
      // fetch data dari API publik
      const response = await Backend.get('api/web/kunjungan')

      // log data untuk memeriksa strukturnya
      console.log('Data yang diambil:', response.data.data.data)

      // menetapkan respons ke state "kunjungans"
      if (response.data.data.data && response.data.data.data) {
        setKunjungans(response.data.data.data)
      } else {
        console.error(
          'Struktur data yang tidak terduga:',
          response.data.data.data
        )
      }

      // setLoadingKunjungan "false"
      setLoadingKunjungan(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoadingKunjungan(false)
    }
  }

  // hook useEffect
  useEffect(() => {
    // panggil metode "fetchDataKunjungans"
    fetchDataKunjungans()
  }, [])

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='text-center'>
                <strong className='text-uppercase'>
                  KUNJUNGAN RSUD KOTAMOBAGU
                </strong>
              </h4>
              <hr />
            </div>
            <div className='col-md-12 mb-4'>
              <div className='row mt-2'>
                {loadingKunjungan ? (
                  <Loading />
                ) : kunjungans.length > 0 ? (
                  kunjungans.map((kunjungan) => (
                    <CardKunjungan
                      key={kunjungan.ID}
                      title={getTitle(kunjungan.ID)}
                      value={kunjungan.VALUE}
                      lastUpdated={kunjungan.LASTUPDATED}
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

export default WebKunjunganShow
