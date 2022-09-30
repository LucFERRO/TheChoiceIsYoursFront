import React from 'react'
import Test from '../../components/Test'

export default function HomeUsers({users}) {
    // console.log('HomeUsers:',users)
  return (
    <>
        <div>HomeUsers</div>
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
