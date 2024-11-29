import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { auth, nextAuthConfig } from '../next.auth.config'

// The following line will be usefull when we move the middleware logic to the autherize callback function of the auth.ts file provided by the auth.js. As we are using the credentials login and database session startegy so we can't have the middleware logic inside the auth.ts file so we are moving that logic to the middleware only.

// export default NextAuth(nextAuthConfig).auth;



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const token=request.cookies.get('token') 
  const token=await auth()
  // const pathname=request.nextUrl.pathname
  const isPublicPath=['/login', '/', '/signup']
  if(isPublicPath.includes(request.nextUrl.pathname) && token?.user){
    return NextResponse.redirect(new URL('/home',request.url))
  }
  else if(!isPublicPath.includes(request.nextUrl.pathname) && !token?.user){
    return NextResponse.redirect(new URL('/',request.url))
  }
  // else if(isPublicPath && !token){
  //   return NextResponse.redirect(new URL(request.nextUrl.pathname,request.url))
  // }
  // return NextResponse.redirect(new URL('/', request.url))
}
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/',
//     '/login',
//     '/signup',
//     '/home',
//     '/forgot-password',
//     '/login-with-providers',
//     '/create-category',
//     '/create-expense',
//     '/profile',
//     '/about',
// ]
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\.svg$).*)/'
  ],
}
