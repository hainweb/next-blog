import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Register = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Mobile: '',
    Password: ''
  })
  const [message, setMessage] = useState('')

  const router = useRouter()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await axios.post("/api/auth/register", formData)

    if (response.data.status) {

      router.push('/')
    } else {
      setMessage(response.data.message)
    }

  }

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen '>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col p-12 border border-orange-500 rounded-xl bg-gray-900'>

            <h1 className='text-center text-2xl font-bold' >Register</h1>
            <input onChange={handleChange} className='border rounded rounded-md px-5 pl-3 py-2 mt-5' type="text" placeholder='Name' name='Name' value={formData.Name} />
            <input onChange={handleChange} className='border rounded rounded-md px-5 pl-3 py-2 mt-5' type="number" placeholder='Mobile' name='Mobile' value={formData.Mobile} />
            <input onChange={handleChange} className='border rounded rounded-md px-5 pl-3 py-2 mt-5' type="password" placeholder='Password' name='Password' value={formData.Password} />
            {message ?
              <p className='text-sm text-red-500 mt-2'>{message}</p>
              : ''
            }
            <button type='submit' className='mt-6 bg-blue-500 p-2 rounded rounded-md '>Submit</button>
            <Link href="/auth/login" >
              <p className='mt-3 text-blue-500 text-center text-sm cursor-pointer'>Already have any account?</p>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Register
