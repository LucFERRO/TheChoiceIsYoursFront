import styles from '../styles/Home.module.scss'

import Test from '../components/Test'
import Link from 'next/link'

export default function Home({ users, user1 }) {

    console.log('Home',users)

    return (
        <>
      <ul>
        {users.data.map((user,index) => (
            <li key={index}>{user.username}</li>
            ))}
      </ul>
            <Test users={users} user1={user1}/>
            <Link href="/users"><a>Users</a></Link>
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



    // <div className={styles.container}>
    //     Template propre Next+Axios
    //     <Test />
    //     {/* <Blog /> */}
    // </div>