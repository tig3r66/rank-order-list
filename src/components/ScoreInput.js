// src/components/ScoreInput.js

import React, { useState } from 'react';
import './ScoreInput.css';

const ScoreInput = ({
  criteria,
  programs,
  updateProgramScore,
  exportSession,
  importSession
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="score-input">
      <div className="header-row">
        <h2>Score Input</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isOpen && (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Criterion</th>
                  {programs.map(prog => (
                    <th key={prog.id}>{prog.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map(crit => (
                  <tr key={crit.id}>
                    <td>{crit.label}</td>
                    {programs.map(prog => (
                      <td key={prog.id}>
                        <input
                          type="text"
                          value={prog.scores[crit.id] || '0'}
                          onChange={(e) => updateProgramScore(prog.id, crit.id, e.target.value)}
                          onFocus={(e) => e.target.select()}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="score-input-export">
            <button onClick={exportSession}>Export Session</button>
            <div className="import-section">
              <div style={{ marginTop: '0.5rem' }}>
                <label htmlFor="importSession">Import Session:</label>
              </div>
              <input
                id="importSession"
                type="file"
                accept=".json"
                onChange={importSession}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ScoreInput;
