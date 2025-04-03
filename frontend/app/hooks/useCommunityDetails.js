import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useCommunityDetails = (community_name, refresh) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [community_data, setCommunity_data] = useState(null);
    const [community_posts, setCommunity_posts] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            console.log(community_name);
            if(!community_name) return;

            try {
                const res1 = await fetch(`http://localhost:8000/api/community/?name=${community_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                const data = await res1.json();
                if (!res1.ok) {
                    if(data?.message == "Community does not exist") {
                        router.push("/not-found-2");
                    }
                }
                setCommunity_data(data?.data);
                
                const res2 = await fetch(`http://localhost:8000/api/posts/?community=${community_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                const data2 = await res2.json();
                if (!res2.ok) {
                    throw new Error("Problem with fetching!");
                }
                setCommunity_posts(data2);
                console.log(data2);
            }
            catch (err) {
                console.log(err);
                setError(true);
            }
            finally {
                setLoading(false);
            }
            
        }
        fetchData();
    }, [community_name, refresh])

    return {loading, error, community_data, community_posts};
}

export default useCommunityDetails;