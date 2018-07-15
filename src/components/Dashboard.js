import React from 'react';
import requireAuth from './requireAuth';

const Dashboard = () => {
  return (
      <div>Dashboard</div>
  )
};

export default requireAuth(Dashboard);