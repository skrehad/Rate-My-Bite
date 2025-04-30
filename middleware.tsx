import { getCurrentUser } from "@/services/auth";
import { IUser } from "@/types";
import { NextRequest, NextResponse } from "next/server";
type TRole = keyof typeof roleBasedPrivateRoute;
const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoute = {
    customer: [/^\/customer/, /^\/create-shop/],
    provider: [/^\/provider/, /^\/find-meals/],
};
export const middleware = async (request: NextRequest) => {
    const userInfo = await getCurrentUser() as IUser;
    const pathname = request.nextUrl.pathname;
    console.log({ pathname, userInfo });
    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url)
            );
        }
    }
    if (userInfo?.role && roleBasedPrivateRoute[userInfo?.role as TRole]) {
        const routes = roleBasedPrivateRoute[userInfo?.role as TRole];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
};

export const config = {
    matcher: [
        "/login",
        "/register",
        "/find-meals",
        "/customer",
        "/customer/:page",
        "/provider",
        "/provider/:page",
    ],
};
