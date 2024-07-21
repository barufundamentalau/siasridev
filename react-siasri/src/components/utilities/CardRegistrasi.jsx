import React, { useState, useEffect } from 'react'

import moment from 'moment'

//import BASE URL API
import Api from '../../api'

//import BASE URL API
import Simrs from '../../api/simrs'

import toast from 'react-hot-toast'

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
  const [jadwals, setJadwals] = useState([])

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
  const fetchDataRujukans = async () => {
    // fetchDataRujukan "true"
    // setLoadingRujukan(true)
    //fetch data
    await Simrs.get(
      'webservice/registrasionline/plugins/getListRujukanKartu?noKartu=' +
        nomorKartu +
        '&faskes=1'
    ).then((response) => {
      console.log(response)
      if (response.data.success) {
        toast.success('Data pasien berhasil ditemukan!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      } else {
        toast.error('data rujukan tidak ditemukan.', {
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
    // fetchDataRujukan "true"
    // setLoadingRujukan(true)
    //fetch data
    await Simrs.get(
      '/apps/RegOnline//api/jadwaldokter/?TANGGAL=2024-07-22&POLI=' + klinik
    ).then((response) => {
      console.log(response)
      if (response.data.success) {
        toast.success('Data pasien berhasil ditemukan!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      } else {
        toast.error('data rujukan tidak ditemukan.', {
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

  useEffect(() => {
    // panggil metode "fetchDataKlinikTujuans"
    fetchDataKlinikTujuans()
  }, [])
  useEffect(() => {
    if (klinik !== '') {
      fetchDataJadwals()
    }
  }, [klinik])

  // Format tanggal menggunakan moment.js
  const formatTanggal = (dateString) => {
    return dateString ? moment(dateString).format('YYYY-MM-DD') : ''
  }

  const [openjamin, setoPenjamin] = useState('')
  // const [isBpjsJkn, setIsBpjsJkn] = useState(false)

  useEffect(() => {
    console.log(state)
  }, [dataPasien])

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
                value={dataPasien.REFERENSI.TEMPATLAHIR.DESKRIPSI}
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
                value={dataPasien.TANGGAL_LAHIR}
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
            {openjamin === '2' && (
              <div className='form-group'>
                <label className='mb-1'>No. Kartu Jaminan JKN / BPJS:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='No. Kartu Jaminan JKN / BPJS'
                  value={nomorKartu}
                  onChange={(e) => {
                    setNomorKartu(e.target.value)
                    if (e.target.value.length > 12) {
                      fetchDataRujukans()
                    }
                  }}
                />
              </div>
            )}
            {openjamin === '2' && (
              <div className='form-group'>
                <label className='mb-1'>Masukkan No. Rujukan:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Masukkan No. Rujukan'
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
                <option value='DR A'>DR A</option>
                <option value='DR B'>DR B</option>
                <option value='DR C'>DR C</option>
              </select>
            </div>
            <Link
              to='/ambilantrian'
              className='btn btn-success shadow-sm rounded-sm px-4 w-100'
            >
              Ambil Antrian
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
