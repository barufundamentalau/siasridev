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
import { useLocation } from 'react-router-dom'

export default function CardRegistrasi() {
  // form identitas pasien
  const location = useLocation()
  const { state } = location
  const { dataPasien, penjamin } = state || {}

  // init state
  const [okliniks, setoKliniks] = useState([])
  const [klinik, setKlinik] = useState('')
  const [nomorKartu, setNomorKartu] = useState('')
  const [nomorRujukan, setNomorRujukan] = useState('')
  const [jadwals, setJadwals] = useState([])
  const [openjamin, setoPenjamin] = useState('')
  const [tanggalKunjungan, setTanggalKunjungan] = useState('')
  const [pasienPrioritas, setPasienPrioritas] = useState('')
  const [dokter, setDokter] = useState('')
  const [dataRegistrasi, setDataRegistrasi] = useState(false)
  const [loket, setLoket] = useState('')
  const [ruangan, setRuangan] = useState('')
  const [sdisabled, setsdisabled] = useState(true)

  // fetch data kliniks
  const fetchDataKlinikTujuans = async () => {
    //fetch data
    await Api.get('/api/web/kliniktujuan').then((response) => {
      //assign response to state "Kliniks"
      setoKliniks(response.data.data.data)
    })
  }

  // Fetch data rujukan
  const fetchDataRujukans = async (a) => {
    await Simrs.get(
      'webservice/registrasionline/plugins/getListRujukanKartu?noKartu=' +
        nomorKartu +
        '&faskes=' +
        a
    ).then((response) => {
      if (response.data.success && response.data.data.rujukan.length > 0) {
        setNomorRujukan(response.data.data.rujukan[0].noKunjungan)
        setKlinik(response.data.data.rujukan[0].poliRujukan.kode)
        fetchDataLoket(response.data.data.rujukan[0].poliRujukan.kode)
        fetchDataJadwals(response.data.data.rujukan[0].poliRujukan.kode)
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
        setNomorRujukan('')
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
    })
  }
  const fetchDataLoket = async (a) => {
    // Reset status rujukan saat pencarian
    await Simrs.get(
      'webservice/registrasionline/ruangan?_dc=123&STATUS=1&RUANGAN_PENJAMIN=' +
        a
    )
      .then((response) => {
        if (response.data.success && response.data.data.length > 0) {
          setLoket(response.data.data[0].ANTRIAN)
          setRuangan(response.data.data[0].ID)
          toast.success(
            'Anda akan mengantri di Loket ' + response.data.data[0].ANTRIAN,
            {
              duration: 4000,
              position: 'top-right',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          )
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error('ADA KESALAHAN!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      })
  }

  // fetch data jadwals
  const fetchDataJadwals = async (a) => {
    try {
      const response = await Simrs.get(
        'webservice/registrasionline/jadwaldokterhfis?_dc=1722146099995&STATUS=1&POLI=' +
          a +
          '&TANGGAL=' +
          tanggalKunjungan
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
        setJadwals([])
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
  // Submit Jadwal
  const submitAntrian = async () => {
    try {
      const post = {
        TANGGALKUNJUNGAN: tanggalKunjungan,
        NORM: dataPasien.NORM,
        NAMA: dataPasien.NAMA,
        TEMPAT_LAHIR: dataPasien.TEMPAT_LAHIR,
        TANGGAL_LAHIR: dataPasien.TANGGAL_LAHIR,
        ALAMAT: dataPasien.ALAMAT,
        PEKERJAAN: dataPasien.PEKERJAAN,
        INSTANSI_ASAL: '',
        JK: '1',
        WILAYAH: dataPasien.WILAYAH,
        POLI: ruangan,
        DOKTER: JSON.parse(dokter).KD_DOKTER,
        CARABAYAR: openjamin,
        CONTACT: dataPasien.KONTAK[0]?.NOMOR,
        NO: 0,
        JAM: '',
        POS_ANTRIAN: loket,
        NO_REF_BPJS: nomorRujukan,
        POLI_BPJS: klinik,
        REF_POLI_RUJUKAN: klinik,
        JENIS: 1,
        STATUS: 1,
        JENIS_APLIKASI: 22,
        NIK: dataPasien.KARTUIDENTITAS[0]?.NOMOR,
        NO_KARTU_BPJS: dataPasien.NO_KARTU_BPJS,
        JAM_PRAKTEK: JSON.parse(dokter).JAM,
        JENIS_KUNJUNGAN: 1,
      }
      const response = await Simrs.post(
        'webservice/registrasionline/reservasi?_dc=1722095921608',
        post
      )
      if (response.data.success) {
        localStorage.setItem('registrasi', JSON.stringify(response.data))
        toast.success('Registrasi Berhasil!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      } else {
        toast.error('Ambil Antrian Gagal.', {
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
      toast.error('Terjadi kesalahan saat mengambil antrian.', {
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
    if (nomorRujukan !== '') {
      fetchDataKlinikTujuans()
    }
  }, [nomorRujukan])

  useEffect(() => {
    if (dokter !== '') {
      setsdisabled(false)
    } else {
      setsdisabled(true)
    }
  }, [dokter])
  useEffect(() => {
    // Check if 'registrasi' exists in localStorage
    const data = localStorage.getItem('registrasi')
    if (data) {
      setDataRegistrasi(JSON.parse(data)) // Parse the JSON string into an object
    }
  }, [])

  // Format tanggal menggunakan moment.js
  const formatTanggal = (dateString) => {
    return dateString ? moment(dateString).format('YYYY-MM-DD') : ''
  }
  const today = new Date()
  if (
    dataRegistrasi &&
    formatTanggal(today) <= dataRegistrasi.response.tanggalperiksa
  ) {
    return (
      <div className='row'>
        <div className='col-md-6 mb-4'>
          <div className='card border-0 rounded shadow-sm'>
            <div className='card-body'>
              <h5>
                <i className='fa fa-user-alt'></i> ANTRIAN ANDA
              </h5>
              <hr />
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NOMOR ANTRIAN
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={dataRegistrasi.response.nomorantrean}
                  readOnly
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>KODE BOOKING
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={dataRegistrasi.response.kodebooking}
                  readOnly
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>Jenis Pasien
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={dataRegistrasi.response.jenispasien}
                  placeholder='Nama Pasien'
                  readOnly
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>KLINIK
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={dataRegistrasi.response.namapolirs}
                  placeholder='Tempat Lahir'
                  readOnly
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>DOKTER
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={dataRegistrasi.response.namadokter}
                  placeholder='Tempat Lahir'
                  readOnly
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>Jam Pelayanan
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={
                    dataRegistrasi.response.tanggalperiksa +
                    ' ' +
                    dataRegistrasi.response.estimasijampelayanan +
                    ' WITA'
                  }
                  placeholder='Tempat Lahir'
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
                <i className='fa fa-user-alt'></i> DATA PASIEN
              </h5>
              <hr />
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NO. REKAM
                  MEDIS
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
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NAMA
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
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>TEMPAT LAHIR
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
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>TGL. LAHIR
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
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NIK
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
                  <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NO. HP
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
      </div>
    )
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
                <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NO. REKAM MEDIS
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
                <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NAMA
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
                <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>TEMPAT LAHIR
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
                <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>TGL. LAHIR
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
                <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NIK
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
                <i className='fa fa-check'>&nbsp;&nbsp;&nbsp;</i>NO. HP
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
              <i className='fa fa-hospital-user'></i> PENJAMIN / CARA BAYAR
            </h5>
            <hr />
            <div className='form-group custom-select select'>
              <label className='mb-1'>Filter Penjamin / Cara Bayar</label>
              <select
                className='form-control'
                value={openjamin}
                onChange={(e) => {
                  setoPenjamin(e.target.value)
                  setDokter('')
                  setJadwals([])
                }}
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
            <div className='mb-3 mt-2'>
              <label>Pasien Prioritas</label>
              <select
                className='form-control'
                required
                value={pasienPrioritas}
                onChange={(e) => setPasienPrioritas(e.target.value)}
              >
                <option value=''>Pilih Prioritas</option>
                <option value='lanjutUsia'>Lanjut Usia 65 Tahun</option>
                <option value='ibuHamil'>Ibu Hamil / Menyusui</option>
                <option value='bayiBalita'>Bayi / Balita</option>
                <option value='penyandangDisabilitas'>
                  Penyandang Disabilitas
                </option>
              </select>
            </div>
            <div className='col mb-3 mt-2'>
              <label className='mb-1'>Tanggal Kunjungan</label>
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
                  <label className=' mb-1'>No. Kartu Jaminan JKN / BPJS</label>
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
                <label className='mb-1'>Nomor Rujukan</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nomor Rujukan'
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
                  setDokter('')
                }}
                disabled={openjamin === '2' ? true : false}
              >
                <option value='' disabled>
                  Pilih Klinik
                </option>
                {okliniks &&
                  okliniks.map((d, k) => {
                    let KODEPOLI = ''
                    if (d.REFERENSI.PENJAMIN?.BPJS) {
                      KODEPOLI = d.REFERENSI.PENJAMIN.BPJS.KDPOLI
                    }
                    if (KODEPOLI) {
                      return (
                        <option key={k} value={KODEPOLI}>
                          {d.DESKRIPSI + ' (' + KODEPOLI + ')'}
                        </option>
                      )
                    }
                  })}
              </select>
            </div>
            <div className='form-group mt-2'>
              <label className='mb-1'>Loket</label>
              <input
                type='text'
                className='form-control'
                placeholder='Loket'
                value={loket}
                disabled
              />
            </div>
            <div className='form-group custom-select select'>
              <label className='mb-1'>Pilih Dokter</label>
              <select
                className='form-control mb-3'
                onChange={(e) => {
                  setDokter(e.target.value)
                }}
                value={dokter}
              >
                <option value='' disabled>
                  Pilih Dokter
                </option>
                {jadwals.map((jadwal) => (
                  <option key={jadwal.ID} value={JSON.stringify(jadwal)}>
                    {jadwal.NM_DOKTER} ({jadwal.NM_HARI} {jadwal.JAM})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                submitAntrian()
                localStorage.setItem('datapasien', JSON.stringify(dataPasien))
                localStorage.setItem(
                  'nomorRujukan',
                  JSON.stringify(nomorRujukan)
                )
              }}
              className='btn btn-success shadow-sm rounded-sm px-4 w-100'
              disabled={sdisabled}
            >
              AMBIL ANTRIAN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
