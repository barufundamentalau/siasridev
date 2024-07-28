//import hook useState and useEffect from react
import React, { useState, useEffect } from 'react'

//import component carousel
import { Carousel } from 'react-bootstrap'

//import BASE URL API
import Api from '../../api'

// import komponen loading
import Loading from '../../components/utilities/Loading'

function Slider() {
  //state sliders
  const [sliders, setSliders] = useState([])

  //state loading
  const [loading, setLoading] = useState(true)

  //function "fetchDataSliders"
  const fetchDataSliders = async () => {
    setLoading(true) // Set loading to true before fetching data
    try {
      //fetching Rest API "sliders"
      const response = await Api.get('/api/web/sliders')
      //set data to state
      setSliders(response.data.data)
    } catch (error) {
      console.error('Error fetching sliders data:', error)
    } finally {
      setLoading(false) // Set loading to false after fetching
    }
  }

  //hook
  useEffect(() => {
    //call function "fetchDataSliders"
    fetchDataSliders()
  }, [])

  return (
    <Carousel
      prevIcon={
        <i className='fa fa-chevron-left fa-lg carousel-custom text-dark shadow'></i>
      }
      nextIcon={
        <i className='fa fa-chevron-right fa-lg carousel-custom text-dark shadow'></i>
      }
    >
      {sliders.map((slider) => (
        <Carousel.Item key={slider.id}>
          <img
            className='d-block w-100'
            src={slider.image}
            style={{ height: '500px', objectFit: 'cover' }}
            alt='First slide'
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Slider
