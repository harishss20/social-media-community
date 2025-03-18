import { useEffect, useState } from "react";

const useCommunityDetails = (community_name) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [community_data, setCommunity_data] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(!community_name) return;

            try {
                const res = await fetch(`http://localhost:8000/api/community?name=${community_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error("Problem with fetching!");
                }
                setCommunity_data(data);
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
    }, [community_name])

    return {loading, error, community_data};
}

export default useCommunityDetails;