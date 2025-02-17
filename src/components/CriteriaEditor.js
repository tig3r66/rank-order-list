import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './CriteriaEditor.css';

const pastelBoxColors = [
  '#e8f4ff', '#fdf4f4', '#f6fdf4', '#fdfcf4', '#f4fdfc', '#fcf4fd'
];
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

function CriteriaEditor({
  criteria,
  updateCriterionWeight,
  addCriterion,
  removeCriterion
}) {
  const [isOpen, setIsOpen] = useState(true);

  // Build stable category order
  const categories = useMemo(() => {
    const catOrder = [];
    criteria.forEach((item) => {
      if (!catOrder.includes(item.category)) {
        catOrder.push(item.category);
      }
    });
    return catOrder;
  }, [criteria]);

  // Summation for Pie Chart
  const pieData = useMemo(() => {
    if (!criteria.length) return [];
    const sums = {};
    criteria.forEach(c => {
      const w = parseFloat(c.weight) || 0;
      sums[c.category] = (sums[c.category] || 0) + w;
    });
    return Object.entries(sums).map(([cat, val]) => ({ name: cat, value: val }));
  }, [criteria]);

  // No more "id" in user input. We auto-generate it.
  const [newCriterion, setNewCriterion] = useState({
    label: '',
    category: '',
    weight: '1.0'
  });

  const handleAddCriterion = () => {
    if (newCriterion.label && newCriterion.category) {
      // Generate an ID behind the scenes
      const generatedId = 'crit_' + Date.now();
      addCriterion({
        id: generatedId,
        label: newCriterion.label,
        category: newCriterion.category,
        weight: newCriterion.weight
      });
      // Reset
      setNewCriterion({ label: '', category: '', weight: '1.0' });
    } else {
      alert('Please fill in both label and category.');
    }
  };

  // Example label rendering
  const renderCustomLabel = (props) => {
    const { cx, cy, midAngle, outerRadius, percent, value } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        <tspan x={x} dy="0">{value}</tspan>
        <tspan x={x} dy="1.2em">{(percent * 100).toFixed(1)}%</tspan>
      </text>
    );
  };

  return (
    <div className="criteria-editor">
      <div className="header-row">
        <h3>Criteria Editor</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isOpen && (
        <>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={375}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={75}
                  isAnimationActive={true}
                  animationDuration={800}
                  labelLine={true}
                  label={renderCustomLabel}
                >
                  {pieData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {categories.map((catName, catIndex) => {
            const boxColor = pastelBoxColors[catIndex % pastelBoxColors.length];
            const catItems = criteria.filter((c) => c.category === catName);
            return (
              <div key={catName} className="category-box" style={{ backgroundColor: boxColor }}>
                <h4>{catName}</h4>
                <div className="criteria-grid">
                  {catItems.map((critItem) => (
                    <div key={critItem.id} className="criterion-item">
                      <strong>{critItem.label}</strong>
                      <div className="weight-row">
                        <span>Weight:</span>
                        <input
                          type="text"
                          value={critItem.weight}
                          onChange={(e) => updateCriterionWeight(critItem.id, e.target.value)}
                          onFocus={(e) => e.target.select()}
                          className="weight-input"
                        />
                        <button onClick={() => removeCriterion(critItem.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="new-criterion">
            <h4>Add New Criterion</h4>
            <div className="new-criterion-fields">
              {/* We removed the ID field. Just label, category, weight. */}
              <input
                type="text"
                placeholder="Label"
                value={newCriterion.label}
                onChange={(e) => setNewCriterion({ ...newCriterion, label: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={newCriterion.category}
                onChange={(e) => setNewCriterion({ ...newCriterion, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Weight"
                value={newCriterion.weight}
                onChange={(e) => setNewCriterion({ ...newCriterion, weight: e.target.value })}
                onFocus={(e) => e.target.select()}
                className="weight-input"
              />
              <button onClick={handleAddCriterion}>Add Criterion</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CriteriaEditor;
