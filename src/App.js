import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Cart, CreateItem, Header, MainContainer } from './Components';
import { AnimatePresence } from 'framer-motion'
function App() {
  return (
    <>
      <AnimatePresence>
        <Header key={1} />
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/createItem' element={<CreateItem />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
