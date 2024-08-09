import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Api from '../../api'

function Direct() {
  const [directs, setDirects] = useState([])

  const fetchDataDirects = async () => {
    try {
      const response = await Api.get('/api/web/directs')
      setDirects(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchDataDirects()
  }, [])

  return (
    <>
      {directs.map((direct) => {
        const isWhatsappLink = direct.url.startsWith(
          'https://api.whatsapp.com/'
        )
        const urlPath = new URL(direct.url).pathname

        return (
          <div className='col-md-4 mb-3' key={direct.id}>
            {isWhatsappLink ? (
              <div
                className='card mb-3 w-100 rounded-3 border-0 shadow-sm'
                onClick={() =>
                  window.open(direct.url, '_blank', 'noopener,noreferrer')
                }
                style={{ cursor: 'pointer' }}
              >
                <div className='card-body text-center'>
                  <img
                    src={direct.image}
                    style={{ width: '80px' }}
                    alt={direct.title}
                  />
                  <hr />
                  <h6>{direct.title.toUpperCase()}</h6>
                </div>
              </div>
            ) : (
              <NavLink
                to={urlPath} // Mengambil path dari URL, menghilangkan domain utama
                className='card mb-3 w-100 rounded-3 border-0 shadow-sm'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className='card-body text-center'>
                  <img
                    src={direct.image}
                    style={{ width: '80px' }}
                    alt={direct.title}
                  />
                  <hr />
                  <h6>{direct.title.toUpperCase()}</h6>
                </div>
              </NavLink>
            )}
          </div>
        )
      })}
    </>
  )
}

export default Direct
