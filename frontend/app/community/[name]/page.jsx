"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faTimes,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import useCommunityDetails from "../../hooks/useCommunityDetails";
import { useParams, useRouter } from "next/navigation";
import {
  createPost,
  DeleteCommunityPage,
  editCommunityPage,
  joinSingleCommunity,
  leaveCommunity,
  postShare,
  updateLike,
  updateSave,
} from "../../api/communityAPI";
import { Commet } from "react-loading-indicators";

export default function CommunityPage() {
  const { name } = useParams();
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);
  const { loading, error, community_data, community_posts } =
    useCommunityDetails(name, refresh);
  const owner = community_data?.owner?.id;

  const [showAllModerators, setShowAllModerators] = useState(false);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [bannerImage_url, setBannerImage_url] = useState(
    community_data?.bannerImage_url
  );
  const [profileImage_url, setProfileImage_url] = useState(
    community_data?.profileImage_url
  );
  const [isProfileZoomed, setIsProfileZoomed] = useState(false);
  const [isBannerZoomed, setIsBannerZoomed] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [picOpen, setPicOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text_field, setText_field] = useState("");
  const [media_file, setMedia_file] = useState(null);
  const [posts, setPosts] = useState(community_posts);

  const bannerFile = useRef(null);
  const profileFile = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (community_data?.members) {
      if (community_data?.owner?.id == localStorage.getItem("UserId"))
        setIsJoined(true);
      community_data?.members?.forEach((item) => {
        if (item?.id == localStorage.getItem("UserId")) setIsJoined(true);
      });
    }
    if (community_data?.bannerImage_url)
      setBannerImage_url(community_data.bannerImage_url);
    if (community_data?.communityImage_url)
      setProfileImage_url(community_data.communityImage_url);
  }, [community_data]);
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
  }, [showPostPopup, community_posts, isJoined, refresh]);

  const handleCreatePostClick = () => setShowPostPopup(true);
  const handleClosePopup = () => {
    setShowPostPopup(false);
    setSelectedImage(null);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMedia_file(file);
      console.log(media_file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };
  const toggleJoin = async () => {
    if (!isJoined) {
      const success = await joinSingleCommunity(name);
      if (success) {
        setIsJoined(true);
        setRefresh((prev) => prev + 1);
      }
    } else {
      const success = await leaveCommunity(name);
      console.log(success);
      if (success) {
        setIsJoined(false);
        setRefresh((prev) => prev + 1);
      }
    }
    console.log(community_data);
    console.log(isJoined);
  };

  const bannerHandle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(community_data?.bannerImage_url);

    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl) {
      const res = await editCommunityPage(localStorage.getItem("UserId"), {
        name: community_data?.name,
        bannerImage_url: imageUrl,
      });
      if (res) {
        console.log(imageUrl);
        setBannerImage_url(imageUrl);
        setBannerOpen(false);
        setRefresh(0);
      }
    }
  };

  const profileHandle = async (e) => {
    console.log("hello");
    console.log(community_data?.communityImage_url);
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    console.log(imageUrl);
    if (imageUrl) {
      const res = await editCommunityPage(localStorage.getItem("UserId"), {
        name: community_data?.name,
        communityImage_url: imageUrl,
      });
      if (res) {
        setProfileImage_url(imageUrl);
        setPicOpen(false);
        setRefresh(0);
      }
    }
  };

  const handleDeleteCommunity = async () => {
    const res = await DeleteCommunityPage(
      localStorage.getItem("UserId"),
      community_data?.name
    );
    if (res) {
      console.log(res);
      router.replace("/home");
    }
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

  const handlePostSubmission = async () => {
    const media_url = media_file ? await uploadToCloudinary(media_file) : null;
    console.log(title, media_url);
    const success = await createPost({
      title,
      text_field,
      media_file: media_url,
      name,
    });
    if (success) {
      setRefresh((prev) => prev + 1);
      handleClosePopup();
      setTitle("");
      setText_field("");
      setMedia_file(null);
    }
  };

  const timeAgo = (created) => {
    const currentTime = Date.now();
    const createdTime = new Date(created).getTime();

    let duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24 * 365);
    if (duration >= 1) return Math.floor(duration) + " years ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24 * 30);
    if (duration >= 1) return Math.floor(duration) + " months ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24 * 7);
    if (duration >= 1) return Math.floor(duration) + " weeks ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24);
    if (duration >= 1) return Math.floor(duration) + " days ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60);
    if (duration >= 1) return Math.floor(duration) + " hours ago";

    return "Just now";
  };

  const getFormattedTime = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (community_data?.created_at) {
      let t = new Date(community_data?.created_at)
        .toLocaleDateString()
        .split("/");
      const formattedTime =
        months[t[0] - 1].slice(0, 3) + " " + t[1] + ", " + t[2];
      return "Created at " + formattedTime;
    }
    return "";
  };

  const toggleLike = async (id) => {
    const success = await updateLike(id, { action: "like" });
    console.log(success);
    if (success) setRefresh((prev) => prev + 1);
  };

  const toggleSave = async (id) => {
    updateSave(id);
    setRefresh((prev) => prev + 1);
  };

  const handleShare = async (id) => {
    let link = await postShare(id);
    link = link.replace("8000", "3000");
    link = link.replace("/posts", "/post");
    link = link.replace("/api", "");
    console.log(link);
    setShowSharePopup(true);
    // router.push(link);
  };

  if (!community_data)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Commet size="small" color="#cac8ff" />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-3/4 mx-auto p-2 gap-4">
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full gap-4 mt-2">
        {/* Left Side */}
        <div className="w-full lg:w-3/4 flex flex-col gap-5">
          <div className="bg-[#30313b] h-auto rounded-md overflow-hidden">
            <div className="flex flex-col items-center w-full h-[230px]">
              {/* Banner */}
              <div
                onClick={() => setBannerOpen(true)}
                className="relative w-full h-[170] hover:brightness-50 cursor-pointer duration-500 ease-in-out"
              >
                <img
                  src={bannerImage_url}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile */}
              <div className="relative w-full">
                <div
                  onClick={() => setPicOpen(true)}
                  className="absolute -top-10 left-0 ml-10 w-[120] h-[120] rounded-full overflow-hidden bg-black border-4 border-gray-900 hover:brightness-50 cursor-pointer duration-500 ease-in-out"
                >
                  <img
                    src={profileImage_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Icons */}
                <div className="absolute top-0 right-0 flex items-center gap-3 p-2">
                  <button
                    className="text-[#cac8ff] px-3 py-1 rounded-full text-xm border-2 border-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreatePostClick();
                    }}
                  >
                    {isJoined && (
                      <>
                        <span className="text-primary">+</span> Post
                      </>
                    )}
                  </button>
                  {community_data?.owner?.id ==
                  localStorage.getItem("UserId") ? (
                    <button
                      className="text-white px-3 py-1 rounded-full text-xm"
                      onClick={handleDeleteCommunity}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="text-[#cac8ff] px-3 py-1 rounded-full text-xm border-2 border-primary "
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJoin();
                      }}
                    >
                      {isJoined ? "Leave" : "Join"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Community Details */}
            <div className="mt-4 mb-2 ml-6 mr-6 p-4 text-white">
              <b className="text-2xl text-accent">
                {community_data?.name.replace(/%20/g, " ") || "Community Name"}
              </b>
              <p className="text-xs text-gray-400">
                {getFormattedTime() || "Created At"}
              </p>
              <hr className="border-[1px] mt-2 rounded-md border-[#cac8ff]" />
              <h4 className="pt-5">
                {community_data?.description || "No Description"}
              </h4>
            </div>
          </div>

          {/* Posts Container */}
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-800 p-10 pt-8 rounded-md">
                <div className="flex items-center">
                  <img
                    src={post.author.profileImage_url}
                    alt="Avatar"
                    className="w-10 h-10 object-cover bg-black rounded-full"
                  />
                  <div className="ml-2">
                    <h3 className="font-bold text-xl">{post.author.name}</h3>
                    <p className="font-extrabold text-xs text-gray-400">
                      {timeAgo(post.created_at)}
                    </p>
                  </div>
                </div>
                <hr className="border-[1px] mt-2 rounded-md border-[#cac8ff]" />
                <h1 className="text-xl pt-5 break-words">{post.title}</h1>

                {post.media_file && (
                  <img
                    src={post.media_file}
                    alt="Post"
                    className="mt-2 w-full h-[500px] bg-black object-contain rounded-md"
                  />
                )}
                <p className="mt-2 text-sm pt-5 break-words break">
                  {post.text_field}
                </p>

                <div className="flex items-center mt-5 text-gray-400 gap-6">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      onClick={() => toggleLike(post.id)}
                      icon={faHeart}
                      className="cursor-pointer"
                      color={
                        post.likes.includes(localStorage.getItem("UserId"))
                          ? "red"
                          : ""
                      }
                    />
                    <span>{post.likes_count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      onClick={() => toggleSave(post.id)}
                      icon={faBookmark}
                      className={`cursor-pointer ${post.saved_by.includes(localStorage.getItem("UserId")) ? "text-[#cac8ff]" : ""}`}
                    />
                    <span>{post.saved}</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <FontAwesomeIcon
                      onClick={() => handleShare(post.id)}
                      icon={faShareAlt}
                      className="cursor-pointer"
                    />
                    <span>{post.shared}</span>
                    {showSharePopup && <div></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-4 sticky top-[88px] h-fit">
          {/* Rules */}
          <div className="h-auto p-5 bg-gray-800 rounded-sm">
            <h2 className="text-xl text-white font-bold">Rules</h2>
            <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
              <p className="text-white mt-2">{community_data?.rules}</p>
            </div>
          </div>

          {/* Moderators */}
          <div className="h-auto p-4 bg-gray-800 rounded-sm">
            <h2 className="text-ls text-white font-bold mb-4">Moderators</h2>
            <div className="max-h-[235px] overflow-y-auto scrollbar-thin text-white space-y-2">
              <li className="flex items-center gap-2">
                <img
                  src={community_data?.owner?.profileImage_url}
                  alt="Pr"
                  className="w-8 h-8 rounded-full bg-black object-cover"
                />
                {/* </div> */}
                <span className="text-xs">{community_data?.owner?.name}</span>
              </li>
              {community_data?.members
                .slice(
                  0,
                  showAllModerators ? community_data?.members.length : 5
                )
                .map((member, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <img
                      src={member?.profileImage_url}
                      alt="Pr"
                      className="w-8 h-8 object-cover bg-black rounded-full"
                    />
                    {/* </div> */}
                    <span className="text-xs">{member.name}</span>
                  </li>
                ))}
            </div>
            {community_data?.members.length > 5 && (
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
          <div
            className="bg-white p-8 rounded-lg w-full lg:w-1/2 max-w-2xl relative shadow-lg"
            ref={popupRef}
          >
            <h2 className="text-2xl font-bold mb-6">Create a Post</h2>

            {/* Post Title */}
            <input
              type="text"
              className="w-full p-3 border rounded-md mb-4 text-lg"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Post Text */}
            <textarea
              className="w-full h-32 p-3 border rounded-md mb-4 text-lg resize-none"
              placeholder="What's on your mind?"
              value={text_field}
              onChange={(e) => setText_field(e.target.value)}
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
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full pl-2 pr-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    <FontAwesomeIcon size="2xs" icon={faTimes} />
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer h-full flex items-center justify-center">
                  <p className="text-gray-500 text-lg">
                    Drag and drop or click to upload an image
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="text-white bg-green-500 px-6 py-3 rounded-md text-lg hover:bg-green-600"
                onClick={handlePostSubmission}
              >
                Post
              </button>
              <button
                className="text-white bg-red-500 px-6 py-3 rounded-md text-lg hover:bg-red-600"
                onClick={handleClosePopup}
              >
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
            <p
              className="cursor-pointer"
              onClick={() => setIsBannerZoomed(!isBannerZoomed)}
            >
              View Banner
            </p>
            {community_data?.owner?.id == localStorage.getItem("UserId") && (
              <>
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
              </>
            )}
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
            {community_data?.owner?.id == localStorage.getItem("UserId") && (
              <>
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
              </>
            )}
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
