import React from 'react'

export default function Test({users}) {
    console.log('test compo dans page Homeusers:', users)
  return (
    <div>Test</div>
  )
}

// export async function getStaticProps() {
//     const res = await fetch('http://localhost:3000/users')
//     const posts = await res.json()

//     const test2 = await fetch('http://localhost:3000/users/1')
//     const user1 = await test2.json()

//     return {
//         props: {
//             users,
//             user1,
//         },
//     }
// }
