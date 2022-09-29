import React, { useState } from 'react'


export default function Register() {

    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        dateofbirth: ''
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
        console.log(dataForm)
    }

    const handleRegisterButton = (e) => {
        e.preventDefault()
        console.log('nique')
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


                <label htmlFor="dateofbirth">Date of birth:</label>
                <input type="date" id="dateofbirth" name="dateofbirth" value={dataForm.value} onChange={handleChange} />

                {/* <button type="submit" onClick={handleRegisterButton}>Submit</button> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    </>
  )
}
