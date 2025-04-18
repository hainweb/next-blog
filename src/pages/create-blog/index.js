import React, { useState } from 'react'
import { withSessionSsr } from '../../lib/sessions';
import Layout from '../../components/layout/Layout'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';


export const getServerSideProps = withSessionSsr(async ({ req }) => {

    const user = req.session.user

    if (!user) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false
            }

        }
    }
    return {
        props: { user }
    }

})

const index = ({ user }) => {

    const [step, setStep] = useState(1);

    const router = useRouter()

    const [formdata, setFormData] = useState({
        title: '',
        author: '',
        tag: '',
        content: ''
    })

    const handleChange = (e) => {

        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        }

        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('form', formdata);

        axios.post('/api/add-blog', { formdata, id: user._id }).then((response) => {
            if (response.data.status) {
                router.push('/my-blogs')
            }
        })

    }
    return (
        <Layout user={user}>
            <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Blog</h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Step 1: Title & Author */}
                        {step === 1 && (
                            <>
                                <div>
                                    <label className="block text-gray-600 mb-1" htmlFor="title">Title</label>
                                    <input
                                        value={formdata.title}
                                        onChange={handleChange}
                                        name="title"
                                        type="text"
                                        placeholder="Enter blog title"
                                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1" htmlFor="author">Author Name</label>
                                    <input
                                        value={formdata.author}
                                        onChange={handleChange}
                                        name="author"
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="flex justify-between mt-6">
                                    <Link href="/">
                                        <button
                                            type="button"
                                            className="text-yellow-500 px-3 py-1 cursor-pointer rounded-lg hover:bg-yellow-500 hover:text-white transition"
                                        >
                                            Cancel
                                        </button>
                                    </Link>

                                    <button
                                        type="button"
                                        className="text-blue-500 px-3 cursor-pointer py-1 rounded-lg hover:bg-blue-500 hover:text-white transition"
                                        onClick={() => setStep(2)}
                                    >
                                        Next
                                    </button>
                                </div>

                            </>
                        )}

                        {/* Step 2: Content & Tags */}
                        {step === 2 && (
                            <>
                                <div>
                                    <label className="block text-gray-600 mb-1" htmlFor="content">Content</label>
                                    <textarea
                                        value={formdata.content}
                                        onChange={handleChange}
                                        name="content"
                                        rows="5"
                                        placeholder="Write your blog content..."
                                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1" htmlFor="tags">Tags / Category</label>
                                    <input
                                        value={formdata.tag}
                                        onChange={handleChange}
                                        name="tag"
                                        type="text"
                                        placeholder="e.g. Tech, Life, Coding"
                                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    Submit
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default index   
