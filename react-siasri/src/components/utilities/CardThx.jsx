import React from 'react'

import moment from 'moment'

import { useLocation } from 'react-router-dom'

export default function CardThx() {
  const location = useLocation()
  const { state } = location
  const { norm, nama, tempatLahir, tanggalLahir, nik, kontak } = state || {}

  // Format tanggal menggunakan moment.js
  const formatTanggal = (dateString) => {
    return dateString ? moment(dateString).format('YYYY-MM-DD') : ''
  }

  return (
    <div className='container'>
      <h2>Terima Kasih</h2>
      <div className='mt-4'>
        <p>
          <strong>NORM:</strong> {norm}
        </p>
        <p>
          <strong>Nama:</strong> {nama}
        </p>
        <p>
          <strong>Tempat Lahir:</strong> {tempatLahir}
        </p>
        <p>
          <strong>Tanggal Lahir:</strong> {formatTanggal(tanggalLahir)}
        </p>
        <p>
          <strong>NIK:</strong> {nik}
        </p>
        <p>
          <strong>Kontak:</strong> {kontak}
        </p>
      </div>
    </div>
  )
}
