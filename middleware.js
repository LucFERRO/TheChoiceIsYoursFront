import { NextResponse } from "next/server";

export default function middleware (req) {

    let url = req.url

    let verify = req.cookies.get('accessToken')

    if (!verify && url.includes('/profile')) {
        return NextResponse.redirect('http:/localhost:3000/')
    }
}