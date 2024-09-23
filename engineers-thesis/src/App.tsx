import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import FrontPage from './pages/front-page/front-page';
import './App.css'
import NotFound from './pages/not-found/not-found';
import Error from './pages/error/error';
import Loading from './pages/loading/loading';
import RaportByCode from './features/raport-by-code/raport-by-code';
import RaportByLocation from './features/raport-by-location/raport-by-location';

function App() {
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/raport/:code" element={<RaportByCode />} />
          <Route path="/raport/:lat/:lng" element={<RaportByLocation />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
