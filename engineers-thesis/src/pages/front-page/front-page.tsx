import Header from "../../features/header/header"
import Map from '../../features/map/map'
import './front-page.css'

function FrontPage() {
    return (
      <>
        <Header />
        <main>
          <Map />
        </main>
        <footer>
          <p>@ Arkadiusz Zając</p>
        </footer>
      </>
    )
}

export default FrontPage
  