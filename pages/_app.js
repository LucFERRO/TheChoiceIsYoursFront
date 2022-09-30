import axios from 'axios'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
    axios.interceptors.request.use(
        request => {
            // GET TOKEN
            request.headers = { 
                'Authorization': `Bearer $$TOKEN$$`,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            return request;
        },
        error => {
            Promise.reject(error)
        }
    )

    axios.interceptors.response.use((response) => {
        console.log('intercepted error response:', response)
        return response
      }, 
        error => {
            if (error.response.status === 400 && error.response.data == 'Username and password do not match.') {
                console.log('Wrong credentials')
                // const access_token = await refreshAccessToken();            
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                return error
            }
            return Promise.reject(error);
        });
    

    return <Component {...pageProps} />
}

export default MyApp
