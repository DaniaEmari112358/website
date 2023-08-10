


const q = `
{
  user(username:"DanDio") {
    blogHandle
    publicationDomain
    publication {
      author
      title
      posts(page: 0) {
        cuid
        slug
        title
        isActive
        dateAdded
        brief
        readTime
      }
    }
  }
}
`

export async function getArticleData() {
    const response = await fetch("https://api.hashnode.com/", {
      body: JSON.stringify({ query: q }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST"
   });

   const result = await response.json();

   const {data} = result

   const {user} = data

   const {blogHandle, publicationDomain} = user

   const {publication} = user

   const {posts} = publication

   return {blogHandle, publicationDomain, posts}
}
