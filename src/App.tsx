import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import ItemDetails from './pages/ItemDetails';

import EditAndAddTask from './pages/EditAndAddTask';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/addTask' element={<AddTask />} /> */}
          <Route path='/item/:id' element={<ItemDetails />} />
          {/* <Route path='/editTask/:id' element={<EditTask />} /> */}
          <Route path="/addTask/editTask/:id" element={<EditAndAddTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
