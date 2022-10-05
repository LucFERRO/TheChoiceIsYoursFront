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
    }, []);
    useEffect(() => { 
        setUpdateProfileForm({
            username: currentUser ? currentUser.username : '',
            email: currentUser ? currentUser.email : '',
            password: '',
            passwordConfirm: '',
            firstname: currentUser ? currentUser.firstname : '',
            lastname: currentUser ? currentUser.lastname : '',
            date_of_birth: currentUser ? currentUser.date_of_birth : ''
        })
    }, [currentUser]);

    console.log(currentUser)

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdateProfileForm({
          ...updateProfileDataForm,
          [e.target.name]: value
        });
    }

    const editProfileSubmit = (e) => {
        e.preventDefault()
        const {username, password, email, firstname, lastname, date_of_birth} = updateProfileDataForm
        apiService.get('users').then(response => {
            const users = response.data
            const checkEmailDupe = users.find(user => user.email == email)
            const checkUsernameDupe = users.find(user => user.username == username)

            if (!password) return console.log('Password is required.')

            if (checkEmailDupe != null && checkEmailDupe.email != currentUser.email) {
                return console.log('Adress already used.')
            }

            if (checkUsernameDupe != null && checkUsernameDupe.username != currentUser.username) {
                return console.log('Username already used.')
            }

            apiService.put(`users/${getCookie('loggedUserId')}`,{username, password, email, firstname, lastname, date_of_birth})
            .then(response => {
                console.log(response.data.message)
                router.push('/profile')
            })
        })
    }
    
  return (
    <>
        <Navbar />
        <Form formName={'Edit profile'} formButton={'Edit'} isEdit={true} handleChange={handleChange} submit={editProfileSubmit} dataForm={updateProfileDataForm} />
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
