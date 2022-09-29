import styles from '../styles/Home.module.scss'

import React, { useState } from 'react'
import Test from '../components/Test'
import Link from 'next/link'

export default function Home({ users, user1 }) {

    console.log('Home',users)

    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setDataForm({
          ...dataForm,
          [e.target.name]: value
        });
    }

    const loginSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <>
            <Link href="/users"><a>Users</a></Link>
            <div className='container'>
                <h1 className='register'>Login</h1>
                <form className='form-login' onSubmit={loginSubmit} method="post">

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={dataForm.value} onChange={handleChange} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={dataForm.value} onChange={handleChange} />

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