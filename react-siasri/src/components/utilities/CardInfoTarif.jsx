import React from 'react'

export default function CardInfoTarif() {
  const pdfUrl =
    'https://drive.google.com/file/d/1IaTvieanrZqa8_CCuwaHismQOVokNIwE/preview' // Replace FILE_ID with your actual PDF file ID
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h4 className='text-center'>
          <strong className='text-uppercase'>Info Tarif</strong>
        </h4>
        <hr />
      </div>
      <div className='col-md-12 mb-4'>
        <div className='card border-0 rounded shadow-sm'>
          <div className='card-body'>
            <iframe
              src={pdfUrl}
              width='100%'
              height='500px'
              style={{ border: 'none' }}
              allow='autoplay'
            >
              This browser does not support PDFs. Please download the PDF to
              view it: <a href={pdfUrl}>Download PDF</a>.
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
