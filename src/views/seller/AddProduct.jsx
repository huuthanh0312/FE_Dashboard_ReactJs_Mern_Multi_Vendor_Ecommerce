import React, { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward, IoMdCloseCircle, IoMdImages } from 'react-icons/io'
import { Link } from 'react-router-dom'

const AddProduct = () => {
  const categories = [
    { id: 1, name: 'Sports' },
    { id: 2, name: 'Tshirt' },
    { id: 3, name: 'Mobile' },
    { id: 4, name: 'Computer' },
    { id: 5, name: 'Wacth' },
    { id: 6, name: 'Pant' }
  ]

  const [state, setState] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    brand: '',
    stock: ''
  })
  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  //search anh choose category
  const [cateShow, setCateShow] = useState(false)
  const [category, setCategory] = useState('')
  const [allCategory, setAllCategory] = useState(categories)
  const [searchValue, setSearchValue] = useState('')

  //search category chuan hoa chuoi thanh chuoi thuong sau do tim
  const categorySearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
      setAllCategory(srcValue)
    } else {
      setAllCategory(categories)
    }
  }

  // image handle show many
  const [images, setImages] = useState([])
  const [imageShow, setImageShow] = useState([])

  const imageHandle = (e) => {
    console.log(e.target.files)
    const files = e.target.files
    const length = files.length
    if (length > 0) {
      setImages([...images, ...files])
      let imageUrl = []
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) })
      }
      setImageShow([...imageShow, ...imageUrl])
    }
  }
  // change Image
  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow
      let tempImages = images

      tempImages[index] = img
      tempUrl[index] = { url: URL.createObjectURL(img) }

      setImageShow([...tempUrl])
      setImages([...tempImages])
    }
  }

  // remove Image
  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i)
    const filterImageUrl = imageShow.filter((img, index) => index !== i)

    setImageShow(filterImageUrl)
    setImages(filterImage)
  }
  return (
    <div>
      <div className="px-2 lg:px-5 pb-6 ">
        {/*  Breadcrumbs */}
        <div className="flex justify-start text-center text-[#383737] font-bold items-center px-5 py-2 mb-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="/seller/dashboard"
                className="inline-flex text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <FaHome className="w-4 h-4 me-1 pt-[1px]" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <IoIosArrowForward size={18} className="block mx-1 text-gray-400" />
                <Link className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">
                  Add Product
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs  */}
        <div className="w-full p-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
          <div className="flex justify-between items-center text-[#383737] pb-1 border-b-2">
            <h1 className="text-xl font-semibold">Add Product</h1>
            <Link
              to="/seller/all-product"
              className="px-6 py-1 font-semibold text-blue-500 rounded-md shadow-md border-blue-500 border-[2px] my-2 hover:bg-blue-500 hover:text-white"
            >
              All Product
            </Link>
          </div>
          {/* table */}
          <div className="py-2">
            <form>
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#383737]">
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="name" className="font-semibold">
                    Product Name
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.name}
                    type="text"
                    name="name"
                    id="name"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="Product Name"
                  />
                </div>
                {/* end item */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="brand" className="font-semibold">
                    Product Brand
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.barnd}
                    type="text"
                    name="brand"
                    id="brand"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="Product Brand"
                  />
                </div>
                {/* end item */}
              </div>
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#383737]">
                {/* category */}
                <div className="flex flex-col w-full gap-1 relative">
                  <label htmlFor="category" className="font-semibold">
                    Category
                  </label>
                  <input
                    readOnly
                    onClick={() => setCateShow(!cateShow)}
                    value={category}
                    type="text"
                    name="category"
                    id="category"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md cursor-pointer"
                    placeholder="Select Category"
                  />
                  <div
                    className={`absolute top-[101%] w-full transition-all bg-white hover:shadow-indigo-200 ${
                      cateShow ? 'scale-100' : 'scale-0'
                    }`}
                  >
                    <div className="border rounded-md shadow-md border-gray-200 bg-gradient-to-b from-gray-200 to-white">
                      <div className="w-full p-4 fixed ">
                        <input
                          onChange={categorySearch}
                          type="text"
                          value={searchValue}
                          className="w-full px-3 py-1 border-gray-400 focus:border-indigo-500 outline-none border bg-transparent rounded-md overflow-hidden"
                          placeholder="search"
                        />
                      </div>
                      <div className="pt-14"></div>
                      <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll p-4 font-semibold">
                        {allCategory.map((c, i) => (
                          <span
                            onClick={() => {
                              setCateShow(false)
                              setCategory(c.name)
                              setSearchValue('')
                              setAllCategory(categories)
                            }}
                            className={`w-full hover:bg-indigo-500 p-2 cursor-pointer ${
                              category === c.name && 'bg-indigo-500'
                            }`}
                          >
                            {c.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end item */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="stock" className="font-semibold">
                    Product Stock
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.stock}
                    type="text"
                    name="stock"
                    id="stock"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="Product Stock"
                  />
                </div>
                {/* end item */}
              </div>
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#383737]">
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="price" className="font-semibold">
                    Price
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.price}
                    type="number"
                    name="price"
                    id="price"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="Price"
                  />
                </div>
                {/* end item */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="discount" className="font-semibold">
                    Discount
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.discount}
                    type="number"
                    min="0"
                    max="100"
                    name="discount"
                    id="discount"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="% Discount"
                  />
                </div>
                {/* end item */}
              </div>
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#383737]">
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="description" className="font-semibold">
                    Description
                  </label>
                  <textarea
                    onChange={inputHandle}
                    value={state.description}
                    name="description"
                    id="price"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="Description ..."
                    cols={10}
                    rows={5}
                  ></textarea>
                </div>
                {/* end item */}
              </div>
              {/* image */}
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-6 gap-3 w-full mb-4 pt-2">
                {/* images show */}
                {imageShow.map((img, i) => (
                  <div className="h-[180px] relative rounded-md shadow-lg border sm:hover:scale-105 hover:shadow-indigo-200">
                    <label htmlFor={i} className="flex justify-center items-center">
                      <img src={img.url} alt="" className="h-[175px] mx-auto my-auto rounded-md" />
                    </label>
                    {/* change image */}
                    <input
                      type="file"
                      onChange={(e) => changeImage(e.target.files[0], i)}
                      id={i}
                      className="hidden"
                    />
                    {/* end */}
                    <span
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 p-1 z-10 cursor-pointer border-2 border-red-500 rounded-full shadow-lg text-red-900 hover:scale-105 hover:shadow-red-300"
                    >
                      <IoMdCloseCircle size={18} />
                    </span>
                  </div>
                ))}
                {/* end images show */}
                <label
                  htmlFor="image"
                  className="flex justify-center items-center flex-col bg-[#e5e5e5] h-[180px] cursor-pointer border border-gray-400 border-dashed hover:border-indigo-500 w-full text-[#383737] rounded-md shadow-lg"
                >
                  <span>
                    <IoMdImages size={36} />
                  </span>
                  <span className="font-semibold">Select Image</span>
                </label>

                <input
                  multiple
                  type="file"
                  onChange={imageHandle}
                  name="image"
                  id="image"
                  className="hidden"
                />
              </div>
              <div>
                <button className="w-full md:w-auto px-7 py-2 font-semibold  rounded-md shadow-md my-2 bg-blue-900 text-white hover:scale-y-105 hover:shadow-indigo-200">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
