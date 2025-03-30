"use client";

import { useEffect, useState } from "react";

import { getRandomCommunity } from "../api/joinCommunityAPI";
import { Commet } from "react-loading-indicators";

export default function JoinCommunity() {
  const [loading, setLoading] = useState(true);
  const [media_file, setMedia_file] = useState(null);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [bannerImage_url, setBannerImage_url] = useState(null);
  const [profileImage_url, setProfileImage_url] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreatePostClick = () => setShowPostPopup(true);

  const handleClosePopup = () => {
    setShowPostPopup(false);
    setSelectedImage(null);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Profile_img");
    formData.append("cloud_name", "dttdxreiq");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dttdxreiq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };
  useEffect(() => {
    console.log(community_data);
    setPosts(community_posts);
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePopup();
      }
    };

    if (showPostPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPostPopup]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Commet size="small" color="#cac8ff" />
      </div>
    );
  return (
    <div className="flex flex-grow justify-center items-center h-screen bg-[#1a1a1a]">
      <div className="w-[100%] h-[90%] max-w-3xl bg-[#343538] p-6 rounded-xl shadow-md">
        <div className="flex flex-col justify-between items-center space-y-9 mb-4">
          <h1 className="text-white text-xl font-semibold">Create Community</h1>
          <input
            type="input"
            className="text-black pl-2 p-1 rounded-sm w-64"
            placeholder="Community Name"
          />
        </div>
      </div>
    </div>
  );
}
