import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/filter.css'; 

const Filter = ({ onClose }) => {
  return (
    <div className="filter-container">
      <button className="close-filter-btn" onClick={onClose}>Close</button>
      <div className="search-bar-filter">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search by PM/Name" />
      </div>

      <div className="filter-group">
        <h3>Service Type</h3>
        <label><input type="checkbox" /> Housing Consultation</label>
        <label><input type="checkbox" /> Housing Transition</label>
        <label><input type="checkbox" /> Housing Sustaining</label>
        <label><input type="checkbox" /> Moving Expenses</label>
      </div>

      <div className="filter-group">
        <h3>City</h3>
        <label><input type="checkbox" /> Benroji</label>
        <label><input type="checkbox" /> Brooklyn</label>
        <label><input type="checkbox" /> Fridey</label>
        <label><input type="checkbox" /> St. Ckloud</label>
      </div>

      <div className="filter-group">
        <h3>Country</h3>
        <label><input type="checkbox" /> Bemidji</label>
        <label><input type="checkbox" /> Brooklyn</label>
        <label><input type="checkbox" /> Fridey</label>
        <label><input type="checkbox" /> St. Ckloud</label>
      </div>

      <div className="filter-group">
        <h3>Insurance</h3>
        <label><input type="checkbox" /> MA</label>
        <label><input type="checkbox" /> Hennpin Health</label>
        <label><input type="checkbox" /> UCare</label>
        <label><input type="checkbox" /> Private Pay</label>
      </div>
    </div>
  );
};

export default Filter;

