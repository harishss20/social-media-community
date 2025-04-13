"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faShareAlt,
  faReply,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import {
  getComments,
  getSinglePost,
  createComment,
  getReplies,
  replyComment,
} from "../../../api/commentsAPI";

export default function PostComments() {
  const { id } = useParams();

  const community_data = {
    rules: "Community rules go here.",
    owner: {
      name: "Admin",
      profileImage_url: "https://picsum.photos/id/10",
    },
    members: [
      { name: "Moderator1", profileImage_url: "https://picsum.photos/id/11" },
      { name: "Moderator2", profileImage_url: "https://picsum.photos/id/12" },
    ],
  };

  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showAllModerators, setShowAllModerators] = useState(false);

  const deduplicateComments = (data) => {
    const map = new Map();
    data.forEach((item) => {
      map.set(item.id, item);
    });
    return Array.from(map.values());
  };

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(id);
      if (data) {
        const commentsWithReplies = await Promise.all(
          data.map(async (comment) => {
            const replies = await getReplies(comment.id);
            return {
              ...comment,
              replies: replies || [],
              showReplies: false,
            };
          })
        );
        setComments(deduplicateComments(commentsWithReplies));
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getSinglePost(id);
      if (data) {
        setPost(data);
      }
    };
    fetchPost();
  }, [id]);

  const visibleModerators = showAllModerators
    ? [community_data.owner, ...community_data.members]
    : [community_data.owner, ...community_data.members.slice(0, 4)];

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await createComment(id, newComment);
    if (res) {
      console.log("Comment added:", res);
      const updatedComments = await getComments(id);
      if (updatedComments) {
        const normalizedData = updatedComments.map((item) => ({
          ...item,
          replies: item.replies || [],
          showReplies: false,
        }));

        setComments(deduplicateComments(normalizedData));
      }
      setNewComment("");
    } else {
      console.log("Error creating comment");
    }
  };

  const handleAddReply = async (commentId, e) => {
    e.preventDefault();
    if (replyText.trim() === "") return;

    const newReply = await replyComment(commentId, replyText);
    if (newReply) {
      const updatedReplies = await getReplies(commentId);
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          const normalizedReplies = updatedReplies.map((reply) => ({
            ...reply,
          }));
          return {
            ...comment,
            replies: normalizedReplies,
          };
        }
        return comment;
      });

      setComments(deduplicateComments(updatedComments));
      setReplyingTo(null);
      setReplyText("");
    } else {
      console.log("Error creating reply");
    }
  };

  const toggleReplies = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplies: !comment.showReplies }
          : comment
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="flex flex-col lg:flex-row w-full lg:w-3/4 mx-auto p-4 gap-4">
        {/* Left Content: Post and Comments */}
        <div className="w-full lg:w-2/3">
          <div className="bg-gray-700 p-4 rounded-md">
            {/* Post Section */}
            <div className="flex items-center">
              <img
                src={post?.community?.profileImage_url}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2 flex justify-between items-center w-full">
                <h3 className="font-bold text-xl text-white">
                  {post?.community?.name}
                </h3>
                <p className="text-xs text-gray-400">{post.created_at}</p>
              </div>
            </div>
            <p className="mt-4 text-white">{post.title}</p>
            <p className="mt-4 text-white">{post.text_field}</p>
            {post.media_file && (
              <img
                src={post.media_file}
                alt="Post"
                className="mt-2 w-full h-[450px] bg-black object-contain rounded-md"
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
                      if (e.key === "Enter" && !e.shiftKey) {
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

            {/* Comments List */}
            <div className="mt-6 space-y-4">
              {comments.length === 0 ? (
                <p className="text-white text-center">No comments</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-t border-gray-600 pt-4"
                  >
                    <div className="flex gap-3">
                      <img
                        src={comment.user.profileImage_url}
                        alt={comment.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">
                            {comment.user.name}
                          </h4>
                          <span className="text-gray-400 text-sm">
                            {new Date(comment.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-white mt-1">{comment.comments}</p>
                        <div className="flex items-center gap-4 mt-2 text-gray-400">
                          <button
                            className="flex items-center gap-1 hover:text-white"
                            onClick={() =>
                              setReplyingTo(
                                replyingTo === comment.id ? null : comment.id
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faReply} />
                            <span>Reply</span>
                          </button>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                          <form
                            onSubmit={(e) => handleAddReply(comment.id, e)}
                            className="flex gap-3 mt-4"
                          >
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
                                  if (e.key === "Enter" && !e.shiftKey) {
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

                        {/* Nested replies if any */}
                        {comment.replies?.length > 0 && (
                          <div className="mt-3">
                            <button
                              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                              onClick={() => toggleReplies(comment.id)}
                            >
                              <FontAwesomeIcon
                                icon={
                                  comment.showReplies
                                    ? faChevronUp
                                    : faChevronDown
                                }
                                size="xs"
                              />
                              <span>
                                {comment.replies.length}{" "}
                                {comment.replies.length === 1
                                  ? "reply"
                                  : "replies"}
                              </span>
                            </button>
                            {comment.showReplies &&
                              comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="mt-3 ml-8 space-y-3 border-l-2 border-gray-600 pl-4"
                                >
                                  <div className="flex gap-3">
                                    <img
                                      src={reply.user.profileImage_url}
                                      alt={reply.user.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-white text-sm">
                                          {reply.user.name}
                                        </h4>
                                        <span className="text-gray-400 text-xs">
                                          {new Date(
                                            reply.created_at
                                          ).toLocaleString()}
                                        </span>
                                      </div>
                                      <p className="text-white text-sm mt-1">
                                        {reply.replies}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Moderators & Community Rules */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-4">
          <div className="sticky top-[76px] h-fit space-y-4">
            {/* Community Rules */}
            <div className="bg-gray-700 p-4 rounded-md">
              <h2 className="text-xl font-bold text-white mb-2">
                Community Rules
              </h2>
              <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                <p className="text-white whitespace-pre-line text-sm">
                  {community_data.rules}
                </p>
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
                      <span className="text-white text-sm">
                        {moderator.name}
                      </span>
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
