import axios from 'axios';

export default axios.create({
    baseURL : "http://192.168.122.1:8000/api/v1"
})