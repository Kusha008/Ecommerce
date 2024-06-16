import React from 'react'
import Header from '../components/Layout/Header.jsx'
import Footer from '../components/Layout/Footer.jsx'
import Carousal from '../components/Layout/Carousal.jsx'
import ProductSlider from '../components/Layout/ProductSlider.jsx'


function HomePage() {
  return (
    <div>
      {/* <Header/> */}
      <Carousal/>
      <ProductSlider/>
      {/* <Footer/> */}
    </div>
  )
}

export default HomePage;