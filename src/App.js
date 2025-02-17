// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import ScoreInput from './components/ScoreInput';
import Ranking from './components/Ranking';
import Dashboard from './components/Dashboard';
import HelpModal from './components/HelpModal';
import './App.css';

const initialCriteria = [
  { id: 'supportSystems', label: 'Support Systems & Family', category: 'Personal & Lifestyle Factors', weight: '1.0' },
  { id: 'localCulture', label: 'Local Culture & City Life', category: 'Personal & Lifestyle Factors', weight: '1.0' },
  { id: 'weather', label: 'Weather & Outdoor Activities', category: 'Personal & Lifestyle Factors', weight: '1.0' },
  { id: 'costOfLiving', label: 'Cost of Living', category: 'Personal & Lifestyle Factors', weight: '1.0' },
  { id: 'commute', label: 'Commute & Transportation', category: 'Personal & Lifestyle Factors', weight: '1.0' },
  { id: 'residentHappiness', label: 'Resident Happiness', category: 'Resident Experience & Well-Being', weight: '1.0' },
  { id: 'collegiality', label: 'Collegiality', category: 'Resident Experience & Well-Being', weight: '1.0' },
  { id: 'callSchedule', label: 'Call Schedule & Workload', category: 'Resident Experience & Well-Being', weight: '1.0' },
  { id: 'workLifeBalance', label: 'Work-Life Balance & Burnout', category: 'Resident Experience & Well-Being', weight: '1.0' },
  { id: 'mentorship', label: 'Resident Experience & Well-Being', category: 'Mentorship & Networking', weight: '1.0' },
  { id: 'caseVolume', label: 'Case Volume', category: 'Training & Clinical Experience', weight: '1.0' },
  { id: 'caseComplexity', label: 'Case Complexity/Diversity', category: 'Training & Clinical Experience', weight: '1.0' },
  { id: 'operativeExposure', label: 'Operative Exposure', category: 'Training & Clinical Experience', weight: '1.0' },
  { id: 'programReputation', label: 'Program Reputation', category: 'Career Outcomes & Prestige', weight: '1.0' },
  { id: 'jobOpportunities', label: 'Job Opportunities', category: 'Career Outcomes & Prestige', weight: '1.0' },
  { id: 'gutFeel', label: 'Gut Feeling', category: 'Gut Feeling', weight: '1.0' },
];

const initialPrograms = [
  { id: 'program1', name: 'General Hospital', notes: '', scores: {} },
  { id: 'program2', name: 'City Medical Center', notes: '', scores: {} }
];

function App() {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [programs, setPrograms] = useState(initialPrograms);
  const [showHelp, setShowHelp] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('residencyAppData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.criteria && parsed.programs) {
          setCriteria(parsed.criteria);
          setPrograms(parsed.programs);
        }
      } catch (err) {
        console.error('Error parsing saved data:', err);
      }
    }
  }, []);

  // Autosave
  useEffect(() => {
    const data = { criteria, programs };
    localStorage.setItem('residencyAppData', JSON.stringify(data));
  }, [criteria, programs]);

  // Ensure each program has a score for every criterion
  useEffect(() => {
    setPrograms(prev =>
      prev.map(prog => {
        const updatedScores = { ...prog.scores };
        criteria.forEach(c => {
          if (updatedScores[c.id] === undefined) {
            updatedScores[c.id] = '0';
          }
        });
        return { ...prog, scores: updatedScores };
      })
    );
  }, [criteria]);

  // Weighted Score
  const computeScores = (program) => {
    let total = 0;
    criteria.forEach(c => {
      const numericScore = parseFloat(program.scores[c.id]) || 0;
      const numericWeight = parseFloat(c.weight) || 0;
      total += numericScore * numericWeight;
    });
    return {
      weightedScore: total,
      lowerCI: total * 0.95,
      upperCI: total * 1.05
    };
  };

  const programsWithComputedScores = programs.map(p => ({
    ...p,
    ...computeScores(p)
  }));

  // Export/Import
  const exportSession = () => {
    const data = { criteria, programs };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'session.json';
    link.click();
  };

  const importSession = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.criteria && data.programs) {
          setCriteria(data.criteria);
          setPrograms(data.programs);
        } else {
          alert('Invalid session file.');
        }
      } catch (err) {
        alert('Error reading file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <Header onShowHelp={() => setShowHelp(true)} />

      <TopBar
        criteria={criteria}
        programs={programs}
        updateCriterionWeight={(id, w) => {
          setCriteria(prev => prev.map(c => c.id === id ? { ...c, weight: w } : c));
        }}
        addCriterion={(crit) => setCriteria(prev => [...prev, crit])}
        removeCriterion={(id) => {
          setCriteria(prev => prev.filter(c => c.id !== id));
          setPrograms(prev => prev.map(p => {
            const newScores = { ...p.scores };
            delete newScores[id];
            return { ...p, scores: newScores };
          }));
        }}
        updateProgramName={(id, name) => {
          setPrograms(prev => prev.map(p => p.id === id ? { ...p, name } : p));
        }}
        updateProgramNotes={(id, notes) => {
          setPrograms(prev => prev.map(p => p.id === id ? { ...p, notes } : p));
        }}
        addProgram={(prog) => {
          const scores = {};
          criteria.forEach(c => { scores[c.id] = '0'; });
          setPrograms(prev => [...prev, { ...prog, scores }]);
        }}
        removeProgram={(id) => {
          setPrograms(prev => prev.filter(p => p.id !== id));
        }}
      />

      <ScoreInput
        criteria={criteria}
        programs={programs}
        updateProgramScore={(pid, cid, val) => {
          setPrograms(prev => prev.map(p =>
            p.id === pid ? { ...p, scores: { ...p.scores, [cid]: val } } : p
          ));
        }}
        exportSession={exportSession}
        importSession={importSession}
      />

      <Ranking programsData={programsWithComputedScores} />

      <Dashboard programsData={programsWithComputedScores} />

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <Footer />
    </div>
  );
}

export default App;
