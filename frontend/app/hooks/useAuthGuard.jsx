
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthGuard() {
    const router = useRouter();
    const path = usePathname();
    let access = false;
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token && (path === "/login")) {
            router.push("/home");
        }
        else access = true;
        console.log(token);
    }, [path, router]);
    return access;
}