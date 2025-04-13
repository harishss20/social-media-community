import { useEffect, useState } from "react";

export const useAllPosts = (communities, refresh) => {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    if (!communities) return;

    const fetchCommunities = async () => {
      const result = await Promise.all(
        communities?.map(async (community) => {
          const res = await fetch(
            `http://localhost:8000/api/posts/?community=${community.name}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          return res.json();
        })
      );
      setAllPosts(result.flat());
    };

    fetchCommunities();
  }, [communities, refresh]);

  return { allPosts };
};
