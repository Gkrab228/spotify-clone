import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const protectedRoutes = ['/open']
const publicRoutes = ['/login', '/signup']

export default async function proxy(request: NextRequest){

    const path = request.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path);

    const isTokenRightous = validateToken(request.cookies.get('auth-token'));

    if(!isTokenRightous&&!isPublicRoute)  return NextResponse.redirect(new URL('/login', request.url))
    
    if(isTokenRightous&&isPublicRoute) return NextResponse.redirect(new URL('/open', request.url));

    return NextResponse.next();
}

function validateToken(token:RequestCookie|undefined){
    if(!token) return false;
    return jwt.verify(token.value,process.env.JWT_SECRET!);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}