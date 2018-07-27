import React from 'react';
import requireAuth from './requireAuth';

const Dashboard = () => {
  return (
      <div>Some Fancy Dashboard</div>
  )
};

export default requireAuth(Dashboard);