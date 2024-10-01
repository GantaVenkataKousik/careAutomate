


// import React, { useState } from 'react';
// import { FaSearch, FaPlus, FaFilter, FaSort, FaCalendarAlt, FaBars, FaEnvelope, FaFileAlt } from 'react-icons/fa';
// import '../styles/tenants1.css';
// import '../styles/filter.css'; // Import the filter styles
// import '../styles/sort.css';
// import AddTenantPopup from './AddTenantPopup';
// import tenantImage from '../images/tenant.jpg'; // Use the correct import for your local image

// const Tenants = () => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [isFilterVisible, setIsFilterVisible] = useState(false); // State to toggle filter visibility
//   const [isSortVisible, setIsSortVisible] = useState(false); // State to toggle sort visibility

//   const handleAddTenantClick = () => {
//     setIsPopupVisible(!isPopupVisible);
//   };

//   const toggleFilter = () => {
//     setIsFilterVisible(!isFilterVisible); // Toggle filter visibility
//     if (!isFilterVisible) {
//       setIsSortVisible(false); // Close sort box if filter is being opened
//     }
//   };

//   const toggleSort = () => {
//     setIsSortVisible(!isSortVisible); // Toggle sort visibility
//     setIsFilterVisible(true); // Ensure filter box is visible when sort is opened
//   };

//   // Dummy tenant data
//   const tenants = Array(25).fill({
//     name: 'John Doe',
//     mobile: '123-456-7890',
//     id: 'Tenant123',
//     image: tenantImage, // Use the local image
//   });

//   return (
//     <div className="tenants-page">
//       <h1>Tenants</h1>

//       <div className="tenants-header">
//         <div className="search-add-container">
//           <div className="search-bar">
//             <FaSearch className="search-icon" />
//             <input type="text" placeholder="Search....." />
//           </div>

//           <button className="add-tenant-btn" onClick={handleAddTenantClick}>
//             <FaPlus className="plus-icon" /> Add New Tenant
//           </button>
//         </div>
//       </div>
//       {/* <TenantPopup isVisible={isPopupVisible} onClose={handleAddTenantClick} /> */}

//       <div className="filters">
//         <button className="filter-btn" onClick={toggleFilter}>
//           <FaFilter className="filter-icon" /> Filter
//         </button>
//         <button className={`sort-btn ${isFilterVisible ? 'active' : ''}`} onClick={toggleSort}>
//           <FaSort className="sort-icon" /> Sort By
//         </button>
//       </div>
// <br></br>
//       {/* Filter Box */}
//       <div className={`filter-container ${isFilterVisible ? 'show' : ''}`}>
//         <div className="search-bar-filter">
//           <FaSearch className="search-icon1" />
//           <input type="text" placeholder="Search by PM/Name" />
//         </div>
//         <div className="filter-group">
//           <h3>Service Type</h3>
//           <label><input type="checkbox" /> Housing Consultation</label>
//           <label><input type="checkbox" /> Housing Transition</label>
//           <label><input type="checkbox" /> Housing Sustaining</label>
//           <label><input type="checkbox" /> Moving Expenses</label>
//         </div>
//         <div className="filter-group">
//           <h3>City</h3>
//           <label><input type="checkbox" /> Benroji</label>
//           <label><input type="checkbox" /> Brooklyn</label>
//           <label><input type="checkbox" /> Fridey</label>
//           <label><input type="checkbox" /> St. Ckloud</label>
//         </div>
//         <div className="filter-group">
//           <h3>Country</h3>
//           <label><input type="checkbox" /> Bemidji</label>
//           <label><input type="checkbox" /> Brooklyn</label>
//           <label><input type="checkbox" /> Fridey</label>
//           <label><input type="checkbox" /> St. Ckloud</label>
//         </div>
//         <div className="filter-group">
//           <h3>Insurance</h3>
//           <label><input type="checkbox" /> MA</label>
//           <label><input type="checkbox" /> Hennpin Health</label>
//           <label><input type="checkbox" /> UCare</label>
//           <label><input type="checkbox" /> Private Pay</label>
//         </div>
//       </div>
      
//       {/* Sort Box */}
//       <div className={`sort-container ${isSortVisible ? 'show' : ''}`}>
//         <div className="search-bar-sort">
//           <FaSearch className="search-icon1" />
//           <input type="text" placeholder="Search by PM/Name" />
//         </div>
//         <div className="sort-group">
//           <h3>Name</h3>
//           <label><input type="radio" name="name" /> First Name</label>
//           <label><input type="radio" name="name" /> Last Name</label>
//         </div>
//         <div className="sort-group">
//           <h3>Status</h3>
//           <label><input type="radio" name="status" /> Active</label>
//           <label><input type="radio" name="status" /> Deactivated</label>
//           <label><input type="radio" name="status" /> Referral</label>
//         </div>
//         <div className="sort-group">
//           <h3>Documentation</h3>
//           <label><input type="radio" name="documentation" /> Completed</label>
//           <label><input type="radio" name="documentation" /> Pending</label>
//         </div>
//         <div className="sort-options">
//           <label><input type="checkbox" /> Restore to Default</label>
//           <div className="sort-buttons">
//             <button className="sort-btn">Sort</button>
//             <button className="cancel-btn" onClick={toggleSort}>Cancel</button>
//           </div>
//         </div>
//       </div>

//       {/* Tenant Profiles Grid */}
//       <div className={`tenant-grid ${isFilterVisible && isSortVisible ? 'shift-right-both' : isFilterVisible ? 'shift-right-filter' : ''}`}>
//         {tenants.map((tenant, index) => (
//           <div key={index} className="tenant-box">
//             <div className="tenant-info">
//               <h3>{tenant.name}</h3>
//               <p>{tenant.mobile}</p>
//               <p>{tenant.id}</p>
//               <div className="tenant-icons">
//                 <FaCalendarAlt className="tenant-icon" />
//                 <FaBars className="tenant-icon" />
//                 <FaEnvelope className="tenant-icon" />
//                 <FaFileAlt className="tenant-icon" />
//               </div>
//             </div>
//             <div className="tenant-image">
//               <img src={tenant.image} alt="Tenant" />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Popup for Adding New Tenant */}
//       {isPopupVisible && (
//         <div className="popup">
//           <h2>Add New Tenant</h2>
//           <button className="close-btn" onClick={handleAddTenantClick}>Close</button>
//           {/* Add tenant form goes here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tenants;

import React, { useState } from 'react';
import { FaSearch, FaPlus, FaFilter, FaSort, FaCalendarAlt, FaBars, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import '../styles/tenants1.css';
import '../styles/filter.css'; // Import the filter styles
import '../styles/sort.css';
import AddTenantPopup from './AddTenantPopup';
import tenantImage from '../images/tenant.jpg'; // Use the correct import for your local image

const Tenants = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State to toggle filter visibility
  const [isSortVisible, setIsSortVisible] = useState(false); // State to toggle sort visibility

  const handleAddTenantClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle filter visibility
    if (!isFilterVisible) {
      setIsSortVisible(false); // Close sort box if filter is being opened
    }
  };

  const toggleSort = () => {
    setIsSortVisible(!isSortVisible); // Toggle sort visibility
    setIsFilterVisible(true); // Ensure filter box is visible when sort is opened
  };

  // Dummy tenant data
  const tenants = Array(25).fill({
    name: 'John Doe',
    mobile: '123-456-7890',
    id: 'Tenant123',
    image: tenantImage, // Use the local image
  });

  // Handle filter changes
  const handleFilterChange = (event) => {
    // Implement filter logic based on the selected criteria
    console.log(event.target.value);
  };

  return (
    <div className="tenants-page">
      <h1>Tenants</h1>

      <div className="tenants-header">
        <div className="search-add-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search....." />
          </div>

          <button className="add-tenant-btn" onClick={handleAddTenantClick}>
            <FaPlus className="plus-icon" /> Add New Tenant
          </button>
        </div>
      </div>
      {/* <TenantPopup isVisible={isPopupVisible} onClose={handleAddTenantClick} /> */}

      <div className="filters">
        <button className="filter-btn" onClick={toggleFilter}>
          <FaFilter className="filter-icon" /> Filter
        </button>
        <button className={`sort-btn ${isFilterVisible ? 'active' : ''}`} onClick={toggleSort}>
          <FaSort className="sort-icon" /> Sort By
        </button>
      </div>
      <br />

      {/* Filter Box */}
      <div className={`filter-container ${isFilterVisible ? 'show' : ''}`}>
        <div className="search-bar-filter">
          <FaSearch className="search-icon1" />
          <input type="text" placeholder="Search by PM/Name" onChange={handleFilterChange} />
        </div>
        <div className="filter-group">
          <h3>Service Type</h3>
          <label><input type="checkbox" value="Housing Consultation" onChange={handleFilterChange} /> Housing Consultation</label>
          <label><input type="checkbox" value="Housing Transition" onChange={handleFilterChange} /> Housing Transition</label>
          <label><input type="checkbox" value="Housing Sustaining" onChange={handleFilterChange} /> Housing Sustaining</label>
          <label><input type="checkbox" value="Moving Expenses" onChange={handleFilterChange} /> Moving Expenses</label>
        </div>
        <div className="filter-group">
          <h3>City</h3>
          <label><input type="checkbox" value="Benroji" onChange={handleFilterChange} /> Benroji</label>
          <label><input type="checkbox" value="Brooklyn" onChange={handleFilterChange} /> Brooklyn</label>
          <label><input type="checkbox" value="Fridey" onChange={handleFilterChange} /> Fridey</label>
          <label><input type="checkbox" value="St. Ckloud" onChange={handleFilterChange} /> St. Ckloud</label>
        </div>
        <div className="filter-group">
          <h3>Country</h3>
          <label><input type="checkbox" value="Bemidji" onChange={handleFilterChange} /> Bemidji</label>
          <label><input type="checkbox" value="Brooklyn" onChange={handleFilterChange} /> Brooklyn</label>
          <label><input type="checkbox" value="Fridey" onChange={handleFilterChange} /> Fridey</label>
          <label><input type="checkbox" value="St. Ckloud" onChange={handleFilterChange} /> St. Ckloud</label>
        </div>
        <div className="filter-group">
          <h3>Insurance</h3>
          <label><input type="checkbox" value="MA" onChange={handleFilterChange} /> MA</label>
          <label><input type="checkbox" value="Hennpin Health" onChange={handleFilterChange} /> Hennpin Health</label>
          <label><input type="checkbox" value="UCare" onChange={handleFilterChange} /> UCare</label>
          <label><input type="checkbox" value="Private Pay" onChange={handleFilterChange} /> Private Pay</label>
        </div>
      </div>

      {/* Sort Box */}
      <div className={`sort-container ${isSortVisible ? 'show' : ''}`}>
        <div className="search-bar-sort">
          <FaSearch className="search-icon1" />
          <input type="text" placeholder="Search by PM/Name" />
        </div>
        <div className="sort-group">
          <h3>Name</h3>
          <label><input type="radio" name="name" value="firstName" /> First Name</label>
          <label><input type="radio" name="name" value="lastName" /> Last Name</label>
        </div>
        <div className="sort-group">
          <h3>Status</h3>
          <label><input type="radio" name="status" value="active" /> Active</label>
          <label><input type="radio" name="status" value="deactivated" /> Deactivated</label>
          <label><input type="radio" name="status" value="referral" /> Referral</label>
        </div>
        <div className="sort-group">
          <h3>Documentation</h3>
          <label><input type="radio" name="documentation" value="completed" /> Completed</label>
          <label><input type="radio" name="documentation" value="pending" /> Pending</label>
        </div>
        <div className="sort-options">
          <label><input type="checkbox" /> Restore to Default</label>
          <div className="sort-buttons">
            <button className="sort-btn">Sort</button>
            <button className="cancel-btn" onClick={toggleSort}>Cancel</button>
          </div>
        </div>
      </div>

      {/* Tenant Profiles Grid */}
      <div className={`tenant-grid ${isFilterVisible && isSortVisible ? 'shift-right-both' : isFilterVisible ? 'shift-right-filter' : ''}`}>
        {tenants.map((tenant, index) => (
          <div key={index} className="tenant-box">
            <div className="tenant-info">
              <h3>{tenant.name}</h3>
              <p>{tenant.mobile}</p>
              <p>{tenant.id}</p>
              <div className="tenant-icons">
                <FaCalendarAlt className="tenant-icon" />
                <FaBars className="tenant-icon" />
                <FaEnvelope className="tenant-icon" />
                <FaFileAlt className="tenant-icon" />
              </div>
            </div>
            <div className="tenant-image">
              <img src={tenant.image} alt="Tenant" />
            </div>
          </div>
        ))}
      </div>

      {/* Popup for Adding New Tenant */}
      {isPopupVisible && (
        <div className="popup">
          <h2>Add New Tenant</h2>
          <button className="close-btn" onClick={handleAddTenantClick}>Close</button>
          {/* Add tenant form goes here */}
        </div>
      )}
    </div>
  );
};

export default Tenants;


