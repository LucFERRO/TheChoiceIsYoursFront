import axios from 'axios'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
    
    axios.interceptors.request.use(
        request => {
            // console.log(request)
            
            // GET TOKEN
            // request.headers = { 
            //     'Authorization': `Bearer $$TOKEN$$`,
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }

            // request.headers.currentUserTest = 'test'
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
