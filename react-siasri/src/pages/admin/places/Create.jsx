//import hook from react
import React, { useState, useEffect, useRef } from 'react'

//import layout
import LayoutAdmin from '../../../layouts/Admin'

//import BASE URL API
import Api from '../../../api'

//import hook navigate dari react router dom
import { useNavigate } from 'react-router-dom'

//import js cookie
import Cookies from 'js-cookie'

//import toats
import toast from 'react-hot-toast'

//import react Quill
import ReactQuill from 'react-quill'

// quill CSS
import 'react-quill/dist/quill.snow.css'

//mapbox gl
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

//mapbox gl geocoder
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

//api key mapbox
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX

function PlaceCreate() {
  //title page
  document.title = 'Add New Place - Administrator Administrator Si Asri'

  //state form
  const [title, setTitle] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [description, setDescription] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  //state image array / multiple
  const [images, setImages] = useState([])

  //state categories
  const [categories, setCategories] = useState([])

  //state validation
  const [validation, setValidation] = useState({})

  //token
  const token = Cookies.get('token')

  //navigate
  const navigate = useNavigate()

  //function "fetchCategories"
  const fetchCategories = async () => {
    //fetching data from Rest API
    await Api.get('/api/web/categories').then((response) => {
      //set data response to state "catgeories"
      setCategories(response.data.data)
    })
  }

  //hook
  useEffect(() => {
    //call function "fetchCategories"
    fetchCategories()
  }, [])

  //function "handleFileChange"
  const handleFileChange = (e) => {
    //define variable for get value image data
    const imageData = e.target.files

    Array.from(imageData).forEach((image) => {
      //check validation file
      if (!image.type.match('image.*')) {
        setImages([])

        //show toast
        toast.error('Format File not Supported!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })

        return
      } else {
        setImages([...e.target.files])
      }
    })
  }

  //function "storePlace"
  const storePlace = async (e) => {
    e.preventDefault()

    //define formData
    const formData = new FormData()

    //append data to "formData"
    formData.append('title', title)
    formData.append('category_id', categoryID)
    formData.append('description', description)
    formData.append('phone', phone)
    formData.append('address', address)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)

    Array.from(images).forEach((image) => {
      formData.append('image[]', image)
    })

    //send data to server
    await Api.post('/api/admin/places', formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    })
      .then(() => {
        //show toast
        toast.success('Data Saved Successfully!', {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })

        //redirect dashboard page
        navigate('/admin/places')
      })
      .catch((error) => {
        //set state "validation"
        setValidation(error.response.data)
      })
  }

  //=========================================================
  //MAPBOX
  //=========================================================

  //define state
  const mapContainer = useRef(null)

  useEffect(() => {
    //init map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 12,
    })

    //init geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,

      marker: {
        draggable: true,
      },

      mapboxgl: mapboxgl,
    })

    //add geocoder to map
    map.addControl(geocoder)

    //init marker
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: 'rgb(47 128 237)',
    })

      //set longtitude and latitude
      .setLngLat([longitude, latitude])
      //add marker to map
      .addTo(map)

    //geocoder result
    geocoder.on('result', function (e) {
      //remove marker
      marker.remove()

      //set longitude and latitude
      marker
        .setLngLat(e.result.center)

        //add to map
        .addTo(map)

      //event marker on dragend
      marker.on('dragend', function (e) {
        //assign longitude and latitude to state
        setLongitude(e.target._lngLat.lng)
        setLatitude(e.target._lngLat.lat)
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className='row mt-4 mb-5'>
          <div className='col-12'>
            <div className='card border-0 rounded shadow-sm border-top-success'>
              <div className='card-header'>
                <span className='font-weight-bold'>
                  <i className='fa fa-map-marked-alt'></i> ADD NEW PLACE
                </span>
              </div>
              <div className='card-body'>
                <form onSubmit={storePlace}>
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>
                      FOTO (<i>bisa lebih dari satu foto</i>)
                    </label>
                    <input
                      type='file'
                      className='form-control'
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-bold'>NAMA</label>
                        <input
                          type='text'
                          className='form-control'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder='Enter Title Place'
                        />
                      </div>
                      {validation.title && (
                        <div className='alert alert-danger'>
                          {validation.title[0]}
                        </div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-bold'>NOMOR HP</label>
                        <input
                          type='text'
                          className='form-control'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder='Enter Phone'
                        />
                      </div>
                      {validation.phone && (
                        <div className='alert alert-danger'>
                          {validation.phone[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-bold'>KATEGORI</label>
                        <select
                          className='form-select'
                          value={categoryID}
                          onChange={(e) => setCategoryID(e.target.value)}
                        >
                          <option value=''>-- Select Category --</option>
                          {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {validation.category_id && (
                        <div className='alert alert-danger'>
                          {validation.category_id[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>DESKRIPSI</label>
                    <ReactQuill
                      theme='snow'
                      rows='5'
                      value={description}
                      onChange={(content) => setDescription(content)}
                    />
                  </div>
                  {validation.description && (
                    <div className='alert alert-danger'>
                      {validation.description[0]}
                    </div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>ALAMAT</label>
                    <textarea
                      className='form-control'
                      rows='3'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='Enter Address Place'
                    ></textarea>
                  </div>
                  {validation.address && (
                    <div className='alert alert-danger'>
                      {validation.address[0]}
                    </div>
                  )}
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-bold'>LATITUDE</label>
                        <input
                          type='text'
                          className='form-control'
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                          placeholder='Latitude Place'
                        />
                      </div>
                      {validation.latitude && (
                        <div className='alert alert-danger'>
                          {validation.latitude[0]}
                        </div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-bold'>LONGITUDE</label>
                        <input
                          type='text'
                          className='form-control'
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                          placeholder='Longitude Place'
                        />
                      </div>
                      {validation.longitude && (
                        <div className='alert alert-danger'>
                          {validation.longitude[0]}
                        </div>
                      )}
                    </div>
                    <div className='row mb-3'>
                      <div className='col-md-12'>
                        <div ref={mapContainer} className='map-container' />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type='submit'
                      className='btn btn-md btn-success me-2'
                    >
                      <i className='fa fa-save'></i> SAVE
                    </button>
                    <button type='reset' className='btn btn-md btn-warning'>
                      <i className='fa fa-redo'></i> RESET
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  )
}

export default PlaceCreate
