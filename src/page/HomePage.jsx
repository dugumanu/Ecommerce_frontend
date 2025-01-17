import React from 'react'
import SearchFilterAndCategoryList from '../component/HomePage/SearchFilterAndCategoryList'
import CategoryProduct from '../component/HomePage/CategoryProduct'
import Footer from '../component/common/Footer'

export default function HomePage() {
  return (
    <div>
      <SearchFilterAndCategoryList/>
      <CategoryProduct/>
      <Footer/>
    
    </div>
  )
}
