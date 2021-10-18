import axios from 'axios';

export default axios.create({
    baseURL : "http://192.168.0.102:8000/api/v1"
})