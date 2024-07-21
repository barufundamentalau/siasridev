import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function CardRawatinap() {
  const [norm, setNorm] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const formattedTanggalLahir = tanggalLahir.split('-').join('-')
    const url = `http://127.0.0.1:8000/api/web/getpasien/?norm=${norm}&tglLahir=${formattedTanggalLahir}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok && data.data && data.data.data.length > 0) {
        const foundPatient = data.data.data[0]

        // Mendapatkan data dari array
        const nik =
          foundPatient.KARTUIDENTITAS.length > 0
            ? foundPatient.KARTUIDENTITAS[0].NOMOR
            : 'Tidak Ada'
        const kontak =
          foundPatient.KONTAK.length > 0
            ? foundPatient.KONTAK[0].NOMOR
            : 'Tidak Ada'

        navigate('/terimakasih', {
          state: {
            norm: foundPatient.NORM,
            nama: foundPatient.NAMA,
            tempatLahir: foundPatient.REFERENSI.TEMPATLAHIR.DESKRIPSI,
            tanggalLahir: foundPatient.TANGGAL_LAHIR,
            nik: nik,
            kontak: kontak,
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
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h4>
            <strong className='text-uppercase'>Form Pasien</strong>
          </h4>
          <hr />
        </div>
        <div className='col-md-12 mb-4'>
          <div className='card border-0 shadow-sm rounded-3 text-center text-uppercase'>
            <div className='card-body mt-2'>
              <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                  <div className='col'>
                    <label htmlFor='norm' className='form-label'>
                      NORM
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='norm'
                      value={norm}
                      onChange={(e) => setNorm(e.target.value)}
                      required
                    />
                  </div>
                  <div className='col'>
                    <label htmlFor='tanggalLahir' className='form-label'>
                      Tanggal Lahir
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='tanggalLahir'
                      value={tanggalLahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                      required
                    />
                  </div>
                  <div className='col-auto align-self-end'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Kirim'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
