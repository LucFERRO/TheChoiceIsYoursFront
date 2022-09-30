import React, { useEffect, useState } from 'react'

export default function Profile({users}) {

    const [loggedInUserId, setLoggedInUserId] = useState()
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => { 
        setLoggedInUserId(localStorage.getItem("currentUserId")) 
    }, []);
    useEffect(() => { 
        const user = users.find( user => user.id == loggedInUserId )
        setCurrentUser(user)
    }, [loggedInUserId]);

    console.log(loggedInUserId)
    console.log(currentUser)

    // const user = users.find((user : userTypes) => user.username == req.body.username)

  return (
    <>
        <div className='container'>
            <h1>Profile</h1>
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


export async function getStaticProps() {
    const res = await fetch('http://localhost:5000/api/users')
    const users = await res.json()

    return {
        props: {
            users,
        },
    }
}
