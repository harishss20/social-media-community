import { useParams } from "next/navigation";
const id = localStorage.getItem("UserId");
const token = `Bearer ${localStorage.getItem("access_token")}`;

export const joinSingleCommunity = async (name) => {
  console.log("Join");
  const res = await fetch("http://localhost:8000/api/join-community/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ user_id: id, community_name: name }),
  });

  if (res.ok) return true;
  return false;
};

export const leaveCommunity = async (name) => {
  console.log("Join");
  const res = await fetch("http://localhost:8000/api/join-community/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ user_id: id, community_name: name }),
  });

  const data = await res.json();
  console.log(data);

  if (res.ok) return true;
  return false;
};

export const createPost = async ({ title, text_field, media_file, name }) => {
  console.log(title, text_field, media_file, name);
  const res = await fetch("http://localhost:8000/api/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      title: title,
      text_field: text_field,
      media_file: media_file,
      community: name,
    }),
  });
  console.log(await res.json());
  if (res.ok) return true;
  return false;
};

export const updateLike = async (postId, action) => {
  const res = await fetch(`http://localhost:8000/api/posts/${postId}/like/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(action),
  });

  if (res.ok) return true;
  return false;
};

export const updateSave = async (postId) => {
  const res = await fetch(
    `http://localhost:8000/api/posts/${postId}/toggle-save/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  const data = await res.json();
  console.log(data);
};

export const postShare = async (postId) => {
  const res = await fetch(`http://localhost:8000/api/post/${postId}/share/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  console.log(data);
  return data.generated_link;
};

export const editCommunityPage = async (id, fields) => {
  return fetch(`http://localhost:8000/api/community/?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(fields),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      return e.error;
    });
};

export const DeleteCommunityPage = async (id, name) => {
  return fetch(`http://localhost:8000/api/community/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ user_id: id, name: name }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return e.error;
    });
};

export const searchCommunity = async (name) => {
  return fetch(`http://localhost:8000/api/community/search?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ name: name }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return e.error;
    });
};

export const createCommunity = async ({ data }) => {
  console.log({ data: data });
  return fetch("http://localhost:8000/api/community/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ...data,
      owner: id,
    }),
  });
};
