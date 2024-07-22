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
      const response = await fetch(
        'https://simrs.kotamobagu.go.id/webservice/dashboard/layanan/kunjungan'
      )
      const data = await response.json()

      // log data untuk memeriksa strukturnya
      console.log('Data yang diambil:', data)

      // menetapkan respons ke state "kunjungans"
      if (data && data.data) {
        setKunjungans(data.data)
      } else {
        console.error('Struktur data yang tidak terduga:', data)
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
              <div class='row mt-2'>
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
