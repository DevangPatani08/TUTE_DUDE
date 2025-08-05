import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-dark text-white py-3 mt-auto'>
      <div className="container text-center">
        <p className="mb-0">© {new Date().getFullYear()} Finance Application by Devang Patani</p>
      </div>
    </footer>
  )
}

export default Footer;
