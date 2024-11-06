import React from 'react'

const Search = ({ setParPage, searchValue, setSearchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => {
          setParPage(parseInt(e.target.value))
        }}
        className="px-4 py-2 hover:border-indigo-500 outline-none border border-gray-400 rounded-md text-black shadow-md focus:shadow-indigo-200"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="px-4 py-2 hover:border-indigo-500 focus:border-indigo-500 outline-none text-[#383737] border border-gray-400 rounded-md shadow-md focus:shadow-indigo-200"
        placeholder="search"
      />
    </div>
  )
}

export default Search
