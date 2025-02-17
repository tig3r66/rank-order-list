// src/components/Ranking.js
import React from 'react';
import './Ranking.css';

const Ranking = ({ programsData }) => {
  const sorted = [...programsData].sort((a, b) => b.weightedScore - a.weightedScore);
  const scores = sorted.map(p => p.weightedScore);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  const getHeatmapColor = (score) => {
    if (maxScore === minScore) return '#fff';
    const fraction = (score - minScore) / (maxScore - minScore);
    const rStart = 255, gStart = 221, bStart = 221;
    const rEnd = 221, gEnd = 255, bEnd = 221;
    const r = Math.round(rStart + (rEnd - rStart) * fraction);
    const g = Math.round(gStart + (gEnd - gStart) * fraction);
    const b = Math.round(bStart + (bEnd - bStart) * fraction);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="ranking">
      <h2>Ranking</h2>
      <div className="ranking-table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Program</th>
              <th>Weighted Score</th>
              <th>95% CI (Lower)</th>
              <th>95% CI (Upper)</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((prog, index) => {
              const bgColor = getHeatmapColor(prog.weightedScore);
              return (
                <tr key={prog.id}>
                  <td>{index + 1}</td>
                  <td>{prog.name}</td>
                  <td style={{ backgroundColor: bgColor }}>{prog.weightedScore.toFixed(2)}</td>
                  <td>{prog.lowerCI.toFixed(2)}</td>
                  <td>{prog.upperCI.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
