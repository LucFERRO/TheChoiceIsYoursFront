import styles from '../styles/Home.module.scss'

import Test from '../components/Test'

export default function Home({ users, user1 }) {

    console.log(users)

    return (
        <>
      <ul>
        {users.map((user,index) => (
            <li key={index}>{user.username}</li>
            ))}
      </ul>
            <Test props={users}/>
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



    // <div className={styles.container}>
    //     Template propre Next+Axios
    //     <Test />
    //     {/* <Blog /> */}
    // </div>