import { useEffect, useState } from "react";

export const useJoinedCommunities = () => {

    const [communities, setCommunities] = useState([]);
    const [error2, setError2] = useState(null);
    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const [joined, created] = await Promise.all([
                    fetch(`http://localhost:8000/api/user-joined-community/?id=${localStorage.getItem("UserId")}`, {
                        method: "GET",
                        headers: {"Authorization": `Bearer ${localStorage.getItem("access_token")}`}
                    }),
                    fetch(`http://localhost:8000/api/user-created-community/?id=${localStorage.getItem("UserId")}`, {
                        method: "GET",
                        headers: {"Authorization": `Bearer ${localStorage.getItem("access_token")}`}
                    })

                ])
                const {joined_community} = await joined.json();
                const {data: created_community} = await created.json();
                console.log(created_community);
                let uniqueCommunities = []
                if(!created_community && !joined_community) uniqueCommunities = [];
                else if(!created_community) uniqueCommunities = [
                    ...new Map([...joined_community].map((c) => [c.id, c])).values()
                ];
                else if(!joined_community) uniqueCommunities = [
                    ...new Map([...created_community].map((c) => [c.id, c])).values()
                ];
                else uniqueCommunities = [
                    ...new Map([...created_community, ...joined_community].map((c) => [c.id, c])).values()
                ];
                
                setCommunities(uniqueCommunities);
                
            }
            catch(err) {
                console.log(err);
                setError2(err);
            }
        }

        fetchCommunities();
    }, [])
    console.log(communities);
    return {communities, error2};
}