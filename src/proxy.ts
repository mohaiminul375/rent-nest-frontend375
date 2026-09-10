import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { JwtPayload } from 'jsonwebtoken'
import { jwtUtils } from './utils/jwt'
import { cookies } from 'next/headers'
import { getNewAccessToken } from './service/refreshToken'

// Routes
const AUTH_ROUTE = ["/login", "/register"]
const PUBLIC_ROUTE = ["/", "/properties"]

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))
    const pathName = request.nextUrl.pathname;
    const cookieStore = await cookies();

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_ACCESS_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        //access token has expired but refresh token is valid, get new access token from backend
        const result = await getNewAccessToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
    }

    let userRole = null;

    if (!decodedAccessToken?.success) {
        //token has expired or is invalid, clear the cookies
        cookieStore.delete("accessToken");
    }


    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    if (accessToken && AUTH_ROUTE.includes(pathName)) {
        if (userRole === "TENANT") {
            return NextResponse.redirect(new URL('/tenant-dashboard', request.url))
        }
        else if (userRole === "LANDLORD") {
            return NextResponse.redirect(new URL('/landlord-dashboard', request.url))
        }
        else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
        else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    const isPublicRoute = PUBLIC_ROUTE.some((route) => pathName === route || pathName.startsWith(route + "/"));
    const isAuthRoute = AUTH_ROUTE.some((route) => pathName === route || pathName.startsWith(route + "/"));

    // authentication page protecet
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Authorized Routes: Role base access control
    if (pathName.startsWith('/tenant-dashboard') && userRole !== "TENANT") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    } else if (pathName.startsWith('/landlord-dashboard') && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    } else if (pathName.startsWith('/admin-dashboard') && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }












    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}