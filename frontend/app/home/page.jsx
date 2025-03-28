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
import useUserData from "../hooks/useUserData";
import { useJoinedCommunities } from "../hooks/useJoinedCommunities";
import { Commet } from "react-loading-indicators";
import { useAllPosts } from "../hooks/useAllPosts";
import { timeAgo } from "../helper/timeAgo";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userData, error } = useUserData();
  const { communities, error2 } = useJoinedCommunities();
  const { allPosts } = useAllPosts(communities);
  const router = useRouter();
  console.log(allPosts);

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

  // const communities = {
  //   profileImage_url: "/defaultProfile.png",
  //   name: ["kumar", "cooper", "raj", "band", "hari", "sam", "vikram", "arjun", "naveen", "rohith", "tarun", "manoj"],
  //   members: ["12,890", "10,500", "8,700", "15,300", "9,200", "11,400", "12,890", "10,500", "8,700", "15,300", "9,200", "11,400"],
  // };

  const handleCommunity = (community_name) => {
    router.push(`/community/${community_name}`); 
  }

  if (!communities) return (
    <div className="flex justify-center items-center h-[80vh]">
      <Commet size="small" color="#cac8ff" />
    </div>
  );

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
                className="absolute top-16 left-2 w-[110px] h-[110px] rounded-full object-cover"
              />
            </div>
            <div className="px-6 pt-20">
              <h3 className="text-accent text-lg font-bold">{userData.name}</h3>
              <p className="text-sm mt-2">{userData.bio}</p>
            </div>

            <div className="text-sm px-5">
              <hr className="my-4 border-gray-600" />
              <div className="flex justify-between">
                <span>Communities Created:</span>
                <span className="text-accent">{userData.community_created}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Communities Joined:</span>
                <span className="text-accent">{userData.community_joined}</span>
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
          {allPosts.map((post) => (
            <div key={post.id} className="bg-[#30313b] px-8 py-4 mb-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={post.community.profileImage_url} alt="Post Author" className="h-12 w-12 rounded-full bg-black" />
                  <div>
                    <h3 onClick={() => handleCommunity(post.community.name)} className="text-lg font-bold text-gray-300 cursor-pointer">{post.community.name}</h3>
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-sm text-gray-400">
                        {post.author.name} 
                      </p>
                        <span className="text-gray-400 text-xl">|</span>
                        <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
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

              <p className="mt-5 ml-2 mb-4 text-gray-300 break-words">{post.text_field}</p>
              {post.media_file && (
                <img src={post.media_file} alt="Post" className="w-full h-[300px] bg-black mt-2 object-contain rounded-lg" />
              )}<div className="flex gap-2 mt-3">

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
          <button className="p-2 font-bold text-white bg-accent rounded-md">Create a community</button>
          <div className="bg-[#30313b] p-4 w-64 max-h-[410px] rounded-lg shadow-md">
            <h3 className="text-accent text-lg font-bold">Communities</h3>
            <ul className="mt-4 space-y-2 h-[400px] overflow-y-auto relative">
              {communities?.length == 0 ? <div className="absolute top-36 left-10">You've joined no communities</div>
                : communities?.map((community) => (
                  <li key={community?.id} onClick={() => handleCommunity(community?.name)} className="flex items-center gap-3 rounded-md hover:bg-[#1e1f26] p-2 transition duration-300 cursor-pointer">
                    <img src={community?.communityImage_url} alt="Community" className="w-10 h-10 rounded-full" />
                    <div>
                      <span className="block font-bold text-purple-400 leading-tight">{community?.name.replace(/%20/g, " ")}</span>
                      <p className="text-gray-400 text-sm">{community.members.length} {community.members.length > 1 ? "members" : "member"}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="text-gray-300 text-center py-4">
            <div className="flex justify-center space-x-6 text-white mb-4">
              <a href="/about" className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full inline-block mr-2"></span>{" "}
                About
              </a>
              <a href="/privacy" className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full inline-block mr-2"></span>{" "}
                Privacy & Terms
              </a>
            </div>
            <div className="text-lg font-bold">
              <span className="text-purple-400">LADSPA</span>{" "}
              <span className="text-gray-400">Corporation © 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
