import React from 'react';
import CriteriaEditor from './CriteriaEditor';
import ProgramEditor from './ProgramEditor';
import './TopBar.css';

const TopBar = ({
  criteria,
  programs,
  updateCriterionWeight,
  addCriterion,
  removeCriterion,
  updateProgramName,
  updateProgramNotes,
  addProgram,
  removeProgram
}) => {
  return (
    <div className="top-bar">
      <div className="top-bar-section">
        <CriteriaEditor
          criteria={criteria}
          updateCriterionWeight={updateCriterionWeight}
          addCriterion={addCriterion}
          removeCriterion={removeCriterion}
        />
      </div>

      <div className="top-bar-section">
        <ProgramEditor
          programs={programs}
          updateProgramName={updateProgramName}
          updateProgramNotes={updateProgramNotes}
          addProgram={addProgram}
          removeProgram={removeProgram}
        />
      </div>
    </div>
  );
};

export default TopBar;
