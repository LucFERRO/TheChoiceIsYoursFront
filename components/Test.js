import React from 'react'

export default function Test({users,user1}) {
    console.log('Test compo:', users)
    console.log('Test compo:', user1)
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
