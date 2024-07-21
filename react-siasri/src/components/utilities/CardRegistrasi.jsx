import React from 'react'

import moment from 'moment'

import { Link, useLocation } from 'react-router-dom'

export default function CardRegistrasi() {
  // form identitas pasien
  const location = useLocation()
  const { state } = location
  const { norm, nama, tempatLahir, tanggalLahir, nik, kontak } = state || {}

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
                value={norm}
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
                value={nama}
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
                value={tempatLahir}
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
                value={formatTanggal(tanggalLahir)}
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
                value={nik}
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
                value={kontak}
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
              <select className='form-control' defaultValue=''>
                <option value='' disabled>
                  Pilih Jenis Penjamin
                </option>
                <option value='Tanpa Asuransi / Umum'>
                  Tanpa Asuransi / Umum
                </option>
                <option value='BPJS / JKN'>BPJS / JKN</option>
                <option value='INHEALTH'>INHEALTH</option>
                <option value='JASA RAHARJA'>JASA RAHARJA</option>
                <option value='Jaminan Covid - 19 (Kemenkes)'>
                  Jaminan Covid - 19 (Kemenkes)
                </option>
                <option value='JRBM'>JRBM</option>
                <option value='JAMINAN DALAM PROSES (ASN/TNI/POLRI/PENSIUNAN)'>
                  JAMINAN DALAM PROSES (ASN/TNI/POLRI/PENSIUNAN)
                </option>
                <option value='PT. Trakindo Utama (CAT)'>
                  PT. Trakindo Utama (CAT)
                </option>
              </select>
            </div>
            <div className='form-group'>
              <label className='mb-1'>No. Kartu Jaminan JKN / BPJS:</label>
              <input
                type='text'
                className='form-control'
                placeholder='No. Kartu Jaminan JKN / BPJS'
              />
            </div>
            <div className='form-group'>
              <label className='mb-1'>Masukkan No. Rujukan:</label>
              <input
                type='text'
                className='form-control'
                placeholder='Masukkan No. Rujukan'
              />
            </div>
            <div className='form-group custom-select select'>
              <label className='mb-1'>Poli Tujuan</label>
              <select className='form-control' defaultValue=''>
                <option value='' disabled>
                  Pilih Poli Tujuan
                </option>
                <option value='KLINIK BEDAH'>KLINIK BEDAH</option>
                <option value='KLINIK SARAF'>KLINIK SARAF</option>
                <option value='KLINIK THT'>KLINIK THT</option>
                <option value='KLINIK FISIO TERAPI'>KLINIK FISIO TERAPI</option>
                <option value='KLINIK PIE COVID'>KLINIK PIE COVID</option>
                <option value='KLINIK KULIT DAN KELAMIN'>
                  KLINIK KULIT DAN KELAMIN
                </option>
                <option value='KLINIK TB'>KLINIK TB</option>
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
