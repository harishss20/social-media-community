"use client";
import { useState } from "react";

export default function CommunityCard({ communities, handleFromChild }) {
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
        {join ? "Leave" : "Join"}
      </button>
    </div>
  );
}
