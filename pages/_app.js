import axios from 'axios'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
    
    axios.interceptors.request.use(
        request => {
            // console.log(request)


            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjQ3OTU3ODMsImV4cCI6MTY2NDc5NTc5OH0.cul5u8qfqjyFGW37a0-vsz437mptW0Qn56p_Xi6xs3I'

            // request.headers = { 
            //     'Access-Control-Allow-Origin': "*",
            //     'Content-type': "Application/json",
            //     Authorization: `Bearer ${token}`
            // }

            // request.headers['Authorization'] = `Bearer ${token}`

            request.headers.Authorization = token

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
