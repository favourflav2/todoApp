import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import ItemDetails from './pages/ItemDetails';
import EditTask from './pages/EditTask';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addTask' element={<AddTask />} />
          <Route path='/item/:id' element={<ItemDetails />} />
          <Route path='/editTask/:id' element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
