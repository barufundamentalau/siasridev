//import react
import React, { useState, useEffect } from 'react'

//import layout
import LayoutAdmin from '../../../layouts/Admin'

//import BASE URL API
import Api from '../../../api'

//import js cookie
import Cookies from 'js-cookie'

//import Link from react router dom
import { Link } from 'react-router-dom'

//import pagination component
import PaginationComponent from '../../../components/utilities/Pagination'

//import toats
import toast from 'react-hot-toast'

//import react-confirm-alert
import { confirmAlert } from 'react-confirm-alert'

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

function DirectsIndex() {
  //title page
  document.title = 'Direct Links - Administrator Si Asri'

  //state posts
  const [directs, setDirects] = useState([])

  //state currentPage
  const [currentPage, setCurrentPage] = useState(1)

  //state perPage
  const [perPage, setPerPage] = useState(0)

  //state total
  const [total, setTotal] = useState(0)

  //token
  const token = Cookies.get('token')

  //function "fetchData"
  const fetchData = async (pageNumber) => {
    //define variable "page"
    const page = pageNumber ? pageNumber : currentPage

    //fetching data from Rest API
    await Api.get(`/api/admin/directs?page=${page}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "directs"
      setDirects(response.data.data.data)

      //set currentPage
      setCurrentPage(response.data.data.current_page)

      //set perPage
      setPerPage(response.data.data.per_page)

      //total
      setTotal(response.data.data.total)
    })
  }

  //hook
  useEffect(() => {
    //call function "fetchData"
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //function "deleteDirect"
  const deleteDirect = (id) => {
    //show confirm alert
    confirmAlert({
      title: 'Are You Sure ?',
      message: 'want to delete this data ?',
      buttons: [
        {
          label: 'YES',
          onClick: async () => {
            await Api.delete(`/api/admin/directs/${id}`, {
              headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
              },
            }).then(() => {
              //show toast
              toast.success('Data Deleted Successfully!', {
                duration: 4000,
                position: 'top-right',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })

              //call function "fetchData"
              fetchData()
            })
          },
        },
        {
          label: 'NO',
          onClick: () => {},
        },
      ],
    })
  }

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className='row mt-4'>
          <div className='col-md-12'>
            <div className='card border-0 border-top-success rounded shadow-sm mb-5'>
              <div className='card-header'>
                <span className='font-weight-bold'>
                  <i className='fa fa-link'></i> DIRECT LINKS
                </span>
              </div>
              <div className='card-body'>
                <div className='input-group mb-3'>
                  <Link
                    to='/admin/directs/create'
                    className='btn btn-md btn-success'
                  >
                    <i className='fa fa-plus-circle'></i> TAMBAH
                  </Link>
                </div>
                <div className='table-responsive'>
                  <table className='table table-bordered table-striped table-hovered'>
                    <thead>
                      <tr>
                        <th scope='col'>No.</th>
                        <th scope='col'>Image</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>URL</th>
                        <th scope='col'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {directs.map((direct, index) => (
                        <tr key={index}>
                          <td className='text-center'>
                            {++index + (currentPage - 1) * perPage}
                          </td>
                          <td className='text-center'>
                            <img
                              src={direct.image}
                              alt=''
                              width='200'
                              className='rounded'
                            />
                          </td>
                          <td>{direct.title}</td>
                          <td>{direct.url}</td>
                          <td className='text-center'>
                            <button
                              onClick={() => deleteDirect(direct.id)}
                              className='btn btn-sm btn-danger'
                            >
                              <i className='fa fa-trash'></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationComponent
                    currentPage={currentPage}
                    perPage={perPage}
                    total={total}
                    onChange={(pageNumber) => fetchData(pageNumber)}
                    position='end'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  )
}

export default DirectsIndex
