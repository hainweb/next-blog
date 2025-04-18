
import db from '../../lib/dbConnect'
import collections from '../../lib/collections'
import { ObjectId } from 'mongodb'
import Layout from '../../components/layout/Layout'
import { withSessionSsr } from '../../lib/sessions'

export const getServerSideProps = withSessionSsr(async (content) => {
    await db.connect()
    const { req, params } = content
    const { id } = content.params
    console.log("id is ", id);

    const blogData = await db.get().collection(collections.BLOG_COLLECTIONS).findOne({ "blogs._id": new ObjectId(id) },
        {
            projection: { "blogs.$": 1, userId: 1 }
        }
    )

    const blog = blogData.blogs[0]
    blog._id = blog._id.toString();

    console.log("blog is ", blog);

    const userData = await db.get().collection(collections.USER_COLLECTIONS).findOne({ _id: new ObjectId(blogData.userId) })

    const user = {
        Name: userData.Name,
        Mobile: userData.Mobile
    }
    console.log("User", user);

    const sesUser = req.session.user;

    return {
        props: {
            sesUser, user, blog
        }
    }




})


const blog = ({ sesUser, user, blog }) => {

    return (
        <div>
            <Layout user={sesUser}>
            <div className="p-4 md:p-18 bg-gray-100 ">
            <div className="border-t border-l border-r border-gray-300 rounded-t-xl max-w-[300px] bg-white">

            <h2 className=" font-semibold text-gray-800  ml-5">{user.Name}</h2>
            <p className="text-xs text-gray-500 mb-1  ml-5">{user.Mobile}</p>
            </div>
            <div

                    className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-3 text-sm hover:shadow-md transition"
                >


                    {/* Blog Content */}
                    <h2 className="font-semibold text-gray-800 ">{blog.title}</h2>
                    <p className="text-xs text-gray-500 mb-1 ">{blog.author}</p>
                    <p className="text-gray-600 line-clamp-2">{blog.content}</p>
                    <div className="text-xs text-blue-500 mt-2">{blog.tag}</div>
                </div>
                </div>
            </Layout>
        </div>
        
    )
}

export default blog
