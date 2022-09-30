import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Test from '../components/Test'
import Link from 'next/link'
import { apiService } from '../services/APIService';

export default function Home({ users, user1 }) {
    const router = useRouter()

    const [loginDataForm, setLoginDataForm] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setLoginDataForm({
          ...loginDataForm,
          [e.target.name]: value
        });
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        const {username, password} = loginDataForm
        apiService.login(loginDataForm).then(response => {
            console.log(response.data)

            router.push('/')

        })
    }

    // AXIOS INTERCEPTOR SALTY ED FRONT
    // const axiosInterceptors = (config) => {
    //     axios.interceptors.request.use((config) => {
    //         if (localStorage.getItem("token")) {
    //         config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    //             "token"
    //         )}`;
    //         }
    //         return config;
    //     })
    
    //     axios.interceptors.response.use(
    //     function (response) {
    //         return response;
    //     },
    //     function (error) {
    //         if (error.response.status === 401 && error.response.data.message !== 'Invalid credentials.') {
    //         localStorage.removeItem("token");
    //         router.push({ name: "Login" });
    //         }
    //     })
    // }


    return (
        <>
            <Link href="/users"><a>Users</a></Link>
            <div className='container'>
                <h1 className='register'>Login</h1>
                <form className='form-login' onSubmit={loginSubmit} method="post">

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={loginDataForm.value} onChange={handleChange} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={loginDataForm.value} onChange={handleChange} />

                <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}
  

export async function getStaticProps() {
    const res = await fetch('http://localhost:5000/api/users')
    const users = await res.json()

    const test2 = await fetch('http://localhost:5000/api/users/1')
    const user1 = await test2.json()

    return {
        props: {
            users,
            user1,
        },
    }
}



    // <div className={styles.container}>
    //     Template propre Next+Axios
    //     <Test />
    //     {/* <Blog /> */}
    // </div>