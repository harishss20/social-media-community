
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuthGuard() {
    const router = useRouter();
    const path = usePathname();
    const [access, setAccess] = useState(true);

    useEffect(() => {
        if(typeof window === "undefined") return;
        const token = localStorage.getItem("access_token");
        if(!token || token == null) setAccess(false);
        if (token && (path === "/login" || path === "/signup")) {
            // router.replace("/home");
            router.back();
        }
        console.log(token);
    }, [path, router]);
    return access;
}