import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { apiService } from '../services/APIService';
import { setCookie, getCookie, getCookies, deleteCookie } from "cookies-next"

export default function Home({ users }) {
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
            apiService.post('tokens',tokenData).then(response => setCookie('loginSuccessfull', true))
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

    return {
        props: {
            users,
        },
    }
}
