// src/components/ProgramEditor.js
import React, { useState } from 'react';
import './ProgramEditor.css';

const pastelProgramColors = [
  '#ffe8e8', '#e8ffe8', '#e8f4ff', '#fff5e8', '#f5e8ff', '#ffecf0'
];

function ProgramEditor({
  programs,
  updateProgramName,
  updateProgramNotes,
  addProgram,
  removeProgram
}) {
  const [newProgramName, setNewProgramName] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const getProgramColor = (index) => pastelProgramColors[index % pastelProgramColors.length];

  const handleAddProgram = () => {
    if (newProgramName.trim()) {
      const newProgram = {
        id: 'prog_' + Date.now(),
        name: newProgramName,
        notes: '',
        scores: {}
      };
      addProgram(newProgram);
      setNewProgramName('');
    } else {
      alert('Please enter a program name.');
    }
  };

  return (
    <div className="program-editor">
      <div className="header-row">
        <h3>Program Editor</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isOpen && (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {programs.map((prog, index) => (
              <li
                key={prog.id}
                className="program-item"
                style={{ backgroundColor: getProgramColor(index) }}
              >
                <div className="program-header-row">
                  <label>Program Name:</label>
                  <input
                    type="text"
                    value={prog.name}
                    onChange={(e) => updateProgramName(prog.id, e.target.value)}
                  />
                  <button onClick={() => removeProgram(prog.id)}>Remove</button>
                </div>
                <textarea
                  rows="2"
                  placeholder="Notes..."
                  value={prog.notes || ''}
                  onChange={(e) => updateProgramNotes(prog.id, e.target.value)}
                />
              </li>
            ))}
          </ul>

          <div className="new-program">
            <input
              type="text"
              placeholder="New Program Name"
              value={newProgramName}
              onChange={(e) => setNewProgramName(e.target.value)}
            />
            <button onClick={handleAddProgram}>Add Program</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProgramEditor;
