// src/components/HelpModal.js
import React from 'react';
import Modal from 'react-modal';
import './HelpModal.css';

Modal.setAppElement('#root');

const HelpModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Help / Tutorial"
      className="help-modal-content"
      overlayClassName="help-modal-overlay"
    >
      <h2>Residency Rank Order List Builder - Help</h2>
      <div className="help-body">
        <ul>
          <li>
            <strong>Criteria Editor</strong>:  
            Adjust criteria weights, add or remove criteria. The pie chart shows the distribution of total weights for each category. Hover over a slice for details.
          </li>
          <li>
            <strong>Program Editor</strong>:  
            Enter your hospital names and notes. The hospital name input is limited in width. Use the “Remove” button to delete a hospital.
          </li>
          <li>
            <strong>Score Input</strong>:  
            Enter a numeric score for each (Program × Criterion). When you click an input, it highlights for easier editing.
          </li>
          <li>
            <strong>Ranking</strong>:  
            Displays computed weighted scores with approximate 95% confidence intervals.
          </li>
          <li>
            <strong>Dashboard</strong>:
            <ul className="help-sublist">
              <li>
                <em>Bar Chart with 95% CI</em>: Shows weighted scores and error bars.
              </li>
              <li>
                <em>Monte Carlo Simulation</em>: Generates a histogram from random draws (n=10,000) around each program’s inputs, estimating the distribution of weighted scores. The mean is shown in the title for each program.
              </li>
            </ul>
          </li>
          <li>
            <strong>Export/Import Session</strong>:  
            Use “Export Session” to download your current data as a JSON file, or “Import Session” to load a previously saved file.
          </li>
        </ul>
      </div>
      <div className="help-footer">
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default HelpModal;
