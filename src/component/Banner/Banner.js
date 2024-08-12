import React, { useState, useEffect } from 'react';
import Countdown from '../CountDown/CountDown';
import { getBannerData } from '../Api';
import './Banner.css';

const Banner = () => {
  const [bannerData, setBannerData] = useState({
    visible: false,
    description: '',
    timer: 0,
    link: ''
  });
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Fetch banner data from backend
    getBannerData()
      .then(response => {
        setBannerData(response.data);
        setTimeRemaining(response.data.timer);
      })
      .catch(error => console.error('Error fetching banner data:', error));
  }, []);

  useEffect(() => {
    if (bannerData.visible && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [bannerData.visible, timeRemaining]);

  return (
    bannerData.visible && (
      <div className='banner'>
        {bannerData.link ? (
          bannerData.link.startsWith('http') ? (
            <a href={bannerData.link} target="_blank" rel="noopener noreferrer">
              {bannerData.description}
            </a>
          ) : (
            <a href={bannerData.link}>
              {bannerData.description}
            </a>
          )
        ) : (
          <span>{bannerData.description}</span>
        )}

        <div className='countdown'>
          <Countdown seconds={timeRemaining} />
        </div>
      </div>
    )
  );
};

export default Banner;