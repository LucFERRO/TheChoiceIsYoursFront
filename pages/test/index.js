import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import { apiService } from '../../services/APIService';
import inputStyle from '../../styles/Input.module.scss'
import StyledForm from '../../components/StyledForm';

export default function test() {
  return (
    <>  
        <Navbar />
        <StyledForm />
    </>
  ) 
}
