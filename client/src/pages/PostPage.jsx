import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);
  return (
    <section className='postpage bg-red-200'>
      <main>
        <div dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
      </main>
    </section>
  );
}
