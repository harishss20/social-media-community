"use client";

import { useState } from "react";

export default function JoinCommunity() {
  const data = [
    {
      id: "335de969-d992-4fb0-8c79-99b3e0c6d929",
      owner: "hari",
      name: "MoviesWorld",
      description: "movie time",
      community_based_on: "anime",
      communityImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png",
    },
    {
      id: "335de969-d992-4b0-8c79-99b3e0c6929",
      owner: "hello",
      name: "AnimeWorld",
      description: "hello guys....",
      community_based_on: "anime",
      communityImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png",
    },
    {
      id: "335de969-d992-4fb0-8c79-99b3ec6d929",
      owner: "test",
      name: "FunnyClips",
      description: "hello",
      community_based_on: "Fun",
      communityImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png",
    },
  ];

  const [communityName, setCommunityName] = useState([]);

  const handleFromChild = (data) => {
    if (communityName.includes(data)) {
      let removedArray = communityName.filter((item) => item !== data);
      setCommunityName(removedArray);
    } else {
      setCommunityName([...communityName, data]);
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center h-screen bg-[#1E1F26]">
      <div className="w-[90%] max-w-lg bg-[#343538] p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-xl font-semibold">Join Community</h1>
          <button className="py-2 px-4 rounded-md transition duration-300 text-[#CAC8FF]">
            {communityName.length !== 0 ? "Continue" : "Skip"}
          </button>
        </div>

        <div className="mt-12 space-y-6">
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

function CommunityCard({ communities, handleFromChild }) {
  const [join, setJoin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleJoinButton = (data) => {
    setJoin(!join);
    handleFromChild(data);
  };

  return (
    <div
      className={`flex items-center justify-between bg-[#2b2c2e] px-4 py-3 rounded-lg transition duration-300 
      ${
        join
          ? "shadow-[0px_10px_20px_5px_#151515] scale-105" 
          : isHovered
          ? "shadow-lg scale-105" 
          : "shadow-md scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4">
        <img
          src={communities.communityImage_url}
          alt="Community"
          className="h-16 rounded-full"
        />
        <p className="text-white text-lg truncate">{communities.name}</p>
      </div>
      <button
        className={`px-4 py-2 rounded-md transition duration-300 
        ${
          join
            ? "bg-[#2dd4bf] text-white hover:bg-[#14b8a6]"  
            : "bg-[#ff8a7a] text-white hover:bg-[#ff6f61]"  
        }`}
        onClick={() => handleJoinButton(communities.name)}
      >
        {join ? "Leave" : "Join"}
      </button>
    </div>
  );
}
