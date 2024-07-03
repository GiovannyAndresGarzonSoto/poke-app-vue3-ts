import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3666/api'
})

export default instance