//import axios
import axios from 'axios'

const Backend = axios.create({
  //set endpoint API
  baseURL: 'http://127.0.0.1:8000/',
})

export default Backend
