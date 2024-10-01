import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/sort.css'; // Import the CSS for sorting

const Sort = ({ onClose }) => {
  const handleSortClick = () => {
    // Add sort functionality here
    onClose(); // Close the sort box when sort is applied
  };

  return (
    <div className="sort-container">
      <button className="close-sort-btn" onClick={onClose}>Close</button>
      <div className="search-bar-sort">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search by PM/Name" />
      </div>

      <div className="sort-group">
        <h3>Name</h3>
        <label>
          <input type="radio" name="name" value="firstName" />
          First Name
        </label>
        <label>
          <input type="radio" name="name" value="lastName" />
          Last Name
        </label>
      </div>

      <div className="sort-group">
        <h3>Status</h3>
        <label>
          <input type="radio" name="status" value="active" />
          Active
        </label>
        <label>
          <input type="radio" name="status" value="deactivated" />
          Deactivated
        </label>
        <label>
          <input type="radio" name="status" value="referral" />
          Referral
        </label>
      </div>

      <div className="sort-group">
        <h3>Documentation</h3>
        <label>
          <input type="radio" name="documentation" value="completed" />
          Completed
        </label>
        <label>
          <input type="radio" name="documentation" value="pending" />
          Pending
        </label>
      </div>

      <div className="sort-options">
        <label>
          <input type="checkbox" name="restore-default" />
          Restore to default
        </label>
        <div className="sort-buttons">
          <button className="sort-btn" onClick={handleSortClick}>
            Sort
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sort;


