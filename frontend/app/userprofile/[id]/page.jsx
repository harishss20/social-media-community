"use client";

import { useEffect, useRef, useState } from "react";
import useUserData from "../../hooks/useUserData";
import { Commet } from "react-loading-indicators";

export default function UserProfilePage() {
  const { userData, error } = useUserData();


  const [bannerOpen, setBannerOpen] = useState(false);
  const [picOpen, setPicOpen] = useState(false);
  const [isProfileZoomed, setIsProfileZoomed] = useState(false);
  const [isBannerZoomed, setIsBannerZoomed] = useState(false);

  useEffect(() => {
  }, [userData.bio, userData.bannerImage_url, userData.profileImage_url]);



  if (!userData.bannerImage_url || !userData.profileImage_url)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Commet size="small" color="#cac8ff" />
      </div>
    );
  if (error) return null;
  return (
    <div className="pt-4 flex justify-center min-h-full pb-0 rounded-lg overflow-hidden">


      <div
        className="w-[800px] pb-10 flex flex-col items-center space-y-28 bg-[#30313b] overflow-hidden rounded-xl relative">

        <div
          onClick={() => setBannerOpen(true)}
          className="h-40 w-full bg-white overflow-hidden cursor-pointer"
        >
          <img
            src={userData?.bannerImage_url || "defaultBanner.png"}
            alt="Banner Ji"
            className={`min-w-full h-full object-cover duration-500 ease-in-out ${bannerOpen ? "brightness-50" : "hover:brightness-50"}`}
          />
        </div>

        <div
          onClick={() => setPicOpen(true)}
          className="w-32 h-32 rounded-full border-4 bg-black border-gray-800 absolute left-10 top-3 overflow-hidden cursor-pointer"
        >
          <img
            src={userData?.profileImage_url || "defaultProfile.png"}
            alt="profile-pic"
            className={`w-full h-full object-cover duration-500 ease-in-out ${picOpen ? "brightness-50" : "hover:brightness-50"}`}
          />
        </div>

        <div className="w-full pl-14 pr-14 flex flex-col justify-start">
          <div className="h-14 flex justify-between items-center">
            <h1 className="text-3xl text-accent">
              <b>{userData.name}</b>
            </h1>
          </div>
          <hr className="border-secondary border-[1px]" />

          <div className="pt-5 pl-10 pr-10 flex flex-col space-y-10">
            <section className="">
              <div className="flex flex-row items-center space-x-3">
                <h1 className="text-xl text-secondary ">Bio</h1>
              </div>

              <p className="text-lg px-4 text-white">{userData?.bio}</p>

            </section>
            <div className="flex flex-row justify-between">
              <section className="">
                <h1 className="text-xl text-secondary">Communities joined</h1>
                <p className="text-lg px-4 text-white">
                  {userData?.community_joined}
                </p>
              </section>

              <section className="">
                <h1 className="text-xl text-secondary">Communities created</h1>
                <p className="text-lg px-4 text-white">
                  {userData?.community_created}
                </p>
              </section>
            </div>
            <section className="">
              <h1 className="text-xl text-secondary">Member since</h1>
              <p className="text-lg px-4 text-white">{userData?.date_joined}</p>
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
            className="w-[200px] h-[60px] rounded-md absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-3 p-2 bg-slate-700"
          >
            <p
              className="cursor-pointer"
              onClick={() => setIsBannerZoomed(!isBannerZoomed)}
            >
              View Banner
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
            className="w-[200px] h-[60px] rounded-md absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-3 p-2 bg-slate-700"
          >
            <p
              onClick={() => setIsProfileZoomed(!isProfileZoomed)}
              className="cursor-pointer"
            >
              View Profile
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
            src={userData?.profileImage_url || "defaultProfile.png"}
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
            src={userData?.bannerImage_url || "defaultBanner.png"}
            alt="zoomed-profile-pic"
            className="max-w-[90%] max-h-[90%] object-contain cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
