"use client";

import { useEffect, useRef, useState } from "react";
import useUserData from "../hooks/useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Commet } from "react-loading-indicators";

export default function ProfilePage() {
  // const [id, setId] = useState();
  const { userData, error } = useUserData();

  const [bio, setBio] = useState(userData.bio);
  const [tempBio, setTempBio] = useState("");
  const [bannerImage_url, setBannerImage_url] = useState(userData.bannerImage_url);
  const [profileImage_url, setProfileImage_url] = useState(userData.profileImage_url);

  const [bannerOpen, setBannerOpen] = useState(false);
  const [picOpen, setPicOpen] = useState(false);
  const [editbio, setEditbio] = useState(false);
  const [isProfileZoomed, setIsProfileZoomed] = useState(false);
  const [isBannerZoomed, setIsBannerZoomed] = useState(false);

  const bannerFile = useRef(null);
  const profileFile = useRef(null);

  useEffect(() => {
    if (userData.bio) setBio(userData.bio);
    if (userData.bannerImage_url) setBannerImage_url(userData.bannerImage_url);
    if (userData.profileImage_url) setProfileImage_url(userData.profileImage_url);
  }, [userData.bio, userData.bannerImage_url, userData.profileImage_url]);

  const updateBannerImage = async (imageUrl) => {
    console.log(userData.id, imageUrl);
    try {
      const response = await fetch(`http://localhost:8000/api/profile/?id=${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ bannerImage_url: imageUrl }),
      });

      if (response.ok) {
        alert("Banner updated!");
        setBannerOpen(false);
        setBannerImage_url(imageUrl);
      } else {
        alert("Failed to update banner.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  };

  const updateProfileImage = async (imageUrl) => {
    console.log(userData.id, imageUrl);
    try {
      const response = await fetch(`http://localhost:8000/api/profile/?id=${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ profileImage_url: imageUrl }),
      });

      if (response.ok) {
        alert("Profile picture updated!");
        setPicOpen(false);
        setProfileImage_url(imageUrl);
      } else {
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  };

  const updateBio = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/profile/?id=${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ bio: tempBio }),
      });

      if (response.ok) {
        alert("Bio updated!");
        setEditbio(false);
        setBio(tempBio);
        setEditbio(false);
      } else {
        alert("Failed to update bio.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  };


  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Profile_img");
    formData.append("cloud_name", "dttdxreiq");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dttdxreiq/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const bannerHandle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl) {
      // setBannerImage_url(imageUrl);
      updateBannerImage(imageUrl);
    }
  };

  const profileHandle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    console.log(imageUrl);
    if (imageUrl) {
      // setProfileImage_url(imageUrl);
      updateProfileImage(imageUrl);
    }
  };

  if (!bannerImage_url || !profileImage_url) return (
    <div className="flex justify-center items-center h-[80vh]">
      <Commet size="small" color="#cac8ff"/>
    </div>
  );
  if (error) return null;
  return (
    <div className="flex justify-center min-h-full pb-10 rounded-lg">


      <div
        className="w-[800px] pb-10 flex flex-col items-center space-y-28 bg-[#30313b] rounded-xl relative">

        <div
          onClick={() => setBannerOpen(true)}
          className="h-40 w-full bg-white overflow-hidden cursor-pointer"
        >
          <img
            src={bannerImage_url || "defaultBanner.png"}
            alt="Banner Ji"
            className={`min-w-full h-full object-cover duration-500 ease-in-out ${bannerOpen ? "brightness-50" : "hover:brightness-50"}`}
          />
        </div>

        <div
          onClick={() => setPicOpen(true)}
          className="w-32 h-32 rounded-full border-4 bg-black border-gray-800 absolute left-10 top-3 overflow-hidden cursor-pointer"
        >
          <img
            src={profileImage_url || "defaultProfile.png"}
            alt="profile-pic"
            className={`w-full h-full object-cover duration-500 ease-in-out ${picOpen ? "brightness-50" : "hover:brightness-50"}`}
          />
        </div>

        <div className="w-full pl-14 pr-14 flex flex-col justify-start">
          <div className="h-14 flex justify-between items-center">
            <h1 className="text-3xl text-accent"><b>{userData.name}</b></h1>
          </div>
          <hr className="border-secondary border-[1px]" />

          <div className="pt-5 pl-10 pr-10 flex flex-col space-y-10">
            <section className="">
              <div className="flex flex-row items-center space-x-3">
                <h1 className="text-xl text-secondary ">Bio</h1>
                {!editbio && <FontAwesomeIcon icon={faEdit} onClick={() => setEditbio(true)} className="cursor-pointer text-secondary" />}
              </div>
              {editbio ?
                <div className="w-full h-36 ">
                  <textarea maxLength={400} onChange={(e) => setTempBio(e.target.value)} className="w-full p-2 text-sm h-[80%] resize-none bg-transparent border-2 border-[#CAC8FF] rounded-sm outline-none text-white placeholder-white ">
                  </textarea>
                  <div className="w-full flex flex-row items-center justify-end space-x-5">
                    <button className="text-white px-4 py-2 rounded-2xl font-bold hover:bg-accent transition duration-300 mt-2"
                      onClick={() => {
                        setBio(userData.bio);
                        setEditbio(false);
                      }}
                    >Cancel
                    </button>
                    <button className="text-white px-4 py-2 rounded-2xl font-bold hover:bg-[#1E1F26] transition duration-300 mt-2" type="submit" onClick={updateBio}>Save</button>

                  </div>
                </div>
                :
                <p className="text-lg px-4 text-white">{bio}</p>
              }
            </section>
            <div className="flex flex-row justify-between">

              <section className="">
                <h1 className="text-xl text-secondary">Communities joined</h1>
                <p className="text-lg px-4 text-white">{userData.community_joined}</p>
              </section>

              <section className="">
                <h1 className="text-xl text-secondary">Communities created</h1>
                <p className="text-lg px-4 text-white">{userData.community_created}</p>
              </section>
            </div>
            <section className="">
              <h1 className="text-xl text-secondary">Member since</h1>
              <p className="text-lg px-4 text-white">{userData.date_joined}</p>
            </section>
          </div>
        </div>
      </div>

      {bannerOpen && (
        <div
          onClick={() => setBannerOpen(false)}
          className="fixed transition-all duration-500 ease-in-out hover:bg-black hover:bg-opacity-50 inset-0 z-10 flex flex-col items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[200px] h-[100px] rounded-md absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-3 p-2 bg-slate-700"
          >
            <p
              className="cursor-pointer"
              onClick={() => setIsBannerZoomed(!isBannerZoomed)}
            >
              View Banner
            </p>
            <hr className="w-full" />
            <input
              type="file"
              accept="image/*"
              ref={bannerFile}
              className="hidden"
              onChange={bannerHandle}
            ></input>
            <p
              className="cursor-pointer"
              onClick={() => bannerFile.current.click()}
            >
              Change Banner
            </p>
          </div>
        </div>
      )}

      {picOpen && (
        <div
          onClick={() => setPicOpen(false)}
          className="fixed transition-all duration-500 ease-in-out hover:bg-black hover:bg-opacity-50 inset-0 z-10 flex flex-col"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[200px] h-[100px] rounded-md absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-3 p-2 bg-slate-700"
          >
            <p
              onClick={() => setIsProfileZoomed(!isProfileZoomed)}
              className="cursor-pointer"
            >
              View Profile
            </p>
            <hr className="w-full" />
            <input
              type="file"
              accept="image/*"
              ref={profileFile}
              className="hidden"
              onChange={profileHandle}
            ></input>
            <p
              className="cursor-pointer"
              onClick={() => profileFile.current.click()}
            >
              Change Profile
            </p>
          </div>
        </div>
      )}
      {isProfileZoomed && (
        <div
          onClick={() => setIsProfileZoomed(!isProfileZoomed)}
          className="fixed inset-0 z-20 bg-black bg-opacity-80 flex items-center justify-center"
        >
          <img
            src={profileImage_url || "defaultProfile.png"}
            alt="zoomed-profile-pic"
            className="max-w-[90%] max-h-[90%] object-contain cursor-pointer"
          />
        </div>
      )}
      {isBannerZoomed && (
        <div
          onClick={() => setIsBannerZoomed(!isBannerZoomed)}
          className="fixed inset-0 z-20 bg-black bg-opacity-80 flex items-center justify-center"
        >
          <img
            src={bannerImage_url || "defaultBanner.png"}
            alt="zoomed-profile-pic"
            className="max-w-[90%] max-h-[90%] object-contain cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}