//import react router dom
import { Routes, Route } from 'react-router-dom'

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/admin/Login.jsx'

//import component private routes
import PrivateRoute from './PrivateRoutes'

//import view admin Dashboard
import Dashboard from '../pages/admin/dashboard/Index.jsx'

//import view admin categories Index
import CategoriesIndex from '../pages/admin/categories/Index.jsx'

//import view admin category Create
import CategoryCreate from '../pages/admin/categories/Create.jsx'

//import view admin category Edit
import CategoryEdit from '../pages/admin/categories/Edit.jsx'

//import view admin places Index
import PlacesIndex from '../pages/admin/places/Index.jsx'

//import view admin places Create
import PlaceCreate from '../pages/admin/places/Create.jsx'

//import view admin places Edit
import PlaceEdit from '../pages/admin/places/Edit.jsx'

//import view admin sliders Index
import SlidersIndex from '../pages/admin/sliders/Index.jsx'

//import view admin slider Create
import SliderCreate from '../pages/admin/sliders/Create.jsx'

//import view admin directs Index
import DirectsIndex from '../pages/admin/directs/Index.jsx'

//import view admin direct Create
import DirectCreate from '../pages/admin/directs/Create.jsx'

//import view admin services Index
import ServicesIndex from '../pages/admin/services/Index.jsx'

//import view admin service Create
import ServiceCreate from '../pages/admin/services/Create.jsx'

//import view admin jkn mobile Index
import JknmobileIndex from '../pages/admin/jknmobile/Index.jsx'

//import view admin jkn mobile Create
import JknmobileCreate from '../pages/admin/jknmobile/Create.jsx'

//import view admin jkn mobile Create
import JknmobileEdit from '../pages/admin/jknmobile/Edit.jsx'

//import view admin informations Index
import InformationsIndex from '../pages/admin/informations/Index.jsx'

//import view admin informations Create
import InformationsCreate from '../pages/admin/informations/Create.jsx'

//import view admin informations Create
import InformationsEdit from '../pages/admin/informations/Edit.jsx'

//import view admin users Index
import UsersIndex from '../pages/admin/users/Index.jsx'

//import view admin user Create
import UserCreate from '../pages/admin/users/Create.jsx'

//import view admin user Edit
import UserEdit from '../pages/admin/users/Edit.jsx'

//=======================================================================
//WEB
//=======================================================================

//import view web Home
import Home from '../pages/web/home/Index.jsx'

//import view web category Show
import WebCategoryShow from '../pages/web/categories/Show.jsx'

//import view web place Index
import WebPlacesIndex from '../pages/web/places/Index.jsx'

//import view web place Show
import WebPlaceShow from '../pages/web/places/Show.jsx'

//import view web place Direction
import WebPlaceDirection from '../pages/web/places/Direction.jsx'

//import view web service Index
import WebServicesIndex from '../pages/web/services/Index.jsx'

//import view web jkn mobile Index
import WebJknmobileIndex from '../pages/web/jknmobile/Index.jsx'

//import view web indikator Show
import WebIndikatorShow from '../pages/web/indikator/Show.jsx'

//import view web pengunjung Show
import WebPengunjungShow from '../pages/web/pengunjung/Show.jsx'

//import view web kunjungan Show
import WebKunjunganShow from '../pages/web/kunjungan/Show.jsx'

//import view web rawatinap Show
import WebRawatinapShow from '../pages/web/rawatinap/Show.jsx'

//import view web 10 kasus terbesar diagnosa Show
import Web10KasusTerbesarShow from '../pages/web/10kasusterbesar/Show.jsx'

//import view web pendaftaran Show
import WebPendaftaranShow from '../pages/web/pendaftaran/Show.jsx'

//import view web ambil antrian Show
import WebAmbilAntrianShow from '../pages/web/pendaftaran/AmbilAntrian.jsx'

//import view web registrasi Show
import WebRegistrasiShow from '../pages/web/pendaftaran/Registrasi.jsx'

//import view web laboratorium Show
import WebLaboratoriumShow from '../pages/web/laboratorium/Show.jsx'

//import view web jadwal Show
import WebJadwalShow from '../pages/web/jadwaldokter/Show.jsx'

//import view web tentang Show
import WebTentangShow from '../pages/web/tentang/Show.jsx'

//import view web maps
import WebMapsIndex from '../pages/web/maps/Index.jsx'

//import view web search
import WebSearch from '../pages/web/search/Index.jsx'

function RoutesIndex() {
  return (
    <Routes>
      {/* route "/admin/login" */}
      <Route path='/admin/login' element={<Login />} />

      {/* private route "/admin/dashboard" */}
      <Route
        path='/admin/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/categories" */}
      <Route
        path='/admin/categories'
        element={
          <PrivateRoute>
            <CategoriesIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/categories/create" */}
      <Route
        path='/admin/categories/create'
        element={
          <PrivateRoute>
            <CategoryCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/categories/edit/:id" */}
      <Route
        path='/admin/categories/edit/:id'
        element={
          <PrivateRoute>
            <CategoryEdit />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/places" */}
      <Route
        path='/admin/places'
        element={
          <PrivateRoute>
            <PlacesIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/places/create" */}
      <Route
        path='/admin/places/create'
        element={
          <PrivateRoute>
            <PlaceCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/places/edit/:id" */}
      <Route
        path='/admin/places/edit/:id'
        element={
          <PrivateRoute>
            <PlaceEdit />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/sliders" */}
      <Route
        path='/admin/sliders'
        element={
          <PrivateRoute>
            <SlidersIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/sliders/create" */}
      <Route
        path='/admin/sliders/create'
        element={
          <PrivateRoute>
            <SliderCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/directs" */}
      <Route
        path='/admin/directs'
        element={
          <PrivateRoute>
            <DirectsIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/directs/create" */}
      <Route
        path='/admin/directs/create'
        element={
          <PrivateRoute>
            <DirectCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/services" */}
      <Route
        path='/admin/services'
        element={
          <PrivateRoute>
            <ServicesIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/services/create" */}
      <Route
        path='/admin/services/create'
        element={
          <PrivateRoute>
            <ServiceCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/jknmobile" */}
      <Route
        path='/admin/jknmobile'
        element={
          <PrivateRoute>
            <JknmobileIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/jknmobile/create" */}
      <Route
        path='/admin/jknmobile/create'
        element={
          <PrivateRoute>
            <JknmobileCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/jknmobile/edit/:id" */}
      <Route
        path='/admin/jknmobile/edit/:id'
        element={
          <PrivateRoute>
            <JknmobileEdit />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/informations" */}
      <Route
        path='/admin/informations'
        element={
          <PrivateRoute>
            <InformationsIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/informations/create" */}
      <Route
        path='/admin/informations/create'
        element={
          <PrivateRoute>
            <InformationsCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/informations/edit" */}
      <Route
        path='/admin/informations/edit/:id'
        element={
          <PrivateRoute>
            <InformationsEdit />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/users" */}
      <Route
        path='/admin/users'
        element={
          <PrivateRoute>
            <UsersIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/users/create" */}
      <Route
        path='/admin/users/create'
        element={
          <PrivateRoute>
            <UserCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/users/edit/:id" */}
      <Route
        path='/admin/users/edit/:id'
        element={
          <PrivateRoute>
            <UserEdit />
          </PrivateRoute>
        }
      />

      {/* route "/" */}
      <Route path='/' element={<Home />} />

      {/* route "/category/:slug" */}
      <Route path='/kecamatan/:slug' element={<WebCategoryShow />} />

      {/* route "/places" */}
      <Route path='/tempat' element={<WebPlacesIndex />} />

      {/* route "/places/:slug" */}
      <Route path='/lokasi/:slug' element={<WebPlaceShow />} />

      {/* route "/places/:slug/direction" */}
      <Route path='/lokasi/:slug/direction' element={<WebPlaceDirection />} />

      {/* route "/maps" */}
      <Route path='/peta' element={<WebMapsIndex />} />

      {/* route "/jknmobile" */}
      <Route path='/jknmobile' element={<WebJknmobileIndex />} />

      {/* route "/services" */}
      <Route path='/layanan' element={<WebServicesIndex />} />

      {/* route "/indikator" */}
      <Route path='/indikator' element={<WebIndikatorShow />} />

      {/* route "/pengunjung" */}
      <Route path='/pengunjung' element={<WebPengunjungShow />} />

      {/* route "/kunjungan" */}
      <Route path='/kunjungan' element={<WebKunjunganShow />} />

      {/* route "/rawat-inap" */}
      <Route path='/rawat-inap' element={<WebRawatinapShow />} />

      {/* route "/10-kasus-terbesar-diagnosa" */}
      <Route
        path='/10-kasus-terbesar-diagnosa'
        element={<Web10KasusTerbesarShow />}
      />

      {/* route "/pendaftaran" */}
      <Route path='/pendaftaran' element={<WebPendaftaranShow />} />

      {/* route "/registasi" */}
      <Route path='/registrasi' element={<WebRegistrasiShow />} />

      {/* route "/laboratorium" */}
      <Route path='/laboratorium' element={<WebLaboratoriumShow />} />

      {/* route "/jadwal" */}
      <Route path='/jadwal-dokter' element={<WebJadwalShow />} />

      {/* route "/ambilantrian" */}
      <Route path='/ambil-antrian' element={<WebAmbilAntrianShow />} />

      {/* route "/tentang" */}
      <Route path='/tentang-si-asri' element={<WebTentangShow />} />

      {/* route "/search" */}
      <Route path='/search' element={<WebSearch />} />
    </Routes>
  )
}

export default RoutesIndex
