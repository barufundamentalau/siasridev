//import hook from react
import React, { useEffect, useState, useRef } from 'react'

//import layout web
import LayoutWeb from '../../../layouts/Web'

//import BASE URL API
import Api from '../../../api'

//import mapbox gl
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

// import komponen loading
import Loading from '../../../components/utilities/Loading'

//api key mapbox
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX

function WebMapsIndex() {
  //title page
  document.title = 'Maps - Si Asri'

  //map container
  const mapContainer = useRef(null)

  //state coordinate
  const [coordinates, setCoordinates] = useState([])
  const [loading, setLoading] = useState(true) // state for loading

  //function "fetchDataPlaces"
  const fetchDataPlaces = async () => {
    //fetching Rest API
    await Api.get('/api/web/all_places').then((response) => {
      //set data to state
      setCoordinates(response.data.data)
      setLoading(false) // set loading to false after fetching data
    })
  }

  //hook
  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchDataPlaces()
  }, [])

  //hook
  useEffect(() => {
    if (!mapContainer.current) return

    //init Map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [124.3036, 0.7212], // Coordinates for Kotamobagu, Sulawesi Utara
      zoom: 12, // Zoom level
    })

    // Create a default Marker and add it to the map.
    coordinates.forEach((location) => {
      // add popup
      const popup = new mapboxgl.Popup()
        .setHTML(
          `<h6>${location.title}</h6><hr/><p><i class="fa fa-map-marker"></i> <i>${location.address}</i></p><hr/><div class="d-grid gap-2"><a href="/lokasi/${location.slug}" class="btn btn-sm btn-success btn-block text-white">Lihat Selengkapnya</a></div>`
        )
        .addTo(map)

      // add marker to map
      new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map)
    })

    // Cleanup function
    return () => map.remove()
  }, [coordinates])

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12 mb-5'>
              {loading ? (
                <Loading /> // Render Loading component while fetching data
              ) : (
                <div className='card border-0 rounded shadow-sm'>
                  <div className='card-body'>
                    <h5>
                      <i className='fa fa-map-marked-alt'></i> MAPS SEBARAN
                    </h5>
                    <hr />
                    <div
                      ref={mapContainer}
                      className='map-container'
                      style={{ height: '450px' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebMapsIndex
