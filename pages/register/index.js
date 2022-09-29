import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { apiService } from '../../services/APIService';

export default function Register() {
    const router = useRouter()

    const [dataForm, setDataForm] = useState({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        date_of_birth: ''
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setDataForm({
          ...dataForm,
          [e.target.name]: value
        });
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        const {username, password, email, firstname, lastname, date_of_birth} = dataForm
        apiService.get('users').then(response => {
            const users = response.data.data
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
        <div className='container'>
            <h1 className='register'>Register</h1>
            <form className='form-register' onSubmit={registerSubmit} method="post">

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={dataForm.value} onChange={handleChange} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={dataForm.value} onChange={handleChange} />

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={dataForm.value} onChange={handleChange} />

                <label htmlFor="firstname">Firstname:</label>
                <input type="text" id="firstname" name="firstname" value={dataForm.value} onChange={handleChange} />

                <label htmlFor="lastname">Lastname:</label>
                <input type="text" id="lastname" name="lastname" value={dataForm.value} onChange={handleChange} />


                <label htmlFor="date_of_birth">Date of birth:</label>
                <input type="date" id="date_of_birth" name="date_of_birth" value={dataForm.value} onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
        </div>
    </>
  )
}
