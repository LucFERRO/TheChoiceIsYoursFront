import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../services/APIService';
import inputStyle from '../styles/Input.module.scss'

export default function StyledForm({formName, formButton, isRegister, isEdit, handleChange, submit, dataForm}) {

    const handleLabel = (e) => {
        let label = e.target.parentElement.childNodes[1]
        if (e.target.value) {
            label.style.color = '#807E8C'
            label.style.top = '10px'
            label.style.fontSize = '10px'
        } else {
            label.attributeStyleMap.delete('color')
            label.attributeStyleMap.delete('top')
            label.attributeStyleMap.delete('font-size')
        }
    }

    // const setErrorAttribute = (element, errorString) => {
    //     let targetedElement = document.getElementById(element)
    //     if (!targetedElement.value) {
    //         targetedElement.parentElement.setAttribute('data-error-empty', errorString)
    //         return
    //     }
    //     targetedElement.parentElement.setAttribute('data-error', errorString)
    // }

    const removeErrorAttribute = (e) => {
        e.target.parentElement.removeAttribute('data-error');
        e.target.parentElement.removeAttribute('data-error-empty');
    }

    const handleInputChange = (e) => {
        removeErrorAttribute(e)
        handleChange(e)
    }

  return (
    <>  
        <div className='container'>
            <h1 className='register'>{formName}</h1>
            <form className='formRegister' onSubmit={submit} method="post">
                <div className={inputStyle.styledForm}>
                    <div className={inputStyle.inputContainer}>
                        <input id="usernameInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={handleInputChange} name="username" value={dataForm.username} type="text" placeholder=""/>
                        <label htmlFor="usernameInput" id="usernameInputLabel">Username</label>
                    </div>
                    <div className={inputStyle.inputContainer}>
                        <input id="passwordInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={handleInputChange} name="password" value={dataForm.password} type="password" placeholder=""/>
                        <label htmlFor="passwordInput" id="passwordInputLabel">Password</label>
                    </div>
                    <div className={inputStyle.inputContainer}>
                        <input id="emailInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={handleInputChange} name="email" value={dataForm.email} type="text" placeholder=""/>
                        <label htmlFor="emailInput" id="emailInputLabel">Email</label>
                    </div>
                    <div className={inputStyle.inputContainer}>
                        <input id="firstnameInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={handleInputChange} name="firstname" value={dataForm.firstname} type="text" placeholder=""/>
                        <label htmlFor="firstnameInput" id="firstnameInputLabel">Firstname</label>
                    </div>
                    <div className={inputStyle.inputContainer}>
                        <input id="lastnameInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={handleInputChange} name="lastname" value={dataForm.lastname} type="text" placeholder=""/>
                        <label htmlFor="lastnameInput" id="lastnameInputLabel">Lastname</label>
                    </div>
                    <div className={inputStyle.inputContainer}>
                        <input id="dateOfBirthInput" className={inputStyle.registerInput} 
                        onBlur={handleLabel} 
                        onChange={handleInputChange} name="date_of_birth" value={dataForm.date_of_birth} type="date" />
                        <label htmlFor="dateOfBirthInput" id="dateOfBirthInputLabel" className={inputStyle.dateLabel}>Date of birth</label>
                    </div>

                    <button type="submit" className={inputStyle.registerButton} 
                    // @click.prevent="register(pseudo, email, password, passwordConfirmation)"
                    >{formName}</button>
                </div>
            </form>   
        </div>
    </>
  ) 
}
