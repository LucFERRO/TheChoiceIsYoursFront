import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../../services/APIService';

export default function Profile({users, loggedUser}) {
    const router = useRouter()

    const [loggedUserId, setLoggedUserId] = useState()
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => { 
        // setLoggedInUserId(localStorage.getItem("currentUserId")) 
        setLoggedUserId(localStorage.getItem('loggedUserId')) 
    }, []);
    useEffect(() => { 
        const user = users.find( user => user.id == loggedUserId )
        setCurrentUser(user)
    }, [loggedUserId]);

    // const user = users.find((user : userTypes) => user.username == req.body.username)

    const logout = (e) => {
        deleteCookie('loggedUserId')
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('loggedUserId');
        router.push('/')
    }

    apiService.test(1)
        // .then(response => console.log(response))
        // .catch(error => console.log(error))

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
