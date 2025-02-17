import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ErrorBar
} from 'recharts';
import html2canvas from 'html2canvas';

const WeightedScoresHorizontalErrorBarChart = ({ programsData }) => {
  const sorted = [...programsData].sort((a, b) => b.weightedScore - a.weightedScore);
  const chartData = sorted.map(prog => {
    const score = parseFloat(prog.weightedScore.toFixed(2));
    const leftErr = parseFloat((score - prog.lowerCI).toFixed(2));
    const rightErr = parseFloat((prog.upperCI - score).toFixed(2));
    return { name: prog.name, score, errorVal: [rightErr, leftErr] };
  });

  const exportChartAsImage = () => {
    const chartDiv = document.getElementById('horizontal-bar-chart');
    if (!chartDiv) return;
    html2canvas(chartDiv).then(canvas => {
      const link = document.createElement('a');
      link.download = 'horizontal_bar_chart.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '0.5rem' }}>
      <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
        <button onClick={exportChartAsImage}>Export Chart</button>
      </div>
      <div id="horizontal-bar-chart" style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis type="number" tick={{ fill: '#222' }} />
            <YAxis dataKey="name" type="category" tick={{ fill: '#222' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', color: '#222' }}
              itemStyle={{ color: '#222' }}
            />
            <Bar dataKey="score" fill="#82ca9d">
              <ErrorBar dataKey="errorVal" direction="x" strokeWidth={2} stroke="#222" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeightedScoresHorizontalErrorBarChart;
