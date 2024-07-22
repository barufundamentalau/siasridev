//import layout
import React, { useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import LayoutWeb from '../../../layouts/Web'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

// Set your Mapbox access token from .env
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX

function WebPlaceDirection() {
  // Initialize map container reference
  const mapContainer = useRef(null)

  // Get slug params
  const { slug } = useParams()

  // Get query params
  const query = new URLSearchParams(useLocation().search)

  useEffect(() => {
    // Initialize Mapbox map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9', // Change map style to satellite
      center: [query.get('longitude'), query.get('latitude')],
      zoom: 15,
    })

    // Initialize geolocation control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })

    // Add geolocation control to the map
    map.addControl(geolocate)

    // Initialize directions control
    const directions = new Directions({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: false,
        instructions: true,
      },
    })

    // Add directions control to the map
    map.on('load', function () {
      geolocate.trigger() // Activate geolocation

      geolocate.on('geolocate', function (position) {
        // Update user's coordinates
        map.setCenter([position.coords.longitude, position.coords.latitude])

        // Set origin for directions
        directions.setOrigin([
          position.coords.longitude,
          position.coords.latitude,
        ])
      })

      // Set destination for directions
      directions.setDestination([query.get('longitude'), query.get('latitude')])

      // Add directions control to the map
      map.addControl(directions)
    })

    // Clean up map instance on component unmount
    return () => map.remove()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set document title
  document.title = 'Map Lokasi - Si Asri'

  return (
    <LayoutWeb>
      <div className='container mt-80'>
        <div className='row'>
          <div className='col-md-12 mb-5'>
            <div className='card border-0 rounded shadow-sm'>
              <div className='card-body'>
                <Link
                  to={`/lokasi/${slug}`}
                  className='float-end btn btn-success btn-sm mb-2'
                >
                  <i className='fa fa-long-arrow-alt-left'></i> KEMBALI
                </Link>
                <h5>
                  <i className='fa fa-location-arrow'></i> ARAH LOKASI
                </h5>
                <hr />
                <div
                  ref={mapContainer}
                  className='map-container'
                  style={{ height: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWeb>
  )
}

export default WebPlaceDirection
