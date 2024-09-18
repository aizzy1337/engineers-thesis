import './App.css'
import Header from './features/header/header'
import Map from './features/map/map'

function App() {
  return (
    <div className="container">
      <Header />
      
      <main>
        <Map />
      </main>

      <footer>
        <p>@ Arkadiusz Zając</p>
      </footer>
    </div>
  )
}

export default App
