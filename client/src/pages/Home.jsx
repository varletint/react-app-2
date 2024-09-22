import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  console.log(posts);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <link rel='icon' type='image/svg+xml' href='/vite.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Vite + React</title>
      </Helmet>
      <div className='container'>
        <div className='news-card-grid'>
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
