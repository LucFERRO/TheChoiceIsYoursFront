import axios from 'axios'
import '../styles/globals.scss'
import jwt_decode from 'jwt-decode'

function MyApp({ Component, pageProps }) {
    
    axios.interceptors.request.use(
        async request => {
            console.log('Request url: ',request.url)
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjQ4NzA2MTYsImV4cCI6MTY2NDg3MDYzMX0.2ccptFANNKQhNi0Lhj6XXpsLMEY4MX-o7mtni6dy3bo"

            request.headers.Authorization = `Bearer ${token}`

            // console.log('Doit être test: ',localStorage.getItem('token'))

            if (request.url.includes('http://localhost:5000/api/users/test/')) {
                console.log('Hello test')
    
                let decodedToken = jwt_decode(token)
                let currentTime = new Date().getTime() / 1000
                // if (decodedToken.exp < currentTime) console.log('Expired')
                return request
            }

            return request;
        },
        error => {
            Promise.reject(error)
        }
    )

    axios.interceptors.response.use((response) => {
        // console.log(response)
        if (response.status == 200 && response.data.successfullLogin) {
            console.log('Access token: ', response.data.accessToken)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
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
