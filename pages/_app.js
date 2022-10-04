import axios from 'axios'
import '../styles/globals.scss'
import jwt_decode from 'jwt-decode'
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../services/APIService'

function MyApp({ Component, pageProps }) {
    
    axios.interceptors.request.use(
        async request => {

            // console.log('Request url: ',request.url)

            let token = localStorage.getItem('accessToken')

            request.headers.Authorization = `Bearer ${token}`

            if (request.url.includes('http://localhost:5000/api/users/test/')) {
    
                let decodedToken = jwt_decode(token)
                let currentTime = new Date().getTime() / 1000
                let isExpired = decodedToken.exp < currentTime

                if (!isExpired) {
                    return request      //If not expired, proceed.
                } else {
                    const tokenARemplacerParLocalStorageRefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWnVsIiwiaWF0IjoxNjY0Nzg2ODMyfQ.oXdMRVtXuigBJhQics70gaoMohXmK4bYIGZG-yUrstA'
                    
                    const newToken = await apiService.refreshAccessToken({"token": tokenARemplacerParLocalStorageRefreshToken})
                    console.log('New token: ', newToken.data.accessToken)
                    localStorage.setItem('accessToken', newToken.data.accessToken)
                    request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
                    return request
                }
            }



            // console.log('Doit être test: ',localStorage.getItem('token'))

            return request;
        },
        error => {
            Promise.reject(error)
        }
    )

    axios.interceptors.response.use((response) => {
        // console.log(response)
        if (response.status == 200 && response.data.successfullLogin) {
            localStorage.setItem('accessToken', response.data.accessToken)
            // setCookie('accessTokenCookie', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('loggedUserId', response.data.userId)
        }
        return response
      }, 
        error => {
            // console.log(error)
            if (error.response.status === 400 && !error.response.data.userFound) {
                console.log('Interceptor in _app: ', error.response.data.message)

                // const access_token = await refreshAccessToken();            
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                // return error
            }
            if (error.response.status === 401 && !error.response.data.successfullLogin) {
                console.log('Interceptor in _app: ', error.response.data.message)

                // const access_token = await refreshAccessToken();            
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                // return error
            }
            if (error.response.status === 403 && error.response.data.tokenIsExpired) {
                console.log('Interceptor in _app: ', error.response.data.message)

                // const access_token = await refreshAccessToken();            
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                // return error
            }
            return Promise.reject(error);
        });
    
    return <Component {...pageProps} />
}

export default MyApp
