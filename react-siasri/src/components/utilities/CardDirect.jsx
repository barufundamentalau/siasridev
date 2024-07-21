// //import hook useState and useEffect from react
// import React, { useState, useEffect } from 'react'

// //import component carousel
// // import { Carousel } from 'react-bootstrap'

// //import link
// // import { Link } from 'react-router-dom'

// //import BASE URL API
// import Api from '../../api'

// function CardDirect() {
//   //state sliders
//   const [directs, setDirects] = useState([])

//   //function "fetchDataSliders"
//   const fetchDataDirects = async () => {
//     //fetching Rest API "sliders"
//     await Api.get('/api/web/directs').then((response) => {
//       //set data to state
//       setDirects(response.data.data)
//     })
//   }

//   //hook
//   useEffect(() => {
//     //call function "fetchDataDirects"
//     fetchDataDirects()
//   }, [])

//   return (
//     <div className='col-md-4 mb-4'>
//       {directs.map((direct) => (
//         <div
//           className='card border-0 shadow-sm rounded-3 text-center text-uppercase'
//           key={direct.id}
//         >
//           <div className='card-body mt-2'>
//             <h5>{direct.title}</h5>
//             <img
//               className='d-block w-100'
//               src={direct.image}
//               style={{ height: '500px', objectFit: 'cover' }}
//               alt='First slide'
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default CardDirect
