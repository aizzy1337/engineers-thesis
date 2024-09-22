import { useEffect } from 'react'
import './App.css'
import Header from './features/header/header'
import Map from './features/map/map'
import { jsonResponseConverter } from './utils/jsonResponseConverter'

function App() {

  useEffect(() => {
    const getWeatherConditions = async () => {
      console.log("test");
      const response = await fetch("/weather/50/20/2024-09-16/2024-09-17");
      console.log(await response.json());
      console.log(jsonResponseConverter(response));
    }

    getWeatherConditions();
  }, []);

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
