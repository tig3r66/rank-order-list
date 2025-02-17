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
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="help-modal-content"
      overlayClassName="help-modal-overlay"
    >
      <h2>Residency Rank Order List Builder - Help</h2>
      <div className="help-body">
        <ul>
          <li>
            <strong>Criteria Editor</strong>:  
            <br />
            Adjust criteria weights, add or remove criteria. The pie chart shows the distribution of total weights by category. Hover over a slice for details.
          </li>
          <li>
            <strong>Program Editor</strong>:  
            <br />
            Enter hospital names and notes. Use the “Remove” button to delete a hospital.
          </li>
          <li>
            <strong>Score Input</strong>:  
            <br />
            Enter numeric scores for each (Program × Criterion). Clicking an input highlights its content for easier editing.
          </li>
          <li>
            <strong>Ranking</strong>:  
            <br />
            Displays computed weighted scores and approximate 95% confidence intervals.
          </li>
          <li>
            <strong>Dashboard</strong>:
            <ul className="help-sublist">
              <li>
                <em>Bar Chart with 95% CI</em>: Shows weighted scores with error bars.
              </li>
              <li>
                <em>Monte Carlo Simulation</em>: Generates a histogram from random draws around each program’s inputs, showing the distribution of weighted scores.
              </li>
            </ul>
          </li>
          <li>
            <strong>Export/Import Session</strong>:  
            <br />
            Use “Export Session” to download your data as JSON, or “Import Session” to load a saved session.
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
