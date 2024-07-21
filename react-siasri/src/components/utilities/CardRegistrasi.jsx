import React, { useState, useEffect } from 'react'

//import moment
import moment from 'moment'

//import BASE URL API
import Api from '../../api'

//import BASE URL API SIMRS
import Simrs from '../../api/simrs'

//import toast
import toast from 'react-hot-toast'

//import toast
import { Link, useLocation } from 'react-router-dom'

export default function CardRegistrasi() {
  // form identitas pasien
  const location = useLocation()
  const { state } = location
  const { dataPasien, penjamin } = state || {}

  // init state
  const [okliniks, setoKliniks] = useState([])
  const [klinik, setKlinik] = useState('')
  const [loadingKlinik, setLoadingKlinik] = useState(false)
  const [nomorKartu, setNomorKartu] = useState('')
  const [nomorRujukan, setNomorRujukan] = useState('')
  const [jadwals, setJadwals] = useState([])
  const [openjamin, setoPenjamin] = useState('')
  const [jadwalDokter, setJadwalDokter] = useState('')
  const [tanggalKunjungan, setTanggalKunjungan] = useState('')
  const [dataRujukanDitemukan, setDataRujukanDitemukan] = useState(false)

  // fetch data kliniks
  const fetchDataKlinikTujuans = async () => {
    // setLoadingJadwal "true"
    setLoadingKlinik(true)
    //fetch data
    await Api.get('/api/web/kliniktujuan').then((response) => {
      //assign response to state "Kliniks"
      setoKliniks(response.data.data.data)

      //setLoadingService "false"
      setLoadingKlinik(false)
    })
  }

  // fetch data rujukan
  const fetchDataRujukans = async (a) => {
    // fetchDataRujukan "true"
    // setLoadingRujukan(true)
    //fetch data
    await Simrs.get(
      'webservice/registrasionline/plugins/getListRujukanKartu?noKartu=' +
        nomorKartu +
        '&faskes=' +
        a
    ).then((response) => {
      console.log(response)
      if (response.data.success) {
        setNomorRujukan(response.data.data.rujukan[0].noKunjungan)
        setKlinik(response.data.data.rujukan[0].poliRujukan.kode)
        toast.success('Data rujukan berhasil ditemukan!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      } else {
        toast.error('Data rujukan tidak ditemukan.', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      }

      //assign response to state "Rujukans"
      // setoRujukans(response.data.data.data)

      //setLoadingService "false"
      // setLoadingRujukan(false)
    })
  }

  // fetch data jadwals
  const fetchDataJadwals = async () => {
    try {
      const response = await Simrs.get(
        `/apps/RegOnline//api/jadwaldokter/?TANGGAL=${tanggalKunjungan}&POLI=${klinik}`
      )
      if (response.data.success) {
        toast.success('Data jadwal dokter berhasil ditemukan!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
        setJadwals(response.data.data)
      } else {
        toast.error('Data jadwal dokter tidak ditemukan.', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat mengambil data jadwal.', {
        duration: 4000,
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
  }

  useEffect(() => {
    // panggil metode "fetchDataKlinikTujuans"
    fetchDataKlinikTujuans()
  }, [])

  useEffect(() => {
    if (klinik !== '') {
      fetchDataJadwals()
    }
  }, [klinik])
  // useEffect(() => {
  //   if (nomorKartu > 12) {
  //     fetchDataRujukans()
  //   }
  // }, [nomorKartu])

  // const [isBpjsJkn, setIsBpjsJkn] = useState(false)

  useEffect(() => {
    console.log(state)
  }, [dataPasien])

  // Format tanggal menggunakan moment.js
  const formatTanggal = (dateString) => {
    return dateString ? moment(dateString).format('YYYY-MM-DD') : ''
  }

  return (
    <div className='row'>
      <div className='col-md-6 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-user-alt'></i> IDENTITAS PASIEN
            </h5>
            <hr />
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='fa fa-check'></i>
              </span>
              <input
                type='text'
                className='form-control'
                value={dataPasien.NORM}
                placeholder='No. Rekam Medis'
                readOnly
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='fa fa-check'></i>
              </span>
              <input
                type='text'
                className='form-control'
                value={dataPasien.NAMA}
                placeholder='Nama Pasien'
                readOnly
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='fa fa-check'></i>
              </span>
              <input
                type='text'
                className='form-control'
                value={dataPasien.TEMPAT_LAHIR}
                placeholder='Tempat Lahir'
                readOnly
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='fa fa-check'></i>
              </span>
              <input
                type='text'
                className='form-control'
                value={formatTanggal(dataPasien.TANGGAL_LAHIR)}
                placeholder='Tanggal Lahir'
                readOnly
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='fa fa-check'></i>
              </span>
              <input
                type='text'
                className='form-control'
                value={dataPasien.KARTUIDENTITAS[0].NOMOR}
                placeholder='NIK Pasien'
                readOnly
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='fa fa-check'></i>
              </span>
              <input
                type='text'
                className='form-control'
                value={dataPasien.KONTAK[0].NOMOR}
                placeholder='Kontak Pasien'
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-6 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <h5>
              <i className='fa fa-hospital-user'></i> FILTER PENJAMIN / CARA
              BAYAR
            </h5>
            <hr />
            <div className='form-group custom-select select'>
              <label className='mb-1'>Filter Penjamin / Cara Bayar</label>
              <select
                className='form-control'
                value={openjamin}
                onChange={(e) => setoPenjamin(e.target.value)}
              >
                {penjamin &&
                  penjamin.map((d, k) => {
                    return (
                      <option key={k} value={d.ID}>
                        {d.DESKRIPSI}
                      </option>
                    )
                  })}
              </select>
            </div>
            <div className='col mb-3 mt-2'>
              <label className='mb-1'>Tanggal Kunjungan:</label>
              <input
                type='date'
                className='form-control'
                value={tanggalKunjungan}
                onChange={(e) => setTanggalKunjungan(e.target.value)}
                required
              />
            </div>
            <div className='row'>
              {openjamin === '2' && (
                <div className='col-md-6 col-sm-6'>
                  <label className=' mb-1'>No. Kartu Jaminan JKN / BPJS:</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='No. Kartu Jaminan JKN / BPJS'
                    value={nomorKartu}
                    onChange={(e) => {
                      setNomorKartu(e.target.value)
                    }}
                  />
                </div>
              )}
              {openjamin === '2' && (
                <div className='col-md-6 col-sm-6 mt-md-4'>
                  <button
                    className='btn btn-success shadow-sm rounded-sm m-1'
                    onClick={() => {
                      fetchDataRujukans(1)
                    }}
                  >
                    Cari Rujukan
                  </button>
                  <button
                    className='btn btn-success shadow-sm rounded-sm'
                    onClick={() => {
                      fetchDataRujukans(2)
                    }}
                  >
                    Kontrol / SPRI
                  </button>
                </div>
              )}
            </div>

            {openjamin === '2' && (
              <div className='form-group mt-4'>
                <label className='mb-1'>Masukkan No. Rujukan:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Masukkan No. Rujukan'
                  value={nomorRujukan}
                  disabled
                />
              </div>
            )}
            <div className='form-group custom-select select'>
              <label className='mb-1'>Klinik Tujuan</label>
              <select
                className='form-control'
                value={klinik}
                onChange={(e) => {
                  setKlinik(e.target.value)
                }}
                disabled={openjamin === '2' ? true : false}
              >
                {okliniks &&
                  okliniks.map((d, k) => {
                    let KODEPOLI = ''
                    if (d.REFERENSI.PENJAMIN?.BPJS) {
                      KODEPOLI = d.REFERENSI.PENJAMIN.BPJS.KDPOLI
                    }
                    return (
                      <option key={k} value={KODEPOLI}>
                        {d.DESKRIPSI + ' (' + KODEPOLI + ')'}
                      </option>
                    )
                  })}
              </select>
            </div>
            <div className='form-group custom-select select'>
              <label className='mb-1'>Dokter</label>
              <select className='form-control mb-3' defaultValue=''>
                <option value='' disabled>
                  Pilih Dokter
                </option>
                {jadwals.map((jadwal) => (
                  <option key={jadwal.ID} value={jadwal.KD_DOKTER}>
                    {jadwal.NM_DOKTER} ({jadwal.NM_HARI} {jadwal.JAM})
                  </option>
                ))}
              </select>
            </div>
            <button
              to='/ambil-antrian'
              className='btn btn-success shadow-sm rounded-sm px-4 w-100'
            >
              Ambil Antrian
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
