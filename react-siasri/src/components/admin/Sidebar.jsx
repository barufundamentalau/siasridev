import React from 'react'

//import Link
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  //assigning location variable
  const location = useLocation()

  //destructuring pathname from location
  const { pathname } = location

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/')

  return (
    <React.Fragment>
      <div className='list-group list-group-flush'>
        <Link
          className={
            splitLocation[2] === 'dashboard'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/dashboard'
        >
          <i className='fa fa-tachometer-alt me-2'></i> Dashboard
        </Link>
        <Link
          className={
            splitLocation[2] === 'categories'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/categories'
        >
          <i className='fa fa-map-signs me-2'></i> KECAMATAN
        </Link>
        <Link
          className={
            splitLocation[2] === 'places'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/places'
        >
          <i className='fa fa-map-marked-alt me-2'></i> TEMPAT
        </Link>
        <Link
          className={
            splitLocation[2] === 'sliders'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/sliders'
        >
          <i className='fa fa-images me-2'></i> Sliders
        </Link>
        <Link
          className={
            splitLocation[2] === 'directs'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/directs'
        >
          <i className='fa fa-link me-2'></i> Directs
        </Link>
        <Link
          className={
            splitLocation[2] === 'services'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/services'
        >
          <i className='fa fa-podcast me-2'></i> Layanan
        </Link>
        <Link
          className={
            splitLocation[2] === 'jknmobile'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/jknmobile'
        >
          <i className='fa fa-mobile me-2'></i> JKN Mobile
        </Link>
        <Link
          className={
            splitLocation[2] === 'informations'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/informations'
        >
          <i className='fa fa-list-ul me-2'></i> INFORMASI
        </Link>
        <Link
          className={
            splitLocation[2] === 'users'
              ? 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active'
              : 'list-group-item list-group-item-action list-group-item-light p-3 text-uppercase'
          }
          to='/admin/users'
        >
          <i className='fa fa-users me-2'></i> Users
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Sidebar
