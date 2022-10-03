import axios from 'axios'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
    
    axios.interceptors.request.use(
        async request => {
            // console.log(request)
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjQ4MDAyNDAsImV4cCI6MTY2NDgwMDI1NX0.RMUDUKijf_076rDRFQELQp2TjSWDFpJb_fTuWK6jMXI'

            request.headers.Authorization = `Bearer ${token}`

            return request;
        },
        error => {
            Promise.reject(error)
        }
    )

    axios.interceptors.response.use((response) => {
        // console.log(response)
        if (response.status == 200 && response.data.successfullLogin) {
            console.log(response.data.accessToken)
        }
        return response
      }, 
        error => {
            // console.log(error)
            if (error.response.status === 400 && !error.response.data.userFound) {
                console.log('Interceptor in _app: ',error.response.data.message)
                // const access_token = await refreshAccessToken();            
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                // return error
            }
            if (error.response.status === 401 && !error.response.data.successfullLogin) {
                console.log('Interceptor in _app: ',error.response.data.message)
                // const access_token = await refreshAccessToken();            
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                // return error
            }
            return Promise.reject(error);
        });
    
    return <Component {...pageProps} />
}

export default MyApp
