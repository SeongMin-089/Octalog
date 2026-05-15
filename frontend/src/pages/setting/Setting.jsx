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

      const mappedPosts = posts.map((post) => ({
        id: post.id,
        category: post.category,
        title: post.title,
        content: post.content,
        tags: post.tags || [],
        thumbnail: post.imageUrl || "",
      }))

      const filtered = mappedPosts.filter((post) =>
        favoriteIds.includes(post.id)
      )

      setFavoritePosts(filtered)
    }

    fetchData()
  }, [])

  return (
  <section className="page post-section post-all setting-page">
    <div className="inner">
      <div className="post-header">
        <h2 className="post-title">MY PICKS</h2>
      </div>

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