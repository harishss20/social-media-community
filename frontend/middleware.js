import {NextResponse} from 'next/server'

const middleware = (req) => {
    console.log(req.headers.get("authorization"))
    const token = req.headers.get("authorization");
    
    if(token && ['/login', '/register'].includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
    
}


export default middleware;

export const config = {
    matcher: ["/login", "/signup"],
}