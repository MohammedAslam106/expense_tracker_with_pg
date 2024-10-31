import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token=request.cookies.get('token') 
  const pathname=request.nextUrl.pathname
  const isPublicPath=pathname=='/login' || pathname=='/signup' || pathname=='/' || pathname=='/forgot-password' || pathname=='/login-with-providers'
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/home',request.url))
  }
  else if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/',request.url))
  }
  // else if(isPublicPath && !token){
  //   return NextResponse.redirect(new URL(request.nextUrl.pathname,request.url))
  // }
  // return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/home',
    '/forgot-password',
    '/login-with-providers',
    '/create-category',
    '/create-expense',
    '/profile',
    '/about',
]
}