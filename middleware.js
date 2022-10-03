import { NextResponse } from "next/server";
import { setCookie, getCookie, getCookies } from "cookies-next"


export default function middleware (req) {
    // let verify = req.cookies.get('loggedIn')
    let verify = true

    // let verify = getCookie('loggedUserId')

    let url = req.url

    if (!verify && url.includes('/profile')) {
        console.log(verify)
        return NextResponse.redirect('http:/localhost:3000/')
    }
}