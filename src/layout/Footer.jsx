import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="">
      <div className="w-full justify-center text-center mx-auto py-1">
        <span className="text-xs text-gray-400 ">
          <p>© {year} by ThanhNguyen™</p>
        </span>
      </div>
    </footer>
  )
}

export default Footer
