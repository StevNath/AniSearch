import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Page/home';

function Header() {
  return (
    <header style={{ background: '#4B0082', padding: '10px', color: 'white' }}>
      <h1>My App Header</h1>
      <nav>
        <Routes style={{ marginRight: '10px', color: 'white' }}>
        <Route path='/home' element={<Home />} />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
