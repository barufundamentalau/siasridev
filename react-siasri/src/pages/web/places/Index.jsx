import React, { useEffect, useState } from 'react'
import LayoutWeb from '../../../layouts/Web'
import Api from '../../../api'
import CardPlace from '../../../components/utilities/CardPlace'
import PaginationComponent from '../../../components/utilities/Pagination'
import Loading from '../../../components/utilities/Loading' // Import Loading component

function WebPlacesIndex() {
  // State definitions
  document.title = 'Places - SI ASRI - Website'
  const [places, setPlaces] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true) // State for loading indicator

  // Function to fetch data
  const fetchDataPlaces = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage

    setLoading(true) // Set loading to true before fetching data

    try {
      const response = await Api.get(`/api/web/places?page=${page}`)
      setPlaces(response.data.data.data)
      setCurrentPage(response.data.data.current_page)
      setPerPage(response.data.data.per_page)
      setTotal(response.data.data.total)
    } catch (error) {
      console.error('Error fetching places:', error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchDataPlaces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            {loading ? (
              <Loading /> // Render Loading component while fetching data
            ) : places.length > 0 ? (
              places.map((place) => (
                <CardPlace
                  key={place.id}
                  id={place.id}
                  slug={place.slug}
                  title={place.title}
                  images={place.images}
                  address={place.address}
                />
              ))
            ) : (
              <div
                className='alert alert-danger border-0 rounded shadow-sm'
                role='alert'
              >
                <strong>Oops...!</strong> Data Belum Tersedia!.
              </div>
            )}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            perPage={perPage}
            total={total}
            onChange={(pageNumber) => fetchDataPlaces(pageNumber)}
            position='center'
          />
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebPlacesIndex
