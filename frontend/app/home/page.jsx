'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    function handleLogout() {
        localStorage.clear();
        router.replace("/login");
    }
    
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        console.log(token)
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => router.push("/profile")}>profile</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
