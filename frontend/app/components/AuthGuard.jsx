"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Commet } from "react-loading-indicators";
import Navbar from "./Navbar";

const tokenExpiry = (token) => {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiry = payload.exp * 1000;
        return Date.now() >= expiry;
    } catch (err) {
        console.error("Invalid token! ", err);
        return true;
    }
}

export default function AuthGuard({ children }) {
    const router = useRouter();
    const path = usePathname();
    const [access, setAccess] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("access_token");

        const expired = tokenExpiry(token);

        console.log(expired);

        if (expired) {
            setAccess(false);
            if (path !== "/login" && path !== "/signup") router.replace("/login");
        }
        else {
            setAccess(true);
            if (path === "/login" || path === "/signup") router.replace("/home");
        }
    }, [path, router]);

    if (access == null || (!access && path !== "/login" && path !== "/signup")) return (
        <div className="flex justify-center items-center h-[80vh]">
            <Commet size="small" color="#cac8ff" />
        </div>
    );

    return (
        <div className=""><div className="hidden lg:block">
            {access && <Navbar />}
            {children}
        </div>
            <div className="lg:hidden relative h-screen w-full flex flex-row items-center justify-center text-white p-4 text-center backdrop-blur-sm backdrop-opacity-80">
                <div className="absolute top-50%  bg-primary/20  h-[161px] max-w-[353px] text-white p-4 rounded-md shadow-lg drop-shadow-xl shadow-black  text-center backdrop-blur-lg backdrop-opacity-90">
                <p className="flex items-center justify-center">⚠️ <strong className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500  to-purple-800 text-4xl font-bold">WARNING</strong></p>
                    <p className="mt-2 text-purple-200">We don't support mobile view yet. Please use a larger screen.</p>
                </div>
            </div>
        </div>
    )
}