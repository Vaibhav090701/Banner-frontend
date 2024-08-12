
import React from 'react';

const Countdown = ({ seconds }) => {
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return <div>{formatTime(seconds)}</div>;
};

export default Countdown;
