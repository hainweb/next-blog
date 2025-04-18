
import Link from 'next/link'
import React from 'react'



const blog = ({ blogs }) => {

    return (
        <div className='p-5 min-h-screen bg-gray-100'>

            <div className='w-full flex justify-center'>
                <div className='w-1/2 ml-auto flex justify-center'>
                    <Link href="/create-blog">
                        <button className=' rounded-md  px-4 py-2 font-bold bg-blue-500 cursor-pointer hover:bg-blue-600'>Create a blog</button>
                    </Link>
                </div>
            </div>

            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 sm:p-8 md:p-18 bg-gray-100 ">
                {blogs.length >= 1 ?
                    <>
                        {blogs.map((subBlog) => (
                            subBlog.blogs.map((item) => (

                                <Link href={`blog/${item._id}`} key={item._id}>
                                    <div
                                        key={item._id}
                                        className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-3 text-sm hover:shadow-md transition"
                                    >
                                        {/* Blog Content */}
                                        <h2 className="font-semibold text-gray-800 truncate">{item.title}</h2>
                                        <p className="text-xs text-gray-500 mb-1 truncate">{item.author}</p>
                                        <p className="text-gray-600 line-clamp-2">{item.content}</p>
                                        <div className="text-xs text-blue-500 mt-2">{item.tag}</div>
                                    </div>
                                </Link>
                            ))
                        ))}
                    </>
                    :
                    <div className='flex flex-col items-center justify-center '>
                        <h2 className="font-semibold text-gray-800 ">There is no blogs</h2>
                     
                    </div>
                }


            </div>

        </div >
    )
}

export default blog
