//import layout
import React, { useState, useEffect } from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import Slider component
import Slider from '../../../components/web/Slider'

//import Direct component
import Direct from '../../../components/web/Direct'

//import BASE URL API
// import Api from '../../../api'

//import cart category component
// import CardCategory from '../../../components/utilities/CardCategory'

//import cart direct component
// import CardDirect from '../../../components/utilities/CardDirect'

//import react router dom
// import { useNavigate } from 'react-router-dom'

import LoadingHome from '../../../components/utilities/LoadingHome'

function Home() {
  //title page
  document.title = 'Si Asri RSUD Kotamobagu'

  //navigate
  // const navigate = useNavigate()

  //state keyword
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(true)

  // Example of an asynchronous operation
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a fetch operation
        setLoading(true)
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading state
  if (loading) {
    return <LoadingHome />
  }

  return (
    <React.Fragment>
      <LayoutWeb>
        <Slider />
        <div className='container mb-5'>
          <div className='row mt-minus-87'>
            <div className='col-md-12'>
              <div className='card border-0 rounded shadow-sm'>
                <div className='card-body'>
                  <h5>
                    <i className='fa fa-search'></i> PENCARIAN
                  </h5>
                  <p>Cari apa saja disini!</p>
                  <hr />
                  <input
                    type='text'
                    className='form-control'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchHandler()}
                    placeholder='masukkan text pencarian disini...'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row justify-content-center mt-4'>
            <Direct />
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default Home
