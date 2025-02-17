// src/components/MonteCarloChart.js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';

const MonteCarloChart = ({ programsData }) => {
  if (!programsData.length) return null;

  // Sort descending by Weighted Score
  const sorted = [...programsData].sort((a, b) => b.weightedScore - a.weightedScore);

  // For each program, generate the distribution & bin it
  const results = sorted.map((prog) => {
    const mean = prog.weightedScore;
    const std = (prog.upperCI - prog.lowerCI) / 4;
    const draws = [];
    for (let i = 0; i < 10000; i++) {
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      draws.push(mean + z * std);
    }
    const binCount = 20;
    const minVal = Math.min(...draws);
    const maxVal = Math.max(...draws);
    let binSize = (maxVal - minVal) / binCount;
    if (binSize === 0) binSize = 1;

    const bins = Array(binCount).fill(0).map((_, i) => ({ bin: i, count: 0 }));
    draws.forEach(val => {
      let idx = Math.floor((val - minVal) / binSize);
      if (idx >= binCount) idx = binCount - 1;
      bins[idx].count++;
    });

    const chartData = bins.map((b, i) => {
      const xVal = minVal + (i + 0.5) * binSize;
      return { x: xVal.toFixed(2), freq: b.count };
    });

    return { programName: prog.name, chartData, minVal, maxVal, mean };
  });

  // Determine the global min/max across all programs for a shared X scale
  const globalMin = Math.min(...results.map(r => r.minVal));
  const globalMax = Math.max(...results.map(r => r.maxVal));

  const exportChartAsImage = () => {
    const chartDiv = document.getElementById('monte-carlo-all');
    if (!chartDiv) return;
    html2canvas(chartDiv).then(canvas => {
      const link = document.createElement('a');
      link.download = 'monte_carlo_all.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '0.5rem' }}>
      <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
        <button onClick={exportChartAsImage}>Export Chart</button>
      </div>
      <div id="monte-carlo-all" style={{ width: '100%' }}>
        {results.map((r, idx) => (
          <div key={r.programName} style={{ width: '100%', height: '250px', marginBottom: '1rem' }}>
            {/* Show mean in the chart title, no line in the chart */}
            <h4>
              {idx + 1}. {r.programName} (Mean ~ {r.mean.toFixed(2)})
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={r.chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  dataKey="x"
                  domain={[globalMin, globalMax]}
                  type="number"
                  tick={{ fill: '#222' }}
                />
                <YAxis tick={{ fill: '#222' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', color: '#222' }}
                  itemStyle={{ color: '#222' }}
                />
                <Bar dataKey="freq" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonteCarloChart;
