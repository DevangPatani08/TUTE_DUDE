import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} Personal Finance Tracker</p>
      </div>
    </footer>
  )
}

export default Footer;