'use client';

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useUserData from "../../hooks/useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


export default function ProfilePage() {
    const { id } = useParams();
    const { userData, error } = useUserData(id);

    const [bio, setBio] = useState(userData.bio);
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
        setBio(userData.bio);
        setBannerImage_url(userData.bannerImage_url);
        setProfileImage_url(userData.profileImage_url);
    }, [userData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setBannerOpen(false);
            setPicOpen(false);

            //PATCH method for editing profile page
            const response = await fetch(`http://localhost:8000/api/profile?id=${userData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bannerImage_url, profileImage_url, bio }),
            });

            if (response.ok) {
                alert("Profile edited!");
                setEditOpen(false);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Please try again.");
        }

    };

    const bannerHandle = (e) => {
        userData.bannerImage_url = e.target.files[0];
        handleSubmit(e);
    }

    const profileHandle = (e) => {
        e.preventDefault();
        userData.profileImage_url = e.target.files[0];
        handleSubmit(e);
    }

    if (error) return null;
    if (!userData.bannerImage_url || !userData.profileImage_url) return <p>Loading...</p>
    return (
        <div className="flex justify-center min-h-full pb-10 rounded-lg">


            <div
                className="w-[800px] pb-10 flex flex-col items-center space-y-28 bg-gray-500 rounded-xl relative">

                <div
                    onClick={() => setBannerOpen(true)}
                    className="max-h-40 w-full bg-white overflow-hidden cursor-pointer"
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
                        <h1 className="text-2xl">{userData.username}</h1>
                    </div>
                    <hr />

                    <div className="pt-5 pl-10 pr-10 flex flex-col space-y-10">
                        <section className="">
                            <div className="flex flex-row items-center space-x-3">
                                <h1 className="text-lg">Bio</h1>
                                {!editbio && <FontAwesomeIcon icon={faEdit} onClick={() => setEditbio(true)} className="cursor-pointer" />}
                            </div>
                            {editbio ?
                                <div className="w-full h-36 ">
                                    <textarea maxLength={400} className="w-full p-2 text-sm h-[80%] resize-none bg-transparent border-2 border-white rounded-sm outline-none">
                                    </textarea>
                                    <div className="w-full flex flex-row items-center justify-end space-x-5">
                                        <button
                                            onClick={() => {
                                                setBio(userData.bio);
                                                setEditbio(false);
                                            }}
                                        >Cancel
                                        </button>
                                        <button type="submit" onClick={handleSubmit}>Save</button>

                                    </div>
                                </div>
                                :
                                <p className="text-xs px-4">{userData.bio}</p>
                            }
                        </section>
                        <div className="flex flex-row justify-between">

                            <section className="">
                                <h1 className="text-lg">Member since</h1>
                                <p className="text-xs px-4">{userData.date_joined}</p>
                            </section>

                            <section className="">
                                <h1 className="text-lg">Communities created</h1>
                                <p className="text-xs px-4">{userData.community_created}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            {bannerOpen &&
                <div
                    onClick={() => setBannerOpen(false)}
                    className="fixed transition-all duration-500 ease-in-out hover:bg-black hover:bg-opacity-50 inset-0 z-10 flex flex-col items-center justify-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-[200px] h-[100px] rounded-md absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-3 p-2 bg-slate-700"
                    >
                        <p className="cursor-pointer" onClick={() => setIsBannerZoomed(!isBannerZoomed)}>View Banner</p>
                        <hr className="w-full" />
                        <input type="file" accept="image/*" ref={bannerFile} className="hidden" onChange={bannerHandle}></input>
                        <p className="cursor-pointer" onClick={() => bannerFile.current.click()}>Change Banner</p>
                    </div>
                </div>
            }

            {picOpen &&
                <div
                    onClick={() => setPicOpen(false)}
                    className="fixed transition-all duration-500 ease-in-out hover:bg-black hover:bg-opacity-50 inset-0 z-10 flex flex-col"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-[200px] h-[100px] rounded-md absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-3 p-2 bg-slate-700"
                    >
                        <p onClick={() => setIsProfileZoomed(!isProfileZoomed)} className="cursor-pointer">View Profile</p>
                        <hr className="w-full" />
                        <input type="file" accept="image/*" ref={profileFile} className="hidden" onChange={profileHandle}></input>
                        <p className="cursor-pointer" onClick={() => profileFile.current.click()}>Change Profile</p>
                    </div>
                </div>
            }
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