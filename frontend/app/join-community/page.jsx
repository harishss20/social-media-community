"use client";

import { useState } from "react";
export default function JoinCommunity() {
  const data = [
    {
      id: "335de969-d992-4fb0-8c79-99b3e0c6d929",
      owner: "hari",
      owner_id: "d2fa922b-4c36-4040-8d93-d15949d5bc16",
      members: ["kumar"],
      name: "MoviesWorld",
      description: "movie time",
      community_based_on: "anime",
      rules: "anime..",
      communityImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png",
      bannerImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740691299/vlcgkfx6ul17fvokugpv.png",
      created_at: "2025-02-27T09:20:15.499940Z",
    },
    {
      id: "335de969-d992-4b0-8c79-99b3e0c6929",
      owner: "hello",
      owner_id: "d2fa922b-4c36-4040-8d93-d15949d5bc16",
      members: ["kumar"],
      name: "AnimeWorld",
      description: "hello guys....",
      community_based_on: "anime",
      rules: "anime..",
      communityImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png",
      bannerImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740691299/vlcgkfx6ul17fvokugpv.png",
      created_at: "2025-02-27T09:20:15.499940Z",
    },
    {
      id: "335de969-d992-4fb0-8c79-99b3ec6d929",
      owner: "test",
      owner_id: "d2fa922b-4c36-4040-8d93-d15949d5bc16",
      members: ["kumar"],
      name: "FunnyClips",
      description: "hello",
      community_based_on: "Fun",
      rules: "anime..",
      communityImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png",
      bannerImage_url:
        "https://res.cloudinary.com/dttdxreiq/image/upload/v1740691299/vlcgkfx6ul17fvokugpv.png",
      created_at: "2025-02-27T09:20:15.499940Z",
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
    <div className="flex flex-grow justify-center items-center h-screen bg-[#1a1a1a]">
      <div className="w-[90%] max-w-lg bg-[#343538] p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-xl font-semibold">Join Community</h1>
          <button className="py-2 px-4 duration-300">
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

function CommunityCard({ communities, handleFromChild }) {
  const [join, setJoin] = useState(false);

  const handleJoinButton = (data) => {
    const status = !join;
    setJoin(status);
    if (status) {
      handleFromChild(data);
    } else {
      handleFromChild(data);
    }
  };

  return (
    <div className="flex items-center justify-between  bg-[#2b2c2e] px-4 py-3 rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={communities.communityImage_url}
          alt="Community"
          className="h-16 rounded-full"
        />
        <p className="text-white text-lg truncate">{communities.name}</p>
      </div>
      <button
        className="px-4 py-2 bg-black text-white rounded-lg duration-300"
        onClick={() => {
          handleJoinButton(communities.name);
        }}
      >
        {join ? "Joined" : "Join"}
      </button>
    </div>
  );
}
