import React, { useState } from 'react'
import Api from '../../api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function CardPendaftaran() {
  //title page
  document.title = 'Pendaftaran Pasien'

  //navigate
  const navigate = useNavigate()

  //state user
  const [jenisPasien, setJenisPasien] = useState('lama')
  const [norm, setNorm] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  // const [nikPasien, setNikPasien] = useState('')
  // const [namaPasien, setNamaPasien] = useState('')
  // const [tempatLahir, setTempatLahir] = useState('')
  // const [kontakPasien, setKontakPasien] = useState('')
  // const [noRekamMedis, setNoRekamMedis] = useState('')
  // const [jenisDisabilitas, setJenisDisabilitas] = useState('')

  //state loading
  const [loading, setLoading] = useState(false)

  // Fungsi untuk menangani perubahan tanggal
  // const handleDateChange = (date) => {
  //   setTanggalLahir(date)
  // }

  //handle change for combined input
  // const handleCombinedInputChange = (e) => {
  //   const inputValue = e.target.value

  //   // Check if the input is 16 characters and is a number (for NIK)
  //   if (/^\d{16}$/.test(inputValue)) {
  //     setNikPasien(inputValue)
  //     setNoRekamMedis('')
  //   } else {
  //     setNoRekamMedis(inputValue)
  //     setNikPasien('')
  //   }
  // }

  //function "pasienLamaHandler"
  const pasienLamaHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    const formattedTanggalLahir = tanggalLahir.split('-').join('-')
    const url = `http://127.0.0.1:8000/api/web/getpasien/?norm=${norm}&tglLahir=${formattedTanggalLahir}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok && data.data.dataPasien.data[0]) {
        const foundPatient = data.data.dataPasien.data[0]
        const penjamin = data.data.penjamin.data
        console.log(penjamin)

        // Mendapatkan data dari array
        // const nik =
        //   foundPatient.KARTUIDENTITAS.length > 0
        //     ? foundPatient.KARTUIDENTITAS[0].NOMOR
        //     : 'Tidak Ada'
        // const kontak =
        //   foundPatient.KONTAK.length > 0
        //     ? foundPatient.KONTAK[0].NOMOR
        //     : 'Tidak Ada'
        // const kontak =
        //   foundPatient.KONTAK.length > 0
        //     ? foundPatient.KONTAK[0].NOMOR
        //     : 'Tidak Ada'
        // const kontak =
        //   foundPatient.KONTAK.length > 0
        //     ? foundPatient.KONTAK[0].NOMOR
        //     : 'Tidak Ada'

        navigate('/registrasi', {
          state: {
            dataPasien: foundPatient,
            penjamin: penjamin,
          },
        })

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
        toast.error('Pasien tidak ditemukan atau terjadi kesalahan.', {
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
      console.error('Error:', error)
      toast.error('Terjadi kesalahan saat mengambil data.', {
        duration: 4000,
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card border-0 rounded shadow-sm'>
      <div className='card-body'>
        <h5 className='card-title'>Formulir Pendaftaran</h5>
        <hr />
        <div className='form-group'>
          <label className='mb-1'>Pilih :</label>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='jenisPasien'
              id='pasienLama'
              value='lama'
              checked={jenisPasien === 'lama'}
              onChange={(e) => setJenisPasien(e.target.value)}
            />
            <label className='form-check-label' htmlFor='pasienLama'>
              Pasien Lama
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='jenisPasien'
              id='pasienBaru'
              value='baru'
              checked={jenisPasien === 'baru'}
              onChange={(e) => setJenisPasien(e.target.value)}
            />
            <label className='form-check-label' htmlFor='pasienBaru'>
              Pasien Baru
            </label>
          </div>
        </div>
        <hr />
        {/* <form onSubmit={pasienLamaHandler}>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <label>Pasien Prioritas:</label>
              <select
                value={jenisDisabilitas}
                onChange={(e) => setJenisDisabilitas(e.target.value)}
                className='form-control'
                required
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
            <div className='col-md-6 mb-3'>
              <label>Nik Pasien:</label>
              <input
                type='text'
                value={nikPasien}
                onChange={(e) => setNikPasien(e.target.value)}
                className='form-control'
                placeholder='Masukkan Nik Pasien'
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label>Nama Pasien:</label>
              <input
                type='text'
                value={namaPasien}
                onChange={(e) => setNamaPasien(e.target.value)}
                className='form-control'
                placeholder='Masukkan Nama Pasien'
                required
              />
            </div>

            <div className='col-md-6 mb-3'>
              <label>Kontak Pasien:</label>
              <input
                type='text'
                value={kontakPasien}
                onChange={(e) => setKontakPasien(e.target.value)}
                className='form-control'
                placeholder='Masukkan Kontak Pasien'
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label>Tempat Lahir:</label>
              <input
                type='text'
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                className='form-control'
                placeholder='Masukkan Tempat Lahir'
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label>Tanggal Lahir:</label>
              <div className='row'>
                <DatePicker
                  selected={tanggalLahir}
                  onChange={handleDateChange}
                  dateFormat='yyyy-MM-dd'
                  className='form-control'
                  placeholderText='Tahun/Bulan/Tanggal'
                  required
                />
              </div>
            </div>
            <div className='col-md-12'>
              <Link
                to='/registrasi'
                className='btn btn-success shadow-sm rounded-sm px-4 w-100'
              >
                Lanjut
              </Link>
            </div>
          </div>
        </form> */}
        {jenisPasien === 'lama' && (
          <form onSubmit={pasienLamaHandler}>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='mb-1'>NIK / No. Rekam Medis:</label>
                <input
                  type='text'
                  id='norm'
                  value={norm}
                  onChange={(e) => setNorm(e.target.value)}
                  className='form-control'
                  placeholder='Masukkan No. Rekam Medis / NIK'
                  required
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='mb-1'>Tanggal Lahir:</label>
                <input
                  type='date'
                  className='form-control'
                  id='tanggalLahir'
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  required
                />
              </div>
              <div className='col-md-12'>
                <button
                  type='submit'
                  className='btn btn-success shadow-sm rounded-sm px-4 w-100'
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'KIRIM'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CardPendaftaran
