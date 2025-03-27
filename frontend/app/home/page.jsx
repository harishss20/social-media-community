"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faUsers,
  faUser,
  faThumbsUp,
  faComment,
  faBookmark,
  faShare,
  faSignOut,
  faArrowUp,
  faArrowDown19,
  faArrowDownLong,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";

export default function Home() {
  const userData = {
    bannerImage_url: "/defaultBanner.png",
    profileImage_url: "/defaultProfile.png",
    name: "Ram Kumar",
    description: "Hi! I'm here to share my Tech knowledge to help newbies.",
    clubsCreated: "1",
    clubsJoined: "12",
  };

  const posts = [
    {
      id: 1,
      profileImage_url: "/defaultProfile.png",
      name: "Rahul",
      created_at: "10/03/2025",
      post_img: "/dummyBanner.png",
      username: "Ravi",
      desc: "The greatest film of all time",
    },
    {
      id: 2,
      profileImage_url: "/defaultProfile.png",
      name: "Rahul",
      created_at: "10/03/2025",
      post_img: "/dummyBanner.png",
      username: "Ravi",
      desc: "The greatest film of all time",
    },
    {
      id: 3,
      profileImage_url: "/defaultProfile.png",
      name: "Rahul",
      created_at: "10/03/2025",
      post_img: "/dummyBanner.png",
      username: "Ravi",
      desc: "The greatest film of all time",
    },
    {
      id: 4,
      profileImage_url: "/defaultProfile.png",
      name: "Rahul",
      created_at: "10/03/2025",
      post_img: "/dummyBanner.png",
      username: "Ravi",
      desc: "The greatest film of all time",
    },
  ];

  const communities = {
    profileImage_url: "/defaultProfile.png",
    name: [
      "kumar",
      "cooper",
      "raj",
      "band",
      "hari",
      "sam",
      "vikram",
      "arjun",
      "naveen",
      "rohith",
      "tarun",
      "manoj",
    ],
    members: [
      "12,890",
      "10,500",
      "8,700",
      "15,300",
      "9,200",
      "11,400",
      "12,890",
      "10,500",
      "8,700",
      "15,300",
      "9,200",
      "11,400",
    ],
  };

  return (
    <div>
      {/* Left Content */}
      <div className="text-white min-h-screen flex p-6 justify-center gap-16 mt-5">
        <div className="flex flex-col items-center gap-4 w-60 sticky top-[120px] h-full overflow-y-auto">
          <div className="bg-[#30313b] w-60 h-[370px] rounded-lg shadow-md">
            <div className="relative">
              <img
                src={userData.bannerImage_url}
                alt="User Banner"
                className="w-full h-24 rounded-t-lg"
              />
              <img
                src={userData.profileImage_url}
                alt="User Profile"
                className="absolute top-16 left-2 w-[110px] h-[110px] rounded-full"
              />
            </div>
            <div className="px-6 pt-20">
              <h3 className="text-accent text-lg font-bold">{userData.name}</h3>
              <p className="text-sm mt-2">{userData.description}</p>
            </div>

            <div className="text-sm px-5">
              <hr className="my-4 border-gray-600" />
              <div className="flex justify-between">
                <span>Clubs Created:</span>
                <span className="text-accent">{userData.clubsCreated}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Clubs Joined:</span>
                <span className="text-accent">{userData.clubsJoined}</span>
              </div>
            </div>
          </div>

          {/* Saved Items */}
          <div className="bg-[#30313b] text-white w-60 h-14 p-4 rounded-lg flex items-center gap-3 shadow-md">
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-purple-300 text-xl"
            />
            <span className="font-semibold text-md">Saved Items</span>
          </div>
        </div>

        {/* Post Content */}
        <div className="w-[400px]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#30313b] px-8 py-4 mb-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={post.profileImage_url}
                    alt="Post Author"
                    className="h-12 w-12 rounded-full bg-black"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-300">
                      {post.name}
                    </h3>
                    <div className="flex flex-row justify-between gap-4">
                      <p className="text-sm text-gray-400">
                        {post.username}{" "}
                        <span className="ml-1 mr-3 text-xl"> |</span>
                        <span className="text-sm text-gray-400">
                          {post.created_at}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="Save post"
                  className="ml-auto flex items-center gap-1 px-2 py-1 bg-gray-700 text-purple-400 rounded-full border border-gray-500 text-sm"
                >
                  <FontAwesomeIcon icon={faBookmark} className="text-xs" />
                  <span className="font-medium">Save</span>
                </button>
              </div>

              <p className="mt-5 ml-2 mb-4 text-gray-300">{post.desc}</p>
              <img
                src={post.post_img}
                alt="Post"
                className="w-full h-[300px] bg-white mt-2 object-cover rounded-lg"
              />
              <div className="flex gap-2 mt-3">
                <div className="flex items-center gap-1 px-2 py-0 bg-gray-700 text-purple-400 rounded-full border border-gray-500 text-sm">
                  <button className="pl-[4px] pr-[4px]">
                    <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                  </button>
                  <span className="font-medium border-l-2 pl-2 border-r-2 pr-2 border-gray-500">
                    Vote
                  </span>
                  <button className="pl-[4px] pr-[4px]">
                    <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
                  </button>
                </div>

                <button className="flex items-center gap-1 px-2 py-1 bg-gray-700 text-purple-400 rounded-full border border-gray-500 text-sm">
                  <FontAwesomeIcon icon={faComment} className="text-xs" />
                  <span className="font-medium">Discussion</span>
                </button>

                <button className="ml-auto flex items-center gap-1 px-2 py-1 bg-gray-700 text-purple-400 rounded-full border border-gray-500 text-sm">
                  <FontAwesomeIcon icon={faShare} className="text-xs" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Communities Section */}
        <div className="flex flex-col gap-4 w-64 sticky top-[120px] h-full overflow-y-auto">
          <button className="p-2 font-bold text-white bg-accent rounded-md">
            Create a community
          </button>
          <div className="bg-[#30313b] p-4 w-64 max-h-[500px] rounded-lg shadow-md">
            <h3 className="text-accent text-lg font-bold">Communities</h3>
            <ul className="mt-4 space-y-5 h-[400px] overflow-y-auto">
              {communities.name.map((club, index) => (
                <li
                  key={`${club}-${index}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={communities.profileImage_url}
                    alt="Community"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className="block font-bold text-purple-400 leading-tight">
                      {club}
                    </span>
                    <p className="text-gray-400 text-sm">
                      {communities.members[index]} members
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
