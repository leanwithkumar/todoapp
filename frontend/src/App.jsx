import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cantfind from './Cantfind';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Cantfind />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
