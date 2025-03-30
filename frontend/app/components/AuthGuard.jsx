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
          <Commet size="small" color="#cac8ff"/>
        </div>
    );

    return <div>
        <Navbar />
        {children}
    </div>
}