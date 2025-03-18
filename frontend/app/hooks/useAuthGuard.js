
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tokenExpiry = (token) => {
    if(!token) return true;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log(payload);
        const expiry = payload.exp * 1000;
        console.log(expiry);
        return Date.now() >= expiry;
    } catch(err) {
        console.error("Invalid token! ", err);
        return true;
    }
}

export default function useAuthGuard() {
    const router = useRouter();
    const path = usePathname();
    const [access, setAccess] = useState(false);

    useEffect(() => {
        if(typeof window === "undefined") return;

        const token = localStorage.getItem("access_token");

        const expired = tokenExpiry(token);

        console.log(expired);
        
        if(expired || token == null) setAccess(false);
        if (!expired && (path === "/login" || path === "/signup")) {
            // router.replace("/home");
            router.back();
        }
        console.log(token);
    }, [path, router]);
    return access;
}