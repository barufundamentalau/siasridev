//import hook useState from react
import React, { useState, useEffect } from 'react'

//import layout
import LayoutAdmin from '../../../layouts/Admin'

//import BASE URL API
import Api from '../../../api'

//import hook navigate dari react router dom
import { useNavigate, useParams } from 'react-router-dom'

//import react Quill
import ReactQuill from 'react-quill'

// quill CSS
import 'react-quill/dist/quill.snow.css'

//import js cookie
import Cookies from 'js-cookie'

//import toats
import toast from 'react-hot-toast'

function JknmobileEdit() {
  //title page
  document.title = 'Edit JKN Mobile - Administrator Administrator Si Asri'

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

  //naviagte
  const navigate = useNavigate()

  //get ID from parameter URL
  const { id } = useParams()

  //function "getJKNById"
  const getJknById = async () => {
    //get data from server
    const response = await Api.get(`/api/admin/jknmobile/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    })

    //get response data
    const data = await response.data.data

    //assign data to state
    setTitle(data.title)
    setEmbed(data.embed)
    setContent(data.content)
    setIos(data.ios)
    setAndroid(data.android)
  }

  //hook useEffect
  useEffect(() => {
    //panggil function "getInformationById"
    getJknById()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //function "updateJkn"
  const updateJkn = async (e) => {
    e.preventDefault()

    //define formData
    const formData = new FormData()

    //append data to "formData"
    formData.append('title', title)
    formData.append('embed', embed)
    formData.append('content', content)
    formData.append('ios', ios)
    formData.append('android', android)
    formData.append('_method', 'PATCH')

    await Api.post(`/api/admin/jknmobile/${id}`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        //show toast
        toast.success('Data Updated Successfully!', {
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
                  <i className='fa fa-users'></i> EDIT JKN MOBILE
                </span>
              </div>
              <div className='card-body'>
                <form onSubmit={updateJkn}>
                  <div className='row'>
                    <div className='col-md-6'>
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
                    </div>
                    <div className='col-md-6'>
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
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label fw-bold'>Content</label>
                    <ReactQuill
                      theme='snow'
                      rows='5'
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                      <i className='fa fa-save'></i> UPDATE
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

export default JknmobileEdit
