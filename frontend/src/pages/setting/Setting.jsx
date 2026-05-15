import React, { useEffect, useState } from "react"
import { getPosts } from "@/api/post.api"
import PostList from "@/components/posts/PostList"
import { getFavorites } from "@/utils/favoriteStorage"
import "./Setting.scss"

const Setting = () => {
  const [favoritePosts, setFavoritePosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts()
      const favoriteIds = getFavorites()

      const filtered = posts.filter((post) => favoriteIds.includes(post.id))
      setFavoritePosts(filtered)
    }

    fetchData()
  }, [])

  return (
    <section className="page">
      <div className="inner">
        <h2>MY PICKS</h2>

        {favoritePosts.length === 0 ? (
          <p className="empty-text">아직 찜한 선수가 없습니다.</p>
        ) : (
          <PostList posts={favoritePosts} />
        )}
      </div>
    </section>
  )
}

export default Setting