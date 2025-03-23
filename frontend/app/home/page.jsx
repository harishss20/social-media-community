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
} from "@fortawesome/free-solid-svg-icons";

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
    name: ["kumar", "cooper", "raj", "band", "hari", "sam", "vikram", "arjun", "naveen", "rohith", "tarun", "manoj"],
    members: ["12,890", "10,500", "8,700", "15,300", "9,200", "11,400", "12,890", "10,500", "8,700", "15,300", "9,200", "11,400"],
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-500 text-white flex items-center justify-around px-6 py-4 sticky top-0 z-50">
        <div className="text-3xl font-bold text-purple-300">LADSPA</div>
        <div className="relative ml-24">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-purple-300" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-gray-300 pl-10 pr-4 py-2 focus:outline-none rounded-3xl w-96"
          />
        </div>
        <div className="flex space-x-8">
          <div className="flex flex-col items-center text-purple-300 cursor-pointer">
            <FontAwesomeIcon icon={faHome} className="text-2xl" />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center text-purple-300 cursor-pointer">
            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            <span className="text-xs">Club</span>
          </div>
          <div className="flex flex-col items-center text-purple-300 cursor-pointer">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
            <span className="text-xs">Profile</span>
          </div>
          <div className="flex flex-col items-center text-purple-300 cursor-pointer">
            <FontAwesomeIcon icon={faSignOut} className="text-2xl" />
            <span className="text-xs">Logout</span>
          </div>
        </div>
      </nav>

      {/* Left Content */}
      <div className="text-white min-h-screen flex p-6 justify-center gap-16 mt-5">
        <div className="flex flex-col items-center gap-4 w-60 sticky top-[120px] h-full overflow-y-auto">
      
          <div className="bg-gray-800 w-60 h-[370px] rounded-lg shadow-md">
            <div className="relative">
              <img src={userData.bannerImage_url} alt="User Banner" className="w-full h-24 rounded-t-lg" />
              <img
                src={userData.profileImage_url}
                alt="User Profile"
                className="absolute top-16 left-2 w-[110px] h-[110px] rounded-full"
              />
            </div>
            <div className="px-6 pt-20">
              <h3 className="text-red-500 text-lg font-bold">{userData.name}</h3>
              <p className="text-sm mt-2">{userData.description}</p>
            </div>

            <div className="text-sm px-5">
              <hr className="my-4 border-gray-600" />
              <div className="flex justify-between">
                <span>Clubs Created:</span>
                <span className="text-red-500">{userData.clubsCreated}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Clubs Joined:</span>
                <span className="text-red-500">{userData.clubsJoined}</span>
              </div>
            </div>
          </div>

          {/* Saved Items */}
          <div className="bg-gray-800 text-white w-60 h-14 p-4 rounded-lg flex items-center gap-3 shadow-md">
            <FontAwesomeIcon icon={faBookmark} className="text-purple-300 text-xl" />
            <span className="font-semibold text-md">Saved Items</span>
          </div>
        </div>

        {/* Post Content */}
        <div className="w-[400px]">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 px-8 py-4 mb-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={post.profileImage_url} alt="Post Author" className="h-12 w-12 rounded-full bg-black" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-300">{post.name}</h3>
                    <p className="text-sm text-gray-400">
                      {post.username} <span className="mx-5">|</span>
                      <span className="text-sm text-gray-400">{post.created_at}</span>
                    </p>
                  </div>
                </div>
                <button aria-label="Save post" className="ml-auto flex items-center gap-1 px-2 py-1 bg-gray-700 text-purple-400 rounded-full border border-gray-500 text-sm">
                  <FontAwesomeIcon icon={faBookmark} className="text-xs" />
                  <span className="font-medium">Save</span>
                </button>
              </div>

              <p className="mt-5 ml-2 mb-4 text-gray-300">{post.desc}</p>
              <img src={post.post_img} alt="Post" className="w-full h-[300px] bg-white mt-2 object-cover rounded-lg" />
              <div className="flex gap-2 mt-3">
             
                <button className="flex items-center gap-1 px-2 py-1 bg-gray-700 text-purple-400 rounded-full border border-gray-500 text-sm">
                  <FontAwesomeIcon icon={faThumbsUp} className="text-xs" />
                  <span className="font-medium">Vote</span>
                </button>

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
          <div className="bg-gray-800 p-4 w-64 max-h-[500px] rounded-lg shadow-md">
            <h3 className="text-red-500 text-lg font-bold">Communities</h3>
            <ul className="mt-4 space-y-5 h-[400px] overflow-y-auto">
              {communities.name.map((club, index) => (
                <li key={`${club}-${index}`} className="flex items-center gap-3">
                  <img src={communities.profileImage_url} alt="Community" className="w-10 h-10 rounded-full" />
                  <div>
                    <span className="block font-bold text-purple-400 leading-tight">{club}</span>
                    <p className="text-gray-400 text-sm">{communities.members[index]} members</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="text-gray-300 text-center py-4">
            <div className="flex justify-center space-x-6 text-white mb-4">
              <a href="/about" className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full inline-block mr-2"></span> About
              </a>
              <a href="/privacy" className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full inline-block mr-2"></span> Privacy & Terms
              </a>
            </div>
            <div className="text-lg font-bold">
              <span className="text-purple-400">LADSPA</span> <span className="text-gray-400">Corporation © 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}