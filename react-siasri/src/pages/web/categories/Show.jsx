import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LayoutWeb from '../../../layouts/Web'
import Api from '../../../api'
import CardPlace from '../../../components/utilities/CardPlace'
import Loading from '../../../components/utilities/Loading'

function WebCategoryShow() {
  const [category, setCategory] = useState({})
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true) // state for loading

  const { slug } = useParams()

  const fetchDataCategory = async () => {
    setLoading(true) // set loading to true before fetching data

    try {
      const response = await Api.get(`/api/web/categories/${slug}`)
      setCategory(response.data.data)
      setPlaces(response.data.data.places)
      document.title = `Kecamatan : ${response.data.data.name} - Si Asri)`
    } catch (error) {
      console.error('Error fetching category data:', error)
    } finally {
      setLoading(false) // set loading to false after fetching data
    }
  }

  useEffect(() => {
    fetchDataCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className='container mt-80'>
          <div className='row'>
            <div className='col-md-12'>
              <h4>
                KECAMATAN :{' '}
                <strong className='text-uppercase'>{category.name}</strong>
              </h4>
              <hr />
            </div>
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
                <strong>Opps...!</strong> Data Belum Tersedia!.
              </div>
            )}
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  )
}

export default WebCategoryShow
