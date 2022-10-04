import React from 'react'

export default function Form({formName, handleChange, submit, dataForm}) {
  return (
    <div className='container'>
        <h1 className='register'>{formName}</h1>
        <form className='form-register' onSubmit={submit} method="post">

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
  )
}
