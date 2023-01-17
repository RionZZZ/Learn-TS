import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Login from './Views/Login';
import Home from './Views/Home';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/" element={<span>404</span>}></Route> */}
      </Routes>
    </HashRouter>
  )
}

export default App;