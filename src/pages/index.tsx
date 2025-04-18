import db from '../lib/dbConnect'
import collections from "../lib/Collections";
import Layout from "../components/layout/Layout";
import Blog from "./home"
import { withSessionSsr } from "@/lib/sessions";


export const getServerSideProps = withSessionSsr(async ({ req }) => {

  await db.connect()



  const blogsData = await db.get().collection(collections.BLOG_COLLECTIONS).find().toArray()

  const blogs = blogsData.map(blog => ({
    ...blog,
    _id: blog._id.toString(),
    blogs: blog.blogs.map(subBlog => ({
      ...subBlog,
      _id: subBlog._id.toString() 
    }))
  }))

  console.log("all blogs", blogs);




  const user = req.session.user;
  return { props: { user, blogs } }

})

export default function Home({ user, blogs }) {
  return (
    <div>
      <Layout user={user} >
        <Blog user={user} blogs={blogs} />
      </Layout>
    </div>
  );
}
