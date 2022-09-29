import React from 'react'
import Test from '../../components/Test'

export default function HomeUsers({users, user1}) {
    // console.log('HomeUsers:',users)
  return (
    <>
        <div>HomeUsers</div>
        <Test users={users} user1={user1}/>
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
