import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../services/APIService';
import inputStyle from '../styles/Input.module.scss'

export default function StyledForm() {

    const [errorInputs, setErrorInputs] = useState()

    // let inputText = document.querySelectorAll('input.login-register-input');
    // for (let i = 0; i < inputText.length; i++) {
    //     let inputLabel = document.getElementById(`${inputText[i].id}-label`);
    //     inputText[i].addEventListener('blur', () => {
    //         if (inputText[i].value) {
    //             inputLabel.style.color = '#807E8C'
    //             inputLabel.style.top = '10px'
    //             inputLabel.style.fontSize = '10px'
    //         } else {
    //             inputLabel.attributeStyleMap.delete('color')
    //             inputLabel.attributeStyleMap.delete('top')
    //             inputLabel.attributeStyleMap.delete('font-size')
    //         }
    //     });
    // }

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

    const setErrorAttribute = (element, errorString) => {
        let targetedElement = document.getElementById(element)
        if (!targetedElement.value) {
            targetedElement.parentElement.setAttribute('data-error-empty', errorString)
            return
        }
        targetedElement.parentElement.setAttribute('data-error', errorString)
    }

    const removeErrorAttribute = (e) => {
        e.target.parentElement.removeAttribute('data-error');
        e.target.parentElement.removeAttribute('data-error-empty');
    }

  return (
    <>  
        <div className='container'>
            <div className={inputStyle.styledForm}>
                <div className={inputStyle.inputContainer} data-error-empty='Requis'>
                    <input id="usernameInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={removeErrorAttribute} name="username" type="text" placeholder=""/>
                    <label htmlFor="usernameInput" id="usernameInputLabel">Username</label>
                </div>
                <div className={inputStyle.inputContainer}>
                    <input id="passwordInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={removeErrorAttribute} name="password" type="password" placeholder=""/>
                    <label htmlFor="passwordInput" id="passwordInputLabel">Password</label>
                </div>
                <div className={inputStyle.inputContainer}>
                    <input id="emailInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={removeErrorAttribute} name="email" type="text" placeholder=""/>
                    <label htmlFor="emailInput" id="emailInputLabel">Email</label>
                </div>
                <div className={inputStyle.inputContainer}>
                    <input id="firstnameInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={removeErrorAttribute} name="firstname" type="text" placeholder=""/>
                    <label htmlFor="firstnameInput" id="firstnameInputLabel">Firstname</label>
                </div>
                <div className={inputStyle.inputContainer}>
                    <input id="lastnameInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={removeErrorAttribute} name="lastname" type="text" placeholder=""/>
                    <label htmlFor="lastnameInput" id="lastnameInputLabel">Lastname</label>
                </div>
                <div className={inputStyle.inputContainer}>
                    <input id="dateOfBirthInput" className={inputStyle.registerInput} onBlur={handleLabel} onChange={removeErrorAttribute} name="dateOfBirth" type="date" placeholder=""/>
                    <label htmlFor="dateOfBirthInput" id="dateOfBirthInputLabel" className={inputStyle.dateLabel}>Date of birth</label>
                </div>
                <button type="submit" className={inputStyle.registerButton} 
                // @click.prevent="register(pseudo, email, password, passwordConfirmation)"
                >Inscription</button>
            </div>   
        </div>
    </>
  ) 
}
