import { useParams } from "next/navigation";
const id = localStorage.getItem("UserId");
const token = `Bearer ${localStorage.getItem("access_token")}`;
export const getComments = async (postId) => {
  const res = await fetch(
    `http://localhost:8000/api/posts/${postId}/comments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  const data = await res.json();

  if (res.ok) return data;
  return false;
};

export const createComment = async (postId, comment) => {
  if (!comment) return false;
  if (!postId) return false;
  console.log(comment);
  const res = await fetch(
    `http://localhost:8000/api/posts/${postId}/comments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ user_id: id, comments: comment }),
    }
  );
  const data = await res.json();

  if (res.ok) return data;
  return false;
};

export const getSinglePost = async (postId) => {
  const res = await fetch(`http://localhost:8000/api/posts/${postId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const data = await res.json();

  if (res.ok) return data;
  return false;
};

export const replyComment = async (commentId, replies) => {
  if (!replies) return false;
  if (!commentId) return false;
  const res = await fetch(`http://localhost:8000/api/comments/${commentId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ user_id: id, replies: replies }),
  });
  const data = await res.json();
  if (data) return data;
  return false;
};

export const getReplies = async (commentId) => {
  const res = await fetch(`http://localhost:8000/api/comments/${commentId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const data = await res.json();
  if (res.ok) return data;
  return false;
};
