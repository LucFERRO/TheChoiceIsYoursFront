import { NextResponse } from "next/server";
import { setCookie, getCookie, getCookies, hasCookie } from "cookies-next"


export default function middleware (req) {


    // let verify = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
    // let verify = getCookie('accessTokenCookie') ? getCookie('accessTokenCookie') : null
    // let verify = hasCookie('accessTokenCookie')

    let verify = true

    let url = req.url

    if (!verify && url.includes('/profile')) {
        return NextResponse.redirect('http:/localhost:3000/')
    }
}