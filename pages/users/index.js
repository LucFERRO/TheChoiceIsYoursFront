import React from 'react'
import Test from '../../components/Test'

export default function HomeUsers({users}) {
    console.log('HomeUsers:',users)
  return (
    <>
        <div>HomeUsers</div>
        <Test users={users}/>
    </>
  )
}


export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/users')
    const users = await res.json()

    const test2 = await fetch('http://localhost:3000/users/1')
    const user1 = await test2.json()

    return {
        props: {
            users,
            user1,
        },
    }
}
