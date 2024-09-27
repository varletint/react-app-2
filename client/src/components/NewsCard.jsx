import { Link } from "react-router-dom";

export default function NewsCard({ post }) {
  return (
    // <div className='div'>
    <div className='card stacked'>
      <div>
        <Link className='img-content' to={`/post/${post.slug}`}>
          <img className='news__img' src={post.image} alt={post.title} />
          <div>
            <p className='post__title'>{post.title}</p>
          </div>
        </Link>
      </div>
      {/* </div> */}
    </div>
  );
}
