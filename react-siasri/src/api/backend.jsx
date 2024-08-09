//import axios
import axios from 'axios'

const Backend = axios.create({
  //set endpoint API
  baseURL: 'https://apiasriv2.rsudkk.work/',
})

export default Backend
