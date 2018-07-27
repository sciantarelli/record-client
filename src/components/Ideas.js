import React from 'react';
import requireAuth from './requireAuth';

const Ideas = () => {
  return (
      <div>Someday You'll Have Ideas</div>
  )
};

export default requireAuth(Ideas);