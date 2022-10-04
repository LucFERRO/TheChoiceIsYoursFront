import { NextResponse } from "next/server";
import { setCookie, getCookie, getCookies, hasCookie } from "cookies-next"


export default function middleware (req) {

    let verify = req.cookies.get('accessToken')

    let url = req.url

    if (!verify && url.includes('/profile')) {
        return NextResponse.redirect('http:/localhost:3000/')
    }
}