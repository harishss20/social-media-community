"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, faBookmark, faShareAlt,
  faSearch, faHome, faUsers, faUser,
  faSignOutAlt as faSignOut, faReply, faChevronDown, faChevronUp
} from "@fortawesome/free-solid-svg-icons";

export default function PostComments() {
  // Post data
  const post = {
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
  };

  // Community data
  const community_data = {
    rules: "..",
    owner: {
      name: "Admin",
      profileImage_url: "https://picsum.photos/id/10"
    },
    members: [
      { name: "Moderator1", profileImage_url: "https://picsum.photos/id/11" },
      { name: "Moderator2", profileImage_url: "https://picsum.photos/id/12" },
      { name: "Moderator3", profileImage_url: "https://picsum.photos/id/13" },
      { name: "Moderator4", profileImage_url: "https://picsum.photos/id/14" },
      { name: "Moderator5", profileImage_url: "https://picsum.photos/id/15" },
      { name: "Moderator6", profileImage_url: "https://picsum.photos/id/16" },
      { name: "Moderator7", profileImage_url: "https://picsum.photos/id/17" },
      { name: "Moderator8", profileImage_url: "https://picsum.photos/id/18" }
    ]
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "User123",
      avatar: "https://picsum.photos/id/100",
      comments: "This is a great post! Really helpful information.",
      created_at: "2 days ago",
      replies: [
        {
          id: 101,
          comment: 1,
          user: "Creator",
          avatar: "https://picsum.photos/id/101",
          replies: "Thanks for your feedback!",
          created_at: "1 day ago",
        },
      ],
      showReplies: false
    },
    {
      id: 2,
      user: "TechEnthusiast",
      avatar: "https://picsum.photos/id/200",
      comments: "I have a question about the implementation details. Can you elaborate more?",
      created_at: "1 day ago",
      replies: [],
      showReplies: false
    }
  ]);

  const [showAllModerators, setShowAllModerators] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  
  const visibleModerators = showAllModerators 
    ? [community_data.owner, ...community_data.members]
    : [community_data.owner, ...community_data.members.slice(0, 4)];

  const handleAddComment = (e) => {
    if (e) e.preventDefault();
    if (newComment.trim() === "") return;
    
    const comment = {
      id: Date.now(),
      user: "CurrentUser",
      avatar: "https://picsum.photos/id/300",
      comments: newComment,
      created_at: "Just now",
      replies: [],
      showReplies: false
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleAddReply = (commentId, e) => {
    if (e) e.preventDefault();
    if (replyText.trim() === "") return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const reply = {
          id: Date.now(),
          comment: commentId,
          user: "CurrentUser",
          avatar: "https://picsum.photos/id/300",
          replies: replyText,
          created_at: "Just now",
        };
        return {
          ...comment,
          replies: [...comment.replies, reply],
          showReplies: true
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    setReplyText("");
  };

  const toggleReplies = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, showReplies: !comment.showReplies };
      }
      return comment;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-800">
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

      <div className="flex flex-col lg:flex-row w-full lg:w-3/4 mx-auto p-4 gap-4">
        {/* Left Content */}
        <div className="w-full lg:w-2/3">
          {/* Post Section */}
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="flex items-center">
              <img src={post.profileImage_url} alt="Avatar" className="w-10 h-10 rounded-full" />
              <div className="ml-2">
                <h3 className="font-bold text-xl text-white">{post.created_by}</h3>
                <p className="text-xs text-gray-400">{post.created_at}</p>
              </div>
            </div>

            <p className="mt-4 text-white">{post.text_field}</p>
            
            {post.media_file && (
              <img
                src={post.media_file}
                alt="Post"
                className="mt-4 w-full h-[400px] bg-white object-cover rounded-md"
              />
            )}

            <div className="flex items-center mt-4 text-gray-400 gap-6">
              <button className="flex items-center gap-2 hover:text-white">
                <FontAwesomeIcon icon={faHeart} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-white">
                <FontAwesomeIcon icon={faBookmark} />
                <span>{post.saved}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-white">
                <FontAwesomeIcon icon={faShareAlt} />
                <span>{post.shared}</span>
              </button>
            </div>

            {/* Comment Input */}
            <div className="mt-6">
              <form onSubmit={handleAddComment} className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-full focus:outline-none"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        handleAddComment(e);
                      }
                    }}
                  />
                  {newComment && (
                    <div className="flex justify-end mt-2 gap-2">
                      <button 
                        type="button"
                        className="px-3 py-1 text-gray-300 hover:text-white"
                        onClick={() => setNewComment("")}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Comments */}
            <div className="mt-6 space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="border-t border-gray-600 pt-4">
                  <div className="flex gap-3">
                    <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">{comment.user}</h4>
                        <span className="text-gray-400 text-sm">{comment.created_at}</span>
                      </div>
                      <p className="text-white mt-1">{comment.comments}</p>
                 
                      <div className="flex items-center gap-4 mt-2 text-gray-400">
                        <button 
                          className="flex items-center gap-1 hover:text-white"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        >
                          <FontAwesomeIcon icon={faReply} />
                          <span>Reply</span>
                        </button>
                      </div>

                      {/* Reply Input */}
                      {replyingTo === comment.id && (
                        <form onSubmit={(e) => handleAddReply(comment.id, e)} className="flex gap-3 mt-4">
                          <img 
                            src="https://picsum.photos/id/300" 
                            alt="User" 
                            className="w-8 h-8 rounded-full" 
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Write a reply..."
                              className="w-full bg-gray-600 text-white px-3 py-1 rounded-full focus:outline-none text-sm"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  handleAddReply(comment.id, e);
                                }
                              }}
                            />
                            <div className="flex justify-end mt-2 gap-2">
                              <button 
                                type="button"
                                className="px-2 py-1 text-xs text-gray-300 hover:text-white"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit"
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </form>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-3">
                          <button 
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                            onClick={() => toggleReplies(comment.id)}
                          >
                            <FontAwesomeIcon 
                              icon={comment.showReplies ? faChevronUp : faChevronDown} 
                              size="xs" 
                            />
                            <span>{comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
                          </button>

                          {comment.showReplies && (
                            <div className="mt-3 ml-8 space-y-3 border-l-2 border-gray-600 pl-4">
                              {comment.replies.map(reply => (
                                <div key={reply.id} className="pt-2">
                                  <div className="flex gap-3">
                                    <img src={reply.avatar} alt={reply.user} className="w-8 h-8 rounded-full" />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-white text-sm">{reply.user}</h4>
                                        <span className="text-gray-400 text-xs">{reply.created_at}</span>
                                      </div>
                                      <p className="text-white text-sm mt-1">{reply.replies}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-4">
          <div className="sticky top-[76px] h-fit space-y-4">
            {/* Rules Section */}
            <div className="bg-gray-700 p-4 rounded-md">
              <h2 className="text-xl font-bold text-white mb-2">Community Rules</h2>
              <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                <p className="text-white whitespace-pre-line text-sm">{community_data.rules}</p>
              </div>
            </div>

            {/* Moderators Section */}
            <div className="bg-gray-700 p-4 rounded-md">
              <h2 className="text-xl font-bold text-white mb-3">Moderators</h2>
              <div className="max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                <ul className="space-y-3">
                  {visibleModerators.map((moderator, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <img 
                        src={moderator.profileImage_url} 
                        alt={moderator.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-white text-sm">{moderator.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {community_data.members.length > 4 && (
                <button
                  onClick={() => setShowAllModerators(!showAllModerators)}
                  className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {showAllModerators ? "Show Less" : "View All Moderators"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}