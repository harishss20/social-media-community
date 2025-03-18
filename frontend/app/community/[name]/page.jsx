"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faTimes,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import useCommunityDetails from "../../hooks/useCommunityDetails";
import { Commet } from "react-loading-indicators";

export default function CommunityPage() {
  const {name} = useParams();
  const {loading, error, community_data} = useCommunityDetails(name);
  
  // const community_data = {
  //   id: "1",
  //   owner: "hari",
  //   members: [
  //     "kumar",
  //     "cooper",
  //     "raj",
  //     "band",
  //     "hari",
  //     "sam",
  //     "tom",
  //     "jack",
  //     "mike",
  //     "leo",
  //   ],
  //   name: "animeworld",
  //   description: "animeworld",
  //   community_based_on: "naruto",
  //   rules:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis, ligula in consectetur interdum, ex nunc fermentum odio, eget pellentesque risus purus non nulla. Fusce vitae scelerisque nisl. Aenean euismod, odio at ultrices fermentum, sapien erat tempus dolor, nec cursus nisi justo id justo. Nulla facilisi. Vestibulum sollicitudin dapibus augue, at fringilla velit. Duis quis nisi erat. Mauris sed lacus non sapien venenatis vehicula non at metus.Suspendisse a elit et lectus hendrerit luctus. Nulla et dui vel odio aliquet interdum nec nec mi. Phasellus dapibus dolor ut nisl lacinia, nec feugiat mauris vehicula. Integer efficitur, erat ac dictum ullamcorper, purus tortor convallis nulla, nec sagittis risus augue eget nunc. Sed ut urna vel arcu tincidunt vestibulum id et dolor. Mauris at metus at sapien tristique luctus vel non nulla. Donec vitae ante tristique, malesuada metus a, tincidunt lacus.Curabitur id purus ut velit imperdiet vulputate. Ut egestas velit eget dui tempor, nec accumsan dolor sollicitudin. Vivamus ultricies sodales dolor, sit amet fermentum nisl faucibus a. Cras consectetur tincidunt lorem, ac dignissim purus interdum id. Pellentesque et mi sit amet ex molestie congue et vel ligula. Etiam vitae nulla nec magna gravida fermentum. Phasellus et magna ac velit venenatis tempor id non purus. Fusce interdum malesuada dolor, et molestie sem dignissim ac.Aliquam euismod, eros ac ultricies interdum, ligula eros facilisis metus, a fermentum erat augue eget risus. Praesent sit amet mi ac risus ullamcorper pellentesque. Ut consequat ligula a metus vulputate tincidunt.",
  //   communityImage_url: "/defaultProfile.png",
  //   bannerImage_url: "/defaultBanner.png",
  //   created_at: "2025-02-24",
  // };

  const posts = [
    {
      id: 1,
      title: "First Post",
      text_field: "This is the first post in the community!",
      media_file: "https://via.placeholder.com/100",
      created_by: "Krishketcum",
      profileImage_url: "https://picsum.photos/id/1",
      created_at: "2025-03-10",
      likes: 0,
      saved: 0,
      shared: 0,
    },
    {
      id: 2,
      title: "First Post",
      text_field: "This is the first post in the community!",
      media_file: "https://via.placeholder.com/100",
      created_by: "Krishketcum",
      profileImage_url: "https://picsum.photos/id/1",
      created_at: "2025-03-10",
      likes: 0,
      saved: 0,
      shared: 0,
    },
  ];

  const [showAllModerators, setShowAllModerators] = useState(false);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileView, setMobileView] = useState("posts");
  const [isJoined, setIsJoined] = useState(false);
  const [bannerImage_url, setBannerImage_url] = useState(userData.bannerImage_url);
  const [profileImage_url, setProfileImage_url] = useState(userData.profileImage_url);
  const [isProfileZoomed, setIsProfileZoomed] = useState(false);
  const [isBannerZoomed, setIsBannerZoomed] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [picOpen, setPicOpen] = useState(false);

  const bannerFile = useRef(null);
  const profileFile = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
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

  const handleCreatePostClick = () => setShowPostPopup(true);
  const handleClosePopup = () => {
    setShowPostPopup(false);
    setSelectedImage(null);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };
  const toggleJoin = () => setIsJoined(!isJoined);

  const bannerHandle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl) {
      setBannerImage_url(imageUrl);
      setBannerOpen(false);
    }
  };

  const profileHandle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl) {
      setProfileImage_url(imageUrl);
      setPicOpen(false);
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

  if(loading) return (
    <div className="flex justify-center items-center h-[80vh]">
      <Commet size="small" color="#cac8ff"/>
    </div>
);

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-3/4 mx-auto p-2 gap-4">
      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="bg-gray-700 overflow-hidden">
          {/* Banner */}
          <div className="relative w-full h-[100] bg-gray-300" onClick={() => setBannerOpen(true)}>
            <img src={bannerImage_url || "/defaultBanner.png"} alt="Banner" className="w-full h-full object-cover" />
          </div>

          {/* Profile Image and Name */}
          <div className="flex items-center p-4">
            <div
              className="w-16 h-16 rounded-full overflow-hidden bg-black border-4 border-gray-900"
              onClick={() => setPicOpen(true)}
            >
              <img src={profileImage_url || "/defaultProfile.png"} alt="Profile" className="w-full h-full object-cover" />
            <div className="w-16 h-16 rounded-full overflow-hidden bg-black border-4 border-gray-900">
              <img
                src={community_data.communityImage_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-white">{community_data.name}</h1>
              <p className="text-sm text-gray-400">r/{community_data.name}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-start p-2 bg-gray-700 gap-2">
            <button className="text-white bg-blue-600 px-4 py-2 rounded-md" onClick={handleCreatePostClick}>
              + Create Post
            </button>
            <button className={`text-white px-4 py-2 rounded-md`} onClick={toggleJoin}>
              {isJoined ? "Joined" : "Join"}
            </button>
          </div>
        </div>

        {/* Post and About */}
        <div className="flex justify-around p-2 mt-1 rounded-md">
          <button onClick={() => setMobileView("posts")} className={"px-4 py-2 rounded-md text-white"}>
            Posts
          </button>
          <button onClick={() => setMobileView("about")} className={`px-4 py-2 rounded-md text-white`}>
            About
          </button>
        </div>

        {/* Posts */}
        {mobileView === "posts" && (
          <div className="mt-1 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-700 p-4 rounded-md">
                <div className="flex items-center">
                  <img src={post.profileImage_url} alt="Avatar" className="w-10 h-10 bg-black rounded-full" />
                  <div className="ml-2">
                    <h3 className="font-bold text-xl">{post.created_by}</h3>
                    <p className="text-xs text-gray-400">{post.created_at}</p>
                  </div>
                </div>

                <p className="mt-2">{post.text_field}</p>
                {post.media_file && (
                  <img src={post.media_file} alt="Post" className="mt-2 w-full h-48 bg-white object-cover rounded-md" />
                )}

                <div className="flex items-center mt-3 text-gray-400 gap-6">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faHeart} className="cursor-pointer" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBookmark} className="cursor-pointer" />
                    <span>{post.saved}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faShareAlt} className="cursor-pointer" />
                    <span>{post.shared}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About */}
        {mobileView === "about" && (
          <div className="mt-4 space-y-4">
            {/* About Community */}
            <div className="bg-gray-500 p-4 rounded-md">
              <h2 className="text-xl font-bold text-white">About Community</h2>
              <p className="text-gray-400">{community_data.community_based_on}</p>
              <p className="text-gray-400">{community_data.description}</p>
              <p className="text-gray-400">Created {community_data.created_at}</p>
            </div>

            {/* Rules */}
            <div className="h-auto p-5 bg-gray-500">
              <h2 className="text-xl text-white font-bold">Rules</h2>
              <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                <p className="text-white mt-3">{userData.rules}</p>
              </div>
            </div>

            {/* Moderators */}
            <div className="bg-gray-500 p-4 rounded-md">
              <h2 className="text-ls font-bold text-white">Moderators</h2>
              <div className="max-h-[220px] overflow-y-auto scrollbar-thin text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black"></div>
                  <span className="text-xs">{community_data.owner}</span>
                </li>
                {userData.members.slice(0, showAllModerators ? userData.members.length : 5).map((member, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-black"></div>
                    <span className="text-xs">{member}</span>
                  </li>
                ))}
              </div>
              {community_data.members.length > 5 && (
                <button
                  onClick={() => setShowAllModerators(!showAllModerators)}
                  className="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                >
                  {showAllModerators ? "View Less" : "View All Moderators"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full gap-4">
        {/* Left Side */}
        <div className="w-full lg:w-3/4 flex flex-col gap-4">
          <div className="bg-gray-700 h-auto">
            <div className="flex flex-col items-center w-full h-[230px]">
              {/* Banner */}
              <div onClick={() => setBannerOpen(true)} className="relative w-full h-[170]">
                <img src={bannerImage_url || "/defaultBanner.png"} alt="Banner" className="w-full h-full object-cover" />
              </div>

              {/* Profile */}
              <div onClick={() => setPicOpen(true)} className="relative w-full">
                <div className="absolute -top-10 left-0 ml-10 w-[120] h-[120] rounded-full overflow-hidden bg-black border-4 border-gray-900">
                  <img src={profileImage_url || "/defaultProfile.png"} alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* Icons */}
                <div className="absolute top-0 right-0 flex items-center gap-3 p-2">
                  <button
                    className="text-white px-3 py-1 rounded-full text-xm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreatePostClick();
                    }}
                  >
                    + Create Post
                  </button>
                  <button
                    className="text-white px-3 py-1 rounded-full text-xm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleJoin();
                    }}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </button>
                </div>
              </div>
            </div>

            {/* Community Details */}
            <div className="mt-4 mb-2 ml-6 p-4 text-white">
              <b>{userData.name || "Community Name"}</b>
              <h4>{userData.community_based_on || "Community Based On"}</h4>
              <h4>{userData.description || "No Description"}</h4>
              <h4>{userData.created_at || "Created At"}</h4>
            </div>
          </div>

          {/* Posts Container */}
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-700 p-4 rounded-md">
                <div className="flex items-center">
                  <img src={post.profileImage_url} alt="Avatar" className="w-10 h-10 bg-black rounded-full" />
                  <div className="ml-2">
                    <h3 className="font-bold text-xl">{post.created_by}</h3>
                    <p className="text-xs text-gray-400">{post.created_at}</p>
                  </div>
                </div>

                <p className="mt-2">{post.text_field}</p>
                {post.media_file && (
                  <img src={post.media_file} alt="Post" className="mt-2 w-full h-[500px] bg-white object-cover rounded-md" />
                )}

                <div className="flex items-center mt-3 text-gray-400 gap-6">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faHeart} className="cursor-pointer" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBookmark} className="cursor-pointer" />
                    <span>{post.saved}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faShareAlt} className="cursor-pointer" />
                    <span>{post.shared}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-4 sticky top-2 h-fit">
          {/* Rules */}
          <div className="h-auto p-5 bg-gray-500">
            <h2 className="text-xl text-white font-bold">Rules</h2>
            <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
              <p className="text-white mt-2">{community_data.rules}</p>
            </div>
          </div>

          {/* Moderators */}
          <div className="h-auto p-4 bg-gray-500">
            <h2 className="text-ls text-white font-bold mb-4">Moderators</h2>
            <div className="max-h-[235px] overflow-y-auto scrollbar-thin text-white space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black"></div>
                <span className="text-xs">{community_data.owner}</span>
              </li>
              {userData.members.slice(0, showAllModerators ? userData.members.length : 5).map((member, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black"></div>
                  <span className="text-xs">{member}</span>
                </li>
              ))}
            </div>
            {community_data.members.length > 5 && (
              <button
                onClick={() => setShowAllModerators(!showAllModerators)}
                className="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              >
                {showAllModerators ? "View Less" : "View All Moderators"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post Popup */}
      {showPostPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 max-w-2xl relative shadow-lg" ref={popupRef}>
            <h2 className="text-2xl font-bold mb-6">Create a Post</h2>

            {/* Post Title */}
            <input type="text" className="w-full p-3 border rounded-md mb-4 text-lg" placeholder="Enter post title" />

            {/* Post Text */}
            <textarea
              className="w-full h-32 p-3 border rounded-md mb-4 text-lg resize-none"
              placeholder="What's on your mind?"
            ></textarea>

            {/* Image Upload */}
            <div
              className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center mb-4 cursor-pointer relative h-[150px] overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => setSelectedImage(null)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer h-full flex items-center justify-center">
                  <p className="text-gray-500 text-lg">Drag and drop or click to upload an image</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button className="text-white bg-green-500 px-6 py-3 rounded-md text-lg hover:bg-green-600">Post</button>
              <button className="text-white bg-red-500 px-6 py-3 rounded-md text-lg hover:bg-red-600" onClick={handleClosePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner and Profile Image */}
      {bannerOpen && (
        <div
          onClick={() => setBannerOpen(false)}
          className="fixed transition-all duration-500 ease-in-out hover:bg-black hover:bg-opacity-50 inset-0 z-10 flex flex-col items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[200px] h-[100px] rounded-md absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-3 p-2 bg-slate-700"
          >
            <p className="cursor-pointer" onClick={() => setIsBannerZoomed(!isBannerZoomed)}>
              View Banner
            </p>
            <hr className="w-full" />
            <input type="file" accept="image/*" ref={bannerFile} className="hidden" onChange={bannerHandle}></input>
            <p className="cursor-pointer" onClick={() => bannerFile.current.click()}>
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
            <p onClick={() => setIsProfileZoomed(!isProfileZoomed)} className="cursor-pointer">
              View Profile
            </p>
            <hr className="w-full" />
            <input type="file" accept="image/*" ref={profileFile} className="hidden" onChange={profileHandle}></input>
            <p className="cursor-pointer" onClick={() => profileFile.current.click()}>
              Change Profile
            </p>
          </div>
        </div>
      )}

      {/* Zoomed Profile and Banner Images */}
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