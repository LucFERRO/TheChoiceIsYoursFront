import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { apiService } from '../services/APIService';
import { setCookie, getCookie, getCookies, deleteCookie } from "cookies-next"

export default function Home({ users }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>The Choice is Yours</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" type="image/gif" />
            </Head>
            <Navbar />
            <div className='container'>
                <h1>Home</h1>
            </div>
        </>
    )
}


