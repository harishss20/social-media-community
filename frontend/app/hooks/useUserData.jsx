import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const dummyData = {
    id: 1,
    community_created: 2,
    username: "Fredwin",
    bio: "Hey There folks!",
    bannerImage_url: "../defaultBanner.png",
    profileImage_url: "../defaultProfile.png",
    date_joined: "12 December 2012"
}
export default function useUserData(id) {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        console.log(localStorage.getItem("UserId"));
        if (!id) {
            setError("Invalid user ID!");
            router.replace("/not-found");
            return;
        }

        const fetchUser = async () => {
            try {
                //GET method for profile page
                const res = await fetch(`http://localhost:8000/api/profile/?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            const { profile } = await res.json();
            console.log(profile);

                if (profile.error) {
                    setError("User not found");
                    router.replace("/not-found");
                } else {
                    setUserData(profile);
                }

            } catch (err) {
                setError("Server error. Please try again.");
                router.replace("/not-found");
            }
        };

        fetchUser();
    }, [id, router]);

    return { userData, error };
};
