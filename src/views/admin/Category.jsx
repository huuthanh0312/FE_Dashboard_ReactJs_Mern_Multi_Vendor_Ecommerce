import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEdit, FaHome, FaImage, FaTrash } from 'react-icons/fa'
import { IoIosArrowForward, IoMdCloseCircle } from 'react-icons/io'
import { ClipLoader, PropagateLoader } from 'react-spinners'
import { overrideStyle } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getCategories, messageClear } from '../../store/Reducers/categoryReducer'
import toast from 'react-hot-toast'
import Search from '../components/Search'

const Category = () => {
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage, categories, totalCategory } = useSelector(
    (state) => state.category
  ) //state loader

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setsearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)
  const [imageShow, setImage] = useState('')

  const [state, setState] = useState({
    name: '',
    image: ''
  })

  // function image
  const imageHandle = (e) => {
    let files = e.target.files

    if (files.length > 0) {
      console.log(files)
      setImage(URL.createObjectURL(files[0]))
      setState({ ...state, image: files[0] })
    }
  }
  // func add category
  const add_category = (e) => {
    e.preventDefault()
    dispatch(addCategory(state))
  }

  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
      //remove data old create success
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear()) //message clear function reudx
      setState({
        name: '',
        image: ''
      })
      setImage('')
    }
  }, [errorMessage, successMessage, dispatch])

  useEffect(() => {
    // object
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue
    }
    dispatch(getCategories(obj))
  }, [searchValue, currentPage, parPage, dispatch])

  return (
    <div className="px-2 md:px-5 pb-5 ">
      {/*  Breadcrumbs */}
      <div className="flex justify-start text-center text-[#383737] font-bold items-center px-5 py-2 mb-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link className="inline-flex text-sm font-medium text-gray-700 hover:text-blue-600 ">
              <FaHome className="w-4 h-4 me-1 pt-[1px]" />
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <IoIosArrowForward size={18} className="block mx-1 text-gray-400" />
              <Link className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 ">
                Category
              </Link>
            </div>
          </li>
        </ol>
      </div>
      {/* End Breadcrumbs  */}
      <div className="flex lg:hidden justify-between items-center mb-5 px-5 py-2 bg-white rounded-md shadow-md hover:shadow-indigo-200">
        <h1 className="text-[#383737] font-bold text-lg uppercase">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-1 font-semibold text-blue-500 rounded-md shadow-md border-blue-500 border-2 my-2 hover:bg-blue-500 hover:text-white"
        >
          Add
        </button>
      </div>
      <div className="w-full flex flex-wrap ">
        <div className="w-full lg:w-8/12 p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white">
          {/* search */}
          <Search
            setParPage={setParPage}
            setSearchValue={setsearchValue}
            searchValue={searchValue}
          />
          <div className="relative overflow-x-auto pt-4 ">
            <table className="w-full text-sm text-left rounded-md shadow-md">
              <thead className="uppercase border bg-[#E5E5E5]">
                <tr>
                  <th className="py-3 px-4" scope="col">
                    No
                  </th>
                  <th className="py-3 px-4" scope="col">
                    Image
                  </th>
                  <th className="py-3 px-4" scope="col">
                    Name
                  </th>
                  <th className="py-3 px-4" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-100 border">
                    <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                      {i + 1}
                    </td>
                    <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                      <img className="w-[45px] h-[45px]" src={d.image} alt="" />
                    </td>
                    <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.name}
                    </td>
                    <td scope="row" className="py-1 px-4 whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link className="p-[6px] border-2 border-yellow-500 rounded-md shadow-md hover:text-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-110">
                          <FaEdit></FaEdit>
                        </Link>
                        <Link className="p-[6px] border-2 border-red-500 rounded-md shadow-md hover:shadow-lg hover:text-red-600 hover:shadow-red-500/50 hover:scale-110">
                          <FaTrash></FaTrash>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* end table */}
          {/* Paginantion */}
          <div className="flex w-full justify-between items-center mt-2 ">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-semibold text-[#383737]">{currentPage}</span>
              to {parPage}
              <span className="font-semibold text-[#383737]"> 10</span> of
              <span className="font-semibold text-[#383737]"> 100</span> Entries
            </span>
            {totalCategory <= parPage ? (
              ''
            ) : (
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalCategory}
                parPage={parPage}
                showItem={3}
              />
            )}
          </div>
          {/* end Paginantion */}
        </div>
        {/*  */}
        <div
          className={`w-[320px] lg:w-4/12 translate-x-100 fixed lg:relative lg:right-0 ${
            show ? 'right-0' : '-right-[340px]'
          } z-[40] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5 relative">
            {/* Overlay only displays when loading */}
            {loader && (
              <div className="absolute inset-0 bg-gray-50 bg-opacity-70 flex justify-center items-center z-10">
                <ClipLoader color="#4A90E2" size={30} />
              </div>
            )}
            <div className="h-screen lg:h-auto p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white">
              <h1 className="font-bold text-xl p-2 mb-4 w-full text-center border-b bg-gray-200 uppercase">
                Add Category
              </h1>
              <div
                onClick={() => setShow(false)}
                className="lg:hidden block border-2 border-red-500 fixed top-1.5 -ml-3 rounded-full shadow-md hover:bg-gray-200 hover:text-red-500 hover:shadow-red-800 hover:scale-105"
              >
                <IoMdCloseCircle size={22} />
              </div>
              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-1 mb-3 text-[#383737]">
                  <label htmlFor="name" className="text-[#383737] font-semibold">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={state.name}
                    disabled={loader ? true : false}
                    onChange={(e) => setState({ ...state, name: e.target.value })}
                    className="px-4 py-2 border-gray-400 focus:border-blue-500 outline-none border rounded-md"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className={`flex justify-center items-center flex-col h-[238px] font-semibold cursor-pointer w-full  
                      ${
                        imageShow
                          ? 'border-2 border-gray-500 shadow-lg hover:shadow-indigo-200'
                          : 'border border-gray-400 border-dashed hover:border-blue-500'
                      }`}
                  >
                    {imageShow ? (
                      <img src={imageShow} alt="" className="h-full w-full" />
                    ) : (
                      <>
                        <span>
                          <FaImage size={24} />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>

                  <input
                    onChange={imageHandle}
                    disabled={loader ? true : false}
                    type="file"
                    name="image"
                    className="hidden"
                    id="image"
                  />
                  <button
                    disabled={loader ? true : false}
                    className="w-full px-7 py-2 flex justify-center items-center font-semibold text-blue-500 rounded-md shadow-md
                     border-blue-500 border-2 my-3 hover:bg-blue-500 hover:text-white hover:shadow-indigo-200 gap-1"
                  >
                    {loader ? <ClipLoader size={18} color="#3c57ee" /> : ''}
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  )
}

export default Category
