import axios from 'axios';

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

let baseURL = "http://localhost:8000/api"
if (!development)
    baseURL = "http://localhost:8000/api"

export default axios.create({
    baseURL
});