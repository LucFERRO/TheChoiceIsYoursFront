import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Test from '../components/Test'
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { apiService } from '../services/APIService';
import { setCookie, getCookie, getCookies, deleteCookie } from "cookies-next"

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
        apiService.login(loginDataForm)
        .then(response => {
            let tokenData = {
                refreshToken: response.data.refreshToken
            }
            apiService.post('tokens',tokenData)
            return router.push('/profile')
        })
        .catch(error => {
            // console.log('Catch in index loginSubmit: ', error.response.message)
        })
    }

    return (
        <>
            <Head>
                <title>The Choice is Yours</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" type="image/gif" />
            </Head>
            <Navbar />
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
