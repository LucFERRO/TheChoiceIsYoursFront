import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../../services/APIService';

export default function Register({ users }) {
    const router = useRouter()

    const [currentUser, setCurrentUser] = useState()

    const [updateProfileDataForm, setUpdateProfileForm] = useState({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        date_of_birth: ''
    })

    useEffect(() => { 
        const user = users.find( user => user.id == getCookie('loggedUserId') )
        setCurrentUser(user)
        console.log(currentUser)
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdateProfileForm({
          ...updateProfileDataForm,
          [e.target.name]: value
        });
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        const {username, password, email, firstname, lastname, date_of_birth} = updateProfileDataForm
        apiService.get('users').then(response => {
            const users = response.data
            const checkEmailDupe = users.find(user => user.email == email)
            const checkUsernameDupe = users.find(user => user.username == username)

            if (checkEmailDupe != null) {
                return console.log('Adress already used.')
            }

            if (checkUsernameDupe != null) {
                return console.log('Username already used.')
            }

            apiService.post('users',{username, password, email, firstname, lastname, date_of_birth})
            .then(response => {
                console.log(response.data.message)
                router.push('/')
            })
        })
    }
    
  return (
    <>
        <Navbar />
        <Form formName={'Edit profile'} handleChange={handleChange} submit={registerSubmit} dataForm={updateProfileDataForm} />
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
