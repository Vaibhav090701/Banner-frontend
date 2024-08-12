import React, { useState, useEffect } from 'react';
import Banner from './component/Banner/Banner';
import Dashboard from './component/Dashboard/Dashboard';
import axios from 'axios';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [bannerData, setBannerData] = useState({ visible: false, description: '', timer: 0, link: '' });

  useEffect(() => {
    axios.get('/api/banner')
      .then(response => setBannerData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banner" element={<Banner/>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;