import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function useUserData() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const router = useRouter();
  let {id} = useParams();
  console.log(id);
  id = id ? id : localStorage.getItem("UserId");

    useEffect(() => {
        console.log(id);
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
  }, [router]);

  return { userData, error };
}
