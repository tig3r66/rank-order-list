// src/components/Dashboard.js
import React from 'react';
import WeightedScoresHorizontalErrorBarChart from './WeightedScoresHorizontalErrorBarChart';
import MonteCarloChart from './MonteCarloChart';
import './Dashboard.css';

const Dashboard = ({ programsData }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="chart-section">
        <h3>Weighted Scores (Horizontal) with 95% CI</h3>
        <WeightedScoresHorizontalErrorBarChart programsData={programsData} />
      </div>

      <div className="chart-section">
        <h3>Monte Carlo Simulation (All Programs, Stacked, n=10,000)</h3>
        <MonteCarloChart programsData={programsData} />
      </div>
    </div>
  );
};

export default Dashboard;
