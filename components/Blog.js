// function Blog({ posts }) {
//     console.log(posts)
//     return (
//         <>
//         Blog
//         </>
//     )
//   }
  
//   // This function gets called at build time on server-side.
//   // It won't be called on client-side, so you can even do
//   // direct database queries.
//   export async function getStaticProps() {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library
//     const res = await fetch('http://localhost:3000/users')
//     // .then(response => response.json())
//     // .then(data => console.log(data))

//     const posts = await res.json()
  
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//       props: {
//         posts,
//       },
//     }
//   }
  
//   export default Blog