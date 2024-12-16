import React from "react"
import Header from "../../features/header/header"
import Map from '../../features/map/map'
import './front-page.css'

function FrontPage() {
    return (
      <>
        <Header />
        <Map />
        <Footer />
      </>
    )
}

function Footer() {
  return (
    <footer>
      <p>@ Arkadiusz Zając</p>
    </footer>
  )
}

export default FrontPage
  