import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/Nav'
import Home from './pages/Home';
import Workspaces from './pages/Workspaces';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={<Home />}
          >
        </Route>
        <Route
          path='/workspaces'
          element={<Workspaces />}
          >
        </Route>
      </Routes>
    </>
  )
}

export default App
