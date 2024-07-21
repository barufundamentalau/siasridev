//import react and hook
import React, { useState, useEffect } from 'react'

//import component react bootstrap
import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap'

//import react router dom
import { Link, useNavigate } from 'react-router-dom'

//import BASE URL API
import Api from '../../api'

//import js cookie
import Cookies from 'js-cookie'

function WebHeader() {
  //state categories
  const [categories, setCategories] = useState([])

  //state informations
  const [informations, setInformations] = useState([])

  //state user logged in
  const [user, setUser] = useState({})

  //modal search
  const [modal, setModal] = useState(false)

  //state keyword
  const [keyword, setKeyword] = useState('')

  //navigate
  const navigate = useNavigate()

  //token
  const token = Cookies.get('token')

  //function "fetchDataCategories"
  const fetchDataCategories = async () => {
    //fetching Rest API "categories"
    await Api.get('/api/web/categories').then((response) => {
      //set data to state
      setCategories(response.data.data)
    })
  }

  //function "fetchDataInformations"
  const fetchDataInformations = async () => {
    //fetching Rest API "categories"
    await Api.get('/api/web/informations').then((response) => {
      //set data to state
      setInformations(response.data.data)
    })
  }

  //function "fetchDataUser"
  const fetchDataUser = async () => {
    //fetching Rest API "user"
    await Api.get('/api/admin/user', {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data to state
      setUser(response.data)
    })
  }

  //hook
  useEffect(() => {
    //call function "fetchDataCategories"
    fetchDataCategories()

    //if token already exists
    if (token) {
      //call function "fetchDataUser"
      fetchDataUser()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //hook
  useEffect(() => {
    //call function "fetchDataCategories"
    fetchDataInformations()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //function "searchHandler"
  const searchHandler = () => {
    //redirect with params "keyword"
    navigate(`/search?q=${keyword}`)

    //set state modal
    setModal(false)
  }

  return (
    <React.Fragment>
      <Navbar
        collapseOnSelect
        expand='lg'
        className='navbar-custom shadow-sm'
        fixed='top'
      >
        <Container>
          <Navbar.Brand as={Link} to='/' className='fw-bold text-white'>
            <i className='fa fa-hospital-user'></i> SI ASRI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              {token && (
                <>
                  <NavDropdown
                    title={
                      <span>
                        <i className='fa fa-map-signs'></i> KECAMATAN
                      </span>
                    }
                    id='collasible-nav-dropdown'
                    className='fw-bold text-white'
                  >
                    {categories.map((category) => (
                      <NavDropdown.Item
                        as={Link}
                        to={`/kecamatan/${category.slug}`}
                        key={category.id}
                      >
                        <img
                          src={category.image}
                          style={{ width: '35px' }}
                          alt=''
                        />{' '}
                        {category.name.toUpperCase()}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <Nav.Link
                    as={Link}
                    to='/tempat'
                    className='fw-bold text-white'
                  >
                    <i className='fa fa-house-user'></i> TEMPAT
                  </Nav.Link>
                  <Nav.Link as={Link} to='/peta' className='fw-bold text-white'>
                    <i className='fa fa-map'></i> PETA
                  </Nav.Link>
                </>
              )}
              <NavDropdown
                title={
                  <span>
                    <i className='fa fa-list-ul'></i> INFORMASI
                  </span>
                }
                id='collasible-nav-dropdown'
                className='fw-bold text-white'
              >
                {informations.map((information) => (
                  <NavDropdown.Item
                    as={Link}
                    to={`/${information.slug}`}
                    key={information.id}
                  >
                    <img
                      src={information.image}
                      style={{ width: '35px' }}
                      alt=''
                    />{' '}
                    {information.name.toUpperCase()}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href='http://rsud.kotamobagu.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LIHAT BERITA{'\t'}
                  <i className='fa fa-long-arrow-alt-right'></i>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to='/layanan' className='fw-bold text-white'>
                <i className='fa fa-podcast'></i> LAYANAN
              </Nav.Link>
              <Nav.Link
                as={Link}
                to='/jknmobile'
                className='fw-bold text-white'
              >
                <i className='fa fa-mobile'></i> JKN MOBILE
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => setModal(true)}
                className='fw-bold text-white me-4'
              >
                <i className='fa fa-search'></i> PENCARIAN
              </Nav.Link>
              {token ? (
                <Link
                  to='/admin/dashboard'
                  className='btn btn-md btn-light text-uppercase'
                >
                  <i className='fa fa-user-circle'></i> {user.name}
                </Link>
              ) : (
                <Link to='/admin/login' className='btn btn-md btn-light'>
                  <i className='fa fa-lock'></i> LOGIN
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size='lg'
        show={modal}
        onHide={() => setModal(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            <i className='fa fa-search'></i> MAU CARI APA?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchHandler()}
              placeholder='masukkan pencarian disini...'
            />
            <button
              onClick={searchHandler}
              type='submit'
              className='btn btn-md btn-success'
            >
              <i className='fa fa-search'></i> CARI SEKARANG
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default WebHeader
