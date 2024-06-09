import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function FooterComp() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div>
        <div>
          <div>
          <Link to="/" className='self-center whitespace-nowrap text-xl sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>Ashley's</span>
          Blog
        </Link>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComp