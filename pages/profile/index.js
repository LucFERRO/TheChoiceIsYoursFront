import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { setCookie, getCookie, getCookies, deleteCookie } from "cookies-next"

export default function Profile({users, loggedUser}) {
    const router = useRouter()

    const [loggedInUserId, setLoggedInUserId] = useState()
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => { 
        // setLoggedInUserId(localStorage.getItem("currentUserId")) 
        setLoggedInUserId(getCookie('loggedUserId')) 
    }, []);
    useEffect(() => { 
        const user = users.find( user => user.id == loggedInUserId )
        setCurrentUser(user)
    }, [loggedInUserId]);

    // const user = users.find((user : userTypes) => user.username == req.body.username)

    const logout = (e) => {
        deleteCookie('loggedUserId')
        router.push('/')
    }

  return (
    <>  

        <Navbar />
        <div className='container'>
            <h1>Profile</h1>

            <button onClick={logout}>Logout</button>         
            {/* <ul>
                <li>Username : {currentUser.username}</li>
                <li>Firstname: {currentUser.firstname}</li>
                <li>Lastname: {currentUser.lastname}</li>
                <li>Email: {currentUser.email}</li>
                <li>Date of birth: {currentUser.date_of_birth}</li>
            </ul> */}
            {currentUser ?             
                <ul>
                    <li>Username : {currentUser.username}</li>
                    <li>Firstname: {currentUser.firstname}</li>
                    <li>Lastname: {currentUser.lastname}</li>
                    <li>Email: {currentUser.email}</li>
                    <li>Date of birth: {currentUser.date_of_birth}</li>
                </ul> : ''}
        </div>
    </>
  )
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:5000/api/users')
    const users = await res.json()

    // const currentUserId = localStorage.getItem("currentUserId")
    // const resUser = await fetch(`http://localhost:5000/api/users/${currentUserId}`)
    // const loggedUser = await resUser.json()

    return {
        props: {
            users,
            // loggedUser
        },
    }
}
