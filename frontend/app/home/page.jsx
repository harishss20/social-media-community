'use client';

import { useEffect } from "react";
import AuthGuard from "../components/AuthGuard";
import { useRouter } from "next/navigation";

export default function Home() {
    function handleLogout() {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        window.location.reload();
    }
    
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        console.log(token)
    })
    return (
        <AuthGuard>
            <h1>Home</h1>
            <button onClick={() => useRouter().push("/profile")}>profile</button>
            <button onClick={handleLogout}>Logout</button>
        </AuthGuard>
    );
}
