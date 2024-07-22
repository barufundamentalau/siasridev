// import React from 'react'
import React, { useState, useEffect } from 'react'

//import BASE URL API
import Api from '../../api'

// import komponen alert
import AlertDataEmpty from '../../components/utilities/AlertDataEmpty'

// import komponen loading
import Loading from '../../components/utilities/Loading'

function CardJadwalDokter() {
  // title page
  document.title = 'Jadwal Dokter - Si Asri'

  // init state
  const [jadwals, setJadwals] = useState([])
  const [loadingJadwal, setLoadingJadwal] = useState(true)
  const [selectedDay, setSelectedDay] = useState('')

  // fetch data jadwals
  const fetchDataJadwals = async () => {
    // setLoadingJadwal "true"
    setLoadingJadwal(true)

    //fetch data
    await Api.get('/api/web/jadwaldokter').then((response) => {
      //assign response to state "jadwals"
      setJadwals(response.data.data.data)

      //setLoadingService "false"
      setLoadingJadwal(false)
    })
  }

  // handle change day
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value)
  }

  // filter jadwals by selected day
  const filteredJadwals = selectedDay
    ? jadwals.filter((jadwal) => jadwal.NM_HARI === selectedDay)
    : jadwals

  // hook useEffect
  useEffect(() => {
    // panggil metode "fetchDataJadwals"
    fetchDataJadwals()
  }, [])

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h4 className='text-center'>
          <strong className='text-uppercase'>Jadwal Dokter</strong>
        </h4>
        <hr />
      </div>
      <div className='col-md-12 mb-4'>
        <div className='row mt-2'>
          <div className='col-md-12 mb-4'>
            <div className='card border-0 shadow-sm rounded-3 text-center text-uppercase'>
              <div className='card-body mt-2'>
                <h5>
                  <select
                    value={selectedDay}
                    onChange={handleDayChange}
                    className='form-select'
                  >
                    <option value='PILIH HARI'>PILIH HARI</option>
                    <option value='SENIN'>SENIN</option>
                    <option value='SELASA'>SELASA</option>
                    <option value='RABU'>RABU</option>
                    <option value='KAMIS'>KAMIS</option>
                    <option value='JUMAT'>JUMAT</option>
                    <option value='SABTU'>SABTU</option>
                  </select>
                </h5>
                <hr />
                <div className='table-responsive'>
                  <table className='table table-bordered table-striped'>
                    <thead>
                      <tr>
                        <th scope='col'>NO.</th>
                        <th scope='col'>KLINIK</th>
                        <th scope='col'>DOKTER</th>
                        <th scope='col'>JAM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingJadwal ? (
                        <Loading />
                      ) : jadwals.length > 0 ? (
                        filteredJadwals.map((jadwal, index) => (
                          <tr key={jadwal.ID}>
                            <td>{index + 1}</td>
                            <td>{jadwal.REFERENSI.POLI.NMPOLI}</td>
                            <td>{jadwal.NM_DOKTER}</td>
                            <td>{jadwal.JAM}</td>
                          </tr>
                        ))
                      ) : (
                        <AlertDataEmpty />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardJadwalDokter
