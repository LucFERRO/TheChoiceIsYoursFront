import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../../services/APIService';

export default function Profile({ users }) {
    const router = useRouter()

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => { 
        const user = users.find( user => user.id == getCookie('loggedUserId') )
        setCurrentUser(user)
    }, []);

    // const user = users.find((user : userTypes) => user.username == req.body.username)

    const logout = (e) => {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        deleteCookie('loggedUserId')
        router.push('/')
    }

    const edit = () => {
        router.push('/profile/edit')
    }

    // apiService.test(1)
        // .then(response => console.log(response))
        // .catch(error => console.log(error))

  return (
    <>  

        <Navbar />
        <div className='container'>
            <h1>Profile</h1>

            <button onClick={logout}>Logout</button>         
      
            {currentUser ?             
                <>
                    <ul>
                        <li>Username : {currentUser.username}</li>
                        <li>Firstname: {currentUser.firstname}</li>
                        <li>Lastname: {currentUser.lastname}</li>
                        <li>Email: {currentUser.email}</li>
                        <li>Date of birth: {currentUser.date_of_birth}</li>
                    </ul> 
                    <button onClick={edit}>Edit</button> 
                </>
                : 
                ''
            }
        </div>
    </>
  )
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:5000/api/users')
    const users = await res.json()

    return {
        props: {
            users,
        },
    }
}
