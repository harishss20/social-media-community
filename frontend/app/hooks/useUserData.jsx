import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const dummyData = {
  id: 1,
  community_created: 2,
  username: "Fredwin",
  bio: "Hey There folks!",
  bannerImage_url: "../defaultBanner.png",
  profileImage_url: "../defaultProfile.png",
  date_joined: "12 December 2012",
};
export default function useUserData(id) {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log(id);
    if (!id) {
      setError("Invalid user ID!");
      router.replace("/not-found");
      return;
    }

    const fetchUser = async () => {
      try {
        if (id == dummyData.id) setUserData(dummyData);
        else {
          //GET method for profile page
          const res = await fetch(
            `http://localhost:8000/api/profile/?id=${id}`
          );
          const { data } = await res.json();

          if (data.error) {
            setError("User not found");
            router.replace("/not-found");
          } else {
            setUserData(data);
          }
        }
      } catch (err) {
        setError("Server error. Please try again.");
        router.replace("/not-found");
      }
    };

    fetchUser();
  }, [id, router]);

  return { userData, error };
}
