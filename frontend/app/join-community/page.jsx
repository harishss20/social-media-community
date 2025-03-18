"use client";

import { useEffect, useState } from "react";
import CommunityCard from "./CommunityCard";
import { getRandomCommunity, joinMultipleCommunities } from "../api/joinCommunityAPI";
import { Commet } from "react-loading-indicators";
import { useRouter } from "next/navigation";

export default function JoinCommunity() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await getRandomCommunity();
        setData(res);
      }
      finally {
        setLoading(false);
      }
    }
    fetchCommunity();
  }, []);

  const [communityName, setCommunityName] = useState([]);
  const handleFromChild = (data) => {
    if (communityName.includes(data)) {
      let removedArray = communityName.filter((item) => item !== data);
      setCommunityName(removedArray);
    } else {
      setCommunityName([...communityName, data]);
    }
  };

  const handleSubmit = () => {
    if(communityName.length != 0) joinMultipleCommunities(communityName);
    router.push("/home");
  }

  if (loading) return (
    <div className="flex justify-center items-center h-[80vh]">
      <Commet size="small" color="#cac8ff"/>
    </div>
  );
  return (
    <div className="flex flex-grow justify-center items-center h-screen bg-[#1a1a1a]">
      <div className="w-[90%] max-w-lg bg-[#343538] p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-xl font-semibold">Join Community</h1>
          <button onClick={handleSubmit} className="py-2 px-4 duration-300">
            {communityName.length != 0 ? "continue" : "skip"}
          </button>
        </div>

        <div className=" mt-12 space-y-6">
          {data.map((communities) => (
            <CommunityCard
              key={communities.id}
              communities={communities}
              handleFromChild={handleFromChild}
              communityName={communityName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
