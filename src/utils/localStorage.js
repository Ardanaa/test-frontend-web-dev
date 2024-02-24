const localStorageKey = 'readNews'
const saveReadNews = (clickedNews) => {
  const readNews = JSON.parse(localStorage.getItem(localStorageKey)) || []
  const updatedReadNews = [...readNews, clickedNews]

  // Remove duplicates based on news URL
  const uniqueReadNews = Array.from(new Set(updatedReadNews.map(news => news.url)))
    .map(url => updatedReadNews.find(news => news.url === url))

  localStorage.setItem(localStorageKey, JSON.stringify(uniqueReadNews))
}

export default saveReadNews