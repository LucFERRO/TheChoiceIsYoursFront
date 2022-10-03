import React from 'react'
import Navbar from '../../components/Navbar'
import Test from '../../components/Test'
import { setCookie, getCookie, getCookies, deleteCookie } from "cookies-next"

export default function HomeUsers({users}) {
    // console.log('HomeUsers:',users)

    console.log('all cookies',getCookies())

  return (
    <>  
        <Navbar />
        <ul>
        {users.map((user,index) => (
            <li key={index}>{user.username}</li>
            ))}
        </ul>
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
