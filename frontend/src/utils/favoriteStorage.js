const FAVORITE_KEY = 'octalog_favorites'

export const getFavorites = () => {
  const saved = localStorage.getItem(FAVORITE_KEY)

  if (!saved) return []

  return JSON.parse(saved)
}

export const isFavoritePost = (postId) => {
  const favorites = getFavorites()
  return favorites.includes(postId)
}

export const toggleFavorite = (postId) => {
  const favorites = getFavorites()

  const nextFavorites = favorites.includes(postId)
    ? favorites.filter((id) => id !== postId)
    : [...favorites, postId]

  localStorage.setItem(FAVORITE_KEY, JSON.stringify(nextFavorites))

  return nextFavorites
}