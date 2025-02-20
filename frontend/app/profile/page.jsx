'use client';

import { useState } from "react";

export default function ProfilePage() {
    const savedUsername = "Fredwin";
    const savedBio = "Hey There Folks!";
    const [username, setUsername] = useState("Fredwin");
    const [bio, setBio] = useState("Hey There Folks!");
    const bannerPic = "";
    const profilePic = "";
    const [bannerOpen, setBannerOpen] = useState(false);
    const [picOpen, setPicOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const checkUsernameAvailability = async (username) => {
        if (username.length < 3) return;
        try {
            const response = await fetch(`/api/check-username?username=${username}`);
            const data = await response.json();
            setIsUsernameAvailable(data.available);
        } catch (error) {
            console.error("Error checking username:", error);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log(username, bio);
    }
    return (
        <div className="flex justify-center min-h-full mb-10 rounded-lg">


            <div
                className="w-[800px] pb-10 flex flex-col items-center space-y-28 bg-gray-500 rounded-xl relative">

                <div
                    onClick={() => setBannerOpen(true)}
                    className="max-h-40 w-full bg-white overflow-hidden cursor-pointer"
                >
                    <img
                        src={bannerPic || "isagi.jpg"}
                        alt="Banner Ji"
                        className={`min-w-full h-full object-cover duration-500 ease-in-out ${bannerOpen ? "brightness-50" : "hover:brightness-50"}`}
                    />
                </div>

                <div
                    onClick={() => setPicOpen(true)}
                    className="w-32 h-32 rounded-full border-4 border-gray-800 absolute left-10 top-3 overflow-hidden cursor-pointer"
                >
                    <img
                        src={profilePic || "rin.avif"}
                        alt="profile-pic"
                        className={`w-full h-full object-cover duration-500 ease-in-out ${picOpen ? "brightness-50" : "hover:brightness-50"}`}
                    />
                </div>

                <div className="w-full pl-14 pr-14 flex flex-col justify-start">
                    <div className="pl-5 pr-5 h-14 flex justify-between items-center">
                        <h1 className="text-2xl">{savedUsername}</h1>
                        <button className="w-20 h-10 rounded-3xl bg-black" onClick={() => setEditOpen(true)}>Edit</button>
                    </div>

                    <hr />

                    <div className="pt-5 flex flex-col space-y-4">

                        <section className="">
                            <h1 className="text-lg">Bio</h1>
                            <p className="text-sm px-4">{savedBio}</p>
                        </section>

                        <section className="">
                            <h1 className="text-lg">Member since</h1>
                            <p className="text-sm px-4">12 December 2012</p>
                        </section>

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
                        <p>View Banner</p>
                        <hr className="w-full" />
                        <p>Change Banner</p>
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
                        <p>View Profile</p>
                        <hr className="w-full" />
                        <p>Change Profile</p>
                    </div>
                </div>
            }

            {editOpen &&
                <div
                    onClick={() => setEditOpen(false)}
                    className="fixed transition-all duration-500 ease-in-out hover:bg-black hover:bg-opacity-50 inset-0 z-10 flex flex-col"
                >

                    <form
                        onSubmit={handleEditSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className="w-[400px] h-[400px] rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start justify-evenly space-y-3 p-5 bg-slate-700"
                    >

                        <p>Username</p>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-black"
                        ></input>

                        <p>Bio</p>
                        <textarea
                            maxLength={300} value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="resize-none w-full h-full bg-black"
                        ></textarea>

                        <div className="w-full flex flex-row items-center justify-end space-x-5">
                            <button onClick={() => setEditOpen(false)}>Cancel</button>
                            <button type="submit">Save</button>

                        </div>
                    </form>
                </div>
            }
        </div>
    );
}