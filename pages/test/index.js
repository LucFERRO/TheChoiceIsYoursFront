import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../../services/APIService';

export default function test() {
  return (
    <>  
        <Navbar />
        <div className='container'>
            <div className='register-form'>
                <div class="input-container">
                    <input id="pseudo-input" className="login-register-input" name="pseudo" type="text" placeholder=""/>
                    <label for="pseudo-input" id="pseudo-input-label">Pseudo</label>
                </div>
            </div>   
        </div>
    </>
  ) 
}
