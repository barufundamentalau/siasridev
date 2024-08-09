import React from 'react'

export default function CardTempatTidur() {
  const pdfUrl =
    'https://drive.google.com/file/d/1AHf0cUU02q58GuPXq_6bqZJGSBASQ1cM/preview' // Replace FILE_ID with your actual PDF file ID
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h4 className='text-center'>
          <strong className='text-uppercase'>Jumlah Tempat Tidur</strong>
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
