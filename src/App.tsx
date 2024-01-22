import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import ItemDetails from './pages/ItemDetails';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addTask' element={<AddTask />} />
          <Route path='/item/:id' element={<ItemDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
