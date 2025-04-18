import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import db from '../../lib/dbConnect'
import collections from '../../lib/Collections'
import { withSessionSsr } from '../../lib/sessions'
import axios from 'axios'
import Link from 'next/link'

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    await db.connect()

    const user = req.session.user

    if (!user) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    const userId = req.session.user._id

    let userBlogs = await db.get().collection(collections.BLOG_COLLECTIONS).findOne({ userId })
    let blogs = []
    if (userBlogs && userBlogs.blogs) {
        blogs = userBlogs.blogs.map(blog => ({
            ...blog,
            _id: blog._id.toString()
        }))
    }
    //  console.log("User blogs", userBlogs);

    return {
        props: {
            blogs,
            user
        }
    }



})

const index = ({ blogs: initialBlogs, user }) => {
    const [blogs, setBlogs] = useState(initialBlogs)
    const handleDelete = async (_id) => {
        if (window.confirm("Are you sure want to delete")) {

            let deleteBlog = await axios.post('/api/delete-blog', { _id, userId: user._id })
            if (deleteBlog.data.status) {
                setBlogs(prev => prev.filter(blog => blog._id !== _id))
            }
        }
    }

    return (
        <Layout user={user}>
            <div className='min-h-screen bg-gray-100'>
            <h2 className="font-semibold text-gray-800 text-center p-5">My blog's</h2>
                <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 sm:p-8 md:p-8 bg-gray-100 ">
                    {blogs.length >= 1 ?
                        <>
                          
                            {blogs.map((item) => (
                                <div
                                    key={item._id}
                                    className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-3 text-sm hover:shadow-md transition"
                                >
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700"
                                        aria-label="Delete blog"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>

                                    {/* Blog Content */}
                                    <h2 className="font-semibold text-gray-800 truncate">{item.title}</h2>
                                    <p className="text-xs text-gray-500 mb-1 truncate">{item.author}</p>
                                    <p className="text-gray-600 line-clamp-2">{item.content}</p>
                                    <div className="text-xs text-blue-500 mt-2">{item.tag}</div>
                                </div>


                            ))}
                        </>
                        :
                        <div className='flex flex-col items-center justify-center '>
                            <h2 className="font-semibold text-gray-800 ">You don't have any blogs</h2>
                            <Link href="/create-blog">
                                <button className=' rounded-md mt-3 px-4 py-2 text-xs md:text-base font-bold bg-blue-500 cursor-pointer hover:bg-blue-600'>Create a blog</button>
                            </Link>
                        </div>
                    }


                </div>


            </div>
        </Layout>
    )
}

export default index
