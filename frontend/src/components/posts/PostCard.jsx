import React, { useState } from "react"
import { isFavoritePost, toggleFavorite } from "@/utils/favoriteStorage"
import { Link } from "react-router-dom"
import PostTag from "./PostTag"
import { CATEGORY_COLORS } from "../../hooks/useCategoryColor"

const PostCard = ({ post }) => {
  const categoryColor = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.ETC
  const [isFavorite, setIsFavorite] = useState(isFavoritePost(post.id))

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    toggleFavorite(post.id)
    setIsFavorite((prev) => !prev)
  }

  return (
    <Link to={`/app/posts/${post.id}`} className="post-card">
      <article>
        <div className="post-card-body">
          <p className="post-category" style={{ color: categoryColor }}>
            {post.category}
          </p>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content">{post.content}</p>
          <div className="tags">
            {(post.tags || []).map((tag, i) => (
              <PostTag key={i} tag={tag} />
            ))}
          </div>
        </div>

        <div className="img-wrap">
          {/* 🔥 여기 추가 */}
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            {isFavorite ? "♥" : "♡"}
          </button>

          <img
            src={post.thumbnail || "/images/placeholder.png"}
            alt={post.title}
          />
        </div>
      </article>
    </Link>
  )
}

export default PostCard
