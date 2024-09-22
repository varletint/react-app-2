import { Link } from "react-router-dom";

export default function NewsCard({ post }) {
  return (
    // <div className='div'>
    <div className='card stacked'>
      <div>
        <img className='news__img' src={post.image} alt={post.title} />
        <Link className='img-content' to={`/post/${post.slug}`}>
          <div>
            <p className='post__title'>{post.slug}</p>
          </div>
        </Link>
      </div>
      {/* </div> */}
    </div>
  );
}
