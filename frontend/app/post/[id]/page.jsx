"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Commet } from "react-loading-indicators";
const token = `Bearer ${localStorage.getItem("access_token")}`;

const PostPage = () => {
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    useEffect(() => {
        if(!id) return;
        console.log(id);

        const fetchPost = async () => {
            try {
                const res = fetch(`http://localhost:8000/api/posts/${id}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token || ""
                    }
                })

                const data = await (await res).json();
                console.log(data);
            }
            catch(err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [])

    if(loading) return (
        <div className="flex justify-center items-center h-[80vh]">
          <Commet size="small" color="#cac8ff" />
        </div>
      );
    return (<div>dsfds</div>);
}

export default PostPage;