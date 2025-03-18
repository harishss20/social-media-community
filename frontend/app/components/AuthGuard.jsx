import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const authCheck = async () => {

            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                router.push("/login");
            }
            else {
                const response = fetch("http://localhost:8000/api/token/", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (response.status === 401) {
                    console.log("Token expired, trying to refresh...");
                    await refreshAccessToken();
                }
            }
            setLoading(false);
        }

        authCheck();
    }, []);

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await fetch("http://localhost:8000/api/token/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.status === 401) {
            console.log("Refresh token expired, logging out...");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
            router.push("/login");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access);
    }

    if (loading) return <p>Loading...</p>;
    return <>{props.children}</>;
}