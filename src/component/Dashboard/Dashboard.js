
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBannerData, updateBannerData } from '../Api';
import './Dashboard.css';

const Dashboard = () => {
  const [bannerData, setBannerData] = useState({
    visible: false,
    description: '',
    timer: 0,
    link: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    getBannerData()
      .then(response => setBannerData(response.data))
      .catch(error => console.error('Error fetching banner data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBannerData(bannerData)
      .then(response => {
        alert('Banner updated successfully');
        navigate('/banner');
      })
      .catch(error => console.error('Error updating banner data:', error));
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>
          Visible:
          <input
            type="checkbox"
            name="visible"
            checked={bannerData.visible}
            onChange={handleChange}
          />
        </label>
        <label className='label'>
          Description:
          <input
            type="text"
            name="description"
            value={bannerData.description}
            onChange={handleChange}
          />
        </label>
        <label className='label'>
          Timer (seconds):
          <input
            type="number"
            name="timer"
            value={bannerData.timer}
            onChange={handleChange}
          />
        </label>
        <label className='label'>
          Link:
          <input
            type="text"
            name="link"
            value={bannerData.link}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Banner</button>
      </form>
    </div>
  );
};

export default Dashboard;
