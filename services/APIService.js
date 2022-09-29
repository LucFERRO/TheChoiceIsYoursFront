const url = 'http://localhost:5000';

import axios from 'axios'

const apiService = {

    login(logs) {
        return axios
            .post(`${url}/api/auth/login`, logs)
    },
    get(ressource) {
        return axios.get(`${url}/api/${ressource}`)
    },
    post(ressource, data, param = {}) {
        return axios
            .post(`${url}/api/${ressource}`, data, param)
    },
    put(ressource, data) {
        return axios
            .put(`${url}/api/${ressource}`, data)
    },
    delete(ressource, data) {
        return axios
            .delete(`${url}/api/${ressource}`, data)
    },
}
  
export { apiService }