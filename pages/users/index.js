import React from 'react'
import Navbar from '../../components/Navbar'
import { setCookie, getCookie, getCookies, deleteCookie } from "cookies-next"

export default function HomeUsers({users}) {

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
