import React, { useState, useEffect } from 'react'
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
    <div className='row'>
      {directs.map((direct) => (
        <div className='col-md-4 mb-3' key={direct.id}>
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
        </div>
      ))}
    </div>
  )
}

export default Direct
