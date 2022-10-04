import axios from 'axios'
import '../styles/globals.scss'
import jwt_decode from 'jwt-decode'
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"

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

                console.log('isExpired: ', isExpired)

                // if (isExpired) console.log('Expired')
                if (!isExpired) return request
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
