//import hook useState from react
import React, { useState } from 'react'

//import layout
import LayoutAdmin from '../../../layouts/Admin'

//import BASE URL API
import Api from '../../../api'

//import hook navigate dari react router dom
import { useNavigate } from 'react-router-dom'

//import react Quill
import ReactQuill from 'react-quill'

//import js cookie
import Cookies from 'js-cookie'

//import toats
import toast from 'react-hot-toast'

function JknmobileCreate() {
  //title page
  document.title = 'Add New JKN Mobile - Administrator Si Asri'

  //state
  const [title, setTitle] = useState('')
  const [embed, setEmbed] = useState('')
  const [content, setContent] = useState('')
  const [ios, setIos] = useState('')
  const [android, setAndroid] = useState('')

  //state validation
  const [validation, setValidation] = useState({})

  //token
  const token = Cookies.get('token')

  //navigate
  const navigate = useNavigate()

  //function "handleFileChange"
  //   const handleFileChange = (e) => {
  //     //define variable for get value image data
  //     const imageData = e.target.files[0]

  //     //check validation file
  //     if (!imageData.type.match('image.*')) {
  //       //set state "image" to null
  //       setImage('')

  //       //show toast
  //       toast.error('Format File not Supported!', {
  //         duration: 4000,
  //         position: 'top-right',
  //         style: {
  //           borderRadius: '10px',
  //           background: '#333',
  //           color: '#fff',
  //         },
  //       })

  //       return
  //     }

  //     //assign file to state "image"
  //     setImage(imageData)
  //   }

  //function "storeJkn"
  const storeJkn = async (e) => {
    e.preventDefault()

    //define formData
    const formData = new FormData()

    //append data to "formData"
    formData.append('title', title)
    formData.append('embed', embed)
    formData.append('content', content)
    formData.append('ios', ios)
    formData.append('android', android)

    await Api.post('/api/admin/jkns', formData, {
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
        navigate('/admin/jknmobile')
      })
      .catch((error) => {
        //set state "validation"
        setValidation(error.response.data)
      })
  }

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className='row mt-4'>
          <div className='col-12'>
            <div className='card border-0 rounded shadow-sm border-top-success'>
              <div className='card-header'>
                <span className='font-weight-bold'>
                  <i className='fa fa-mobile'></i> ADD NEW JKN MOBILE
                </span>
              </div>
              <div className='card-body'>
                <form onSubmit={storeJkn}>
                  {/* <div className='mb-3'>
                    <label className='form-label fw-bold'>Image</label>
                    <input
                      type='file'
                      className='form-control'
                      onChange={handleFileChange}
                    />
                  </div>
                  {validation.image && (
                    <div className='alert alert-danger'>
                      {validation.image[0]}
                    </div>
                  )} */}
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>Title</label>
                    <input
                      type='text'
                      className='form-control'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder='Enter Title'
                    />
                  </div>
                  {validation.title && (
                    <div className='alert alert-danger'>
                      {validation.title[0]}
                    </div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>Embed</label>
                    <input
                      type='text'
                      className='form-control'
                      value={embed}
                      onChange={(e) => setEmbed(e.target.value)}
                      placeholder='Enter URL YouTube'
                    />
                  </div>
                  {validation.embed && (
                    <div className='alert alert-danger'>
                      {validation.embed[0]}
                    </div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>Content</label>
                    <ReactQuill
                      theme='snow'
                      rows='5'
                      value={content}
                      onChange={(content) => setContent(content)}
                    />
                  </div>
                  {validation.content && (
                    <div className='alert alert-danger'>
                      {validation.content[0]}
                    </div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>iOS AppStore</label>
                    <input
                      type='url'
                      className='form-control'
                      value={ios}
                      onChange={(e) => setIos(e.target.value)}
                      placeholder='Enter iOS AppStore URL'
                    />
                  </div>
                  {validation.ios && (
                    <div className='alert alert-danger'>
                      {validation.ios[0]}
                    </div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label fw-bold'>
                      Android PlayStore
                    </label>
                    <input
                      type='url'
                      className='form-control'
                      value={android}
                      onChange={(e) => setAndroid(e.target.value)}
                      placeholder='Enter Android PlayStore URL'
                    />
                  </div>
                  {validation.android && (
                    <div className='alert alert-danger'>
                      {validation.android[0]}
                    </div>
                  )}
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

export default JknmobileCreate
