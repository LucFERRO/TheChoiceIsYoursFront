import React from 'react'
import Link from 'next/link'

export default function Navbar() {

  return (
    <>
        <div className='navbar'>
            <Link href="/"><a>Home</a></Link>
            {/* <Link href="/login"><a>Login</a></Link> */}
            <Link href="/register"><a>Register</a></Link>
            <Link href="/profile"><a>Profile</a></Link>
            <Link href="/users"><a>Users</a></Link>
            <Link href="/test"><a>Test CSS</a></Link>
        </div>
    </>
  )
}
