import React from 'react';

const FilterPanel = ({ onFilterChange }) => {
  return (
    <div className="filter-panel">
      
      <button onClick={() => onFilterChange({ type: 'TOGGLE_CLASS', payload: 'class_name' })}>
        Select all
      </button>
    </div>
  );
};

export default FilterPanel;
