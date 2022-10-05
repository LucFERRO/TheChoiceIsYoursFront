import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import { apiService } from '../../services/APIService';

export default function Register() {
    const router = useRouter()

    const [registerDataForm, setRegisterDataForm] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        firstname: '',
        lastname: '',
        date_of_birth: ''
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setRegisterDataForm({
          ...registerDataForm,
          [e.target.name]: value
        });
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        const {username, password, email, firstname, lastname, date_of_birth} = registerDataForm
        apiService.get('users').then(response => {
            const users = response.data
            const checkEmailDupe = users.find(user => user.email == email)
            const checkUsernameDupe = users.find(user => user.username == username)

            if (!password) return console.log('Password is required.')

            if (checkEmailDupe != null) return console.log('Adress already used.')


            if (checkUsernameDupe != null) return console.log('Username already used.')


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
        <Form formName={'Register'} formButton={'Register'} handleChange={handleChange} submit={registerSubmit} dataForm={registerDataForm} />
    </>
  )
}
