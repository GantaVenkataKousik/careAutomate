import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/VisitList.css'; // Import CSS for styling the rectangular boxes
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

const VisitList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [detailsPopup, setDetailsPopup] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false); // State to manage edit dialog
  const [openNewVisitPopup, setOpenNewVisitPopup] = useState(false);
  const [currentVisitIndex, setCurrentVisitIndex] = useState(null); // State to store current visit index
  const [editedVisit, setEditedVisit] = useState({}); // State to store edited visit data
  const [errors, setErrors] = useState({});
  const [newVisit, setNewVisit] = useState({
    title: '',
    startDate: '',
    endDate: '',
    typeMethod: '',
    hcm: '',
    scheduledDate: '',
    dos: '',
    duration: '',
    details: '',
    status: 'Pending',
    signature: ''
  });
  const [visitData, setVisitData] = useState([
    {
      title: 'Housing Transition',
      startDate: '2024/05/10',
      endDate: '2024/03/02',
      typeMethod: 'Office-In Person', // Combined field
      hcm: 'Robert Roos',
      scheduledDate: '2024/01/03',
      dos: '2024/07/06',
      duration: '8:00AM - 10:00AM',
      details: 'Her old collection discovered. So at parties he warrant on staying...Her old collection discovered. So at parties he warrant on staying Her old collection discovered. So at parties he warrant on staying...Her old collection discovered. So at parties he warrant on staying',
      status: 'Approved',
      signature: ''
    },
    {
      title: 'HCM - Robert Roos DOS',
      startDate: '08/3/24',
      endDate: '08/6/24',
      typeMethod: 'Online-Remote', // Combined field
      hcm: 'Robert Roos',
      scheduledDate: '08/6/24',
      dos: '08/7/24',
      duration: '8:00AM - 10:00AM',
      details: 'Sincerity collect happiness do is contented...Her old collection discovered. So at parties he warrant on staying Her old collection discovered. So at parties he warrant on staying...Her old collection discovered. So at parties he warrant on staying',
      status: 'Rejected',
      signature: ''
    },
    {
      title: 'Tenant Meeting',
      startDate: '06/01/2024',
      endDate: '06/01/2024',
      typeMethod: 'Online-Remote', // Combined field
      hcm: 'Anna Smith',
      scheduledDate: '06/01/24',
      dos: '06/01/24',
      duration: '9:00AM - 11:00AM',
      details: 'Tenant meeting to discuss transition services...Her old collection discovered. So at parties he warrant on staying Her old collection discovered. So at parties he warrant on staying...Her old collection discovered. So at parties he warrant on staying',
      status: 'Pending',
      signature: ''
    }
  ]);
  const validateVisit = (visit) => {
    const newErrors = {};
    if (!visit.title) newErrors.title = 'Title is required';
    if (!visit.startDate) newErrors.startDate = 'Start date is required';
    if (!visit.endDate) newErrors.endDate = 'End date is required';
    if (!visit.typeMethod) newErrors.typeMethod = 'Type and Method are required';
    if (!visit.hcm) newErrors.hcm = 'HCM is required';
    if (!visit.scheduledDate) newErrors.scheduledDate = 'Scheduled date is required';
    if (!visit.dos) newErrors.dos = 'DOS is required';
    if (!visit.duration) newErrors.duration = 'Duration is required';
    if (!visit.details) newErrors.details = 'Details are required';
    if (!visit.signature) newErrors.signature = 'Signature is required';
    return newErrors;
  };
  
  const handleDetailsClick = (details) => {
    setDetailsPopup(details);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleEditClick = (index) => {
    setCurrentVisitIndex(index);
    setEditedVisit(visitData[index]); // Pre-fill the popup fields with the existing data
    setOpenEditPopup(true);
  };

  const handleDeleteClick = (index) => {
    const updatedVisitData = [...visitData];
    updatedVisitData.splice(index, 1);
    setVisitData(updatedVisitData); // Update the state to trigger re-render
  };

  const handleSaveChanges = () => {
    const newErrors = validateVisit(editedVisit);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const updatedVisits = [...visitData];
    updatedVisits[currentVisitIndex] = editedVisit; // Update the visit with edited data
    setVisitData(updatedVisits); // Update the visitData state to reflect changes
    setOpenEditPopup(false); // Close the dialog after saving
  };
  const validateField = (field, value) => {
    let errorMessage = '';
    if (!value) {
      errorMessage = `${field} is required`;
    }
    return errorMessage;
  };
  
  const handleBlur = (field) => {
    setErrors({
      ...errors,
      [field]: validateField(field, newVisit[field]),
    });
  };
  const handleNewVisitSubmit = () => {
    const newErrors = {};
    Object.keys(newVisit).forEach((key) => {
      const error = validateField(key, newVisit[key]);
      if (error) newErrors[key] = error;
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form data
      console.log("Form Submitted:", newVisit);
    }
    setVisitData([...visitData, newVisit]); // Add the new visit to the visitData array
    setOpenNewVisitPopup(false); // Close the new visit dialog
    setNewVisit({
      title: '',
      startDate: '',
      endDate: '',
      typeMethod: '',
      hcm: '',
      scheduledDate: '',
      dos: '',
      duration: '',
      details: '',
      status: 'Pending',
      signature: ''
    }); // Reset the new visit fields
  };
  const handleCancelNewVisit = () => {
    setOpenNewVisitPopup(false); // Close the new visit dialog
    setNewVisit({
      title: '',
      startDate: '',
      endDate: '',
      typeMethod: '',
      hcm: '',
      scheduledDate: '',
      dos: '',
      duration: '',
      details: '',
      status: 'Pending',
      signature: ''
    }); // Reset the new visit fields
  };
  return (
    <div className="visit-list-container">
      <br />
      <br />
      {/* Buttons aligned to the right */}
      <div className="top-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="outlined" color="primary" sx={{ marginRight: '10px' ,borderRadius:"20px"}}onClick={() => setOpenNewVisitPopup(true)}>+ New Visit</Button>
        <Button variant="outlined" sx={{borderRadius:"20px"}}>Export</Button>
      </div>

      {/* Filter and search options */}
      <div className="filter-options">
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ width: '150px', marginRight: '10px' }}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ width: '150px', marginRight: '10px' }}
        />
        <Select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          displayEmpty
          sx={{ width: '120px', marginRight: '10px' }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="HCM">Pending</MenuItem>
          <MenuItem value="Tenant">Rejected</MenuItem>
          <MenuItem value="Tenant">Completed</MenuItem>
        </Select>
        <TextField label="Search" variant="outlined" sx={{ width: '200px' }} />
      </div>

      {/* Visit Details - Rectangular Boxes */}
      {visitData.map((visit, index) => (
        <Box
          key={index}
          className={`visit-box ${visit.status.toLowerCase()}`}
          sx={{
            backgroundColor:
              visit.status === 'Approved' ? 'lightgreen' :
                visit.status === 'Rejected' ? 'lightcoral' : 'lightblue'
          }}
        >
          <div className="visit-header">
            <h3 style={{ margin: 0 }}>{visit.title}</h3>
            <span>{visit.startDate} - {visit.endDate}</span>
            {/* Type and Method moved to the right */} 
            <div style={{ marginLeft: 'auto' }}>
              <p><strong>{visit.typeMethod}</strong></p>
            </div>
          </div>

          <div className="visit-info-row">
            <span><strong>HCM:</strong> {visit.hcm}</span>
            <span><strong>Scheduled Time: </strong>{visit.scheduledDate}</span>
            <span><strong>DOS: </strong>{visit.dos}</span>
            <span><strong>Duration: </strong>{visit.duration}</span>
          </div>

          {/* Visit Details without internal box */}
          <p><strong>Visit Details:</strong></p>
          <p>{visit.details.length > 100 ? (
            <>
              {visit.details.substring(0, 200)}...
              <Button onClick={() => handleDetailsClick(visit.details)}>View More</Button>
            </>
          ) : (
            visit.details
          )}</p>

          <div className="visit-actions">
            <div className="signature">
              <span>Signature: {visit.signature || 'N/A'} </span>
              <IconButton onClick={() => handleEditClick(index)}><EditIcon /></IconButton>
              <IconButton onClick={() => handleDeleteClick(index)}><DeleteIcon /></IconButton>
            </div>
            {visit.status === 'Pending' ? (
              <>
                <Button className="reject-button" variant="outlined" color="error">Reject</Button>
                <Button className="approve-button" variant="outlined" color="primary">Approve</Button>
              </>
            ) : (
              <Button className={visit.status.toLowerCase()} variant="outlined">
                {visit.status}
              </Button>
            )}
          </div>
        </Box>
      ))}
       <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Visit Details</DialogTitle>
        <DialogContent>
          <p>{detailsPopup}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      {/* Popup for viewing full details */}
      <Dialog open={openEditPopup} onClose={() => setOpenEditPopup(false)}>
        <DialogTitle>Edit Visit</DialogTitle>
        <DialogContent>
          <Select
            label="Title"
            value={editedVisit.title || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, title: e.target.value })}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Housing Sustaining">Housing Sustaining</MenuItem>
            <MenuItem value="Housing Transition">Housing Transition</MenuItem>
          </Select>
      
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editedVisit.startDate || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, startDate: e.target.value })}
            sx={{ marginTop: '15px', marginBottom:'10px',width: '260px' }}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editedVisit.endDate || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, endDate: e.target.value })}
            sx={{ marginTop: '15px', marginBottom:'10px',width: '260px' ,marginLeft:"13px"}}
          />

          <Select
            label="Type and Method"
            value={editedVisit.typeMethod || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, typeMethod: e.target.value })}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Online - Remote">Online - Remote</MenuItem>
            <MenuItem value="Office - In Person">Office - In Person</MenuItem>
          </Select>

          <TextField
            label="HCM"
            value={editedVisit.hcm || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, hcm: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Scheduled Date"
            type="date"
            value={editedVisit.scheduledDate || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, scheduledDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="dense"
          />
          <TextField
            label="DOS"
            type="date"
            value={editedVisit.dos || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, dos: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Duration"
            value={editedVisit.duration || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, duration: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Details"
            value={editedVisit.details || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, details: e.target.value })}
            fullWidth
            margin="dense"
            multiline
            rows={4}
          />
          <TextField
            label="Signature"
            value={editedVisit.signature || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, signature: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditPopup(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openNewVisitPopup} onClose={handleCancelNewVisit}>
    <DialogTitle>New Visit</DialogTitle>
    <DialogContent>
      <TextField
        label="Title"
        value={newVisit.title}
        onChange={(e) => setNewVisit({ ...newVisit, title: e.target.value })}
        onBlur={() => handleBlur('title')}
        fullWidth
        margin="dense"
        error={!!errors.title}
        helperText={errors.title || ' '}
      />
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={newVisit.startDate}
        onChange={(e) => setNewVisit({ ...newVisit, startDate: e.target.value })}
        onBlur={() => handleBlur('startDate')}
        fullWidth
        margin="dense"
        error={!!errors.startDate}
        helperText={errors.startDate || ' '}
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={newVisit.endDate}
        onChange={(e) => setNewVisit({ ...newVisit, endDate: e.target.value })}
        onBlur={() => handleBlur('endDate')}
        fullWidth
        margin="dense"
        error={!!errors.endDate}
        helperText={errors.endDate || ' '}
      />
      {/* <Select
        label="Type-Method"
        value={newVisit.typeMethod}
        onChange={(e) => setNewVisit({ ...newVisit, typeMethod: e.target.value })}
        onBlur={() => handleBlur('typeMethod')}
        fullWidth
        margin="dense"
        error={!!errors.typeMethod}
        helperText={errors.typeMethod || ' '}
      >
        <MenuItem value="Online-Remote">Online-Remote</MenuItem>
        <MenuItem value="Office-In Person">Office-In Person</MenuItem>
      </Select> */}
      <FormControl fullWidth margin="dense" error={!!errors.typeMethod}>
  <InputLabel>Type-Method</InputLabel>
  <Select
    value={newVisit.typeMethod}
    onChange={(e) => setNewVisit({ ...newVisit, typeMethod: e.target.value })}
    onBlur={() => handleBlur('typeMethod')}
    label="Type-Method"  // Ensure this is here for the label to be connected properly
  >
    <MenuItem value="Online-Remote">Online-Remote</MenuItem>
    <MenuItem value="Office-In Person">Office-In Person</MenuItem>
  </Select>
  <FormHelperText>{errors.typeMethod || ' '}</FormHelperText>
</FormControl>
      <TextField
        label="HCM"
        value={newVisit.hcm}
        onChange={(e) => setNewVisit({ ...newVisit, hcm: e.target.value })}
        onBlur={() => handleBlur('hcm')}
        fullWidth
        margin="dense"
        error={!!errors.hcm}
        helperText={errors.hcm || ' '}
      />
      <TextField
        label="Scheduled Date"
        type="date"
        value={newVisit.scheduledDate}
        onChange={(e) => setNewVisit({ ...newVisit, scheduledDate: e.target.value })}
        onBlur={() => handleBlur('scheduledDate')}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="dense"
        error={!!errors.scheduledDate}
        helperText={errors.scheduledDate || ' '}
      />
      <TextField
        label="DOS"
        type="date"
        value={newVisit.dos}
        onChange={(e) => setNewVisit({ ...newVisit, dos: e.target.value })}
        onBlur={() => handleBlur('dos')}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="dense"
        error={!!errors.dos}
        helperText={errors.dos || ' '}
      />
      <TextField
        label="Duration"
        value={newVisit.duration}
        onChange={(e) => setNewVisit({ ...newVisit, duration: e.target.value })}
        onBlur={() => handleBlur('duration')}
        fullWidth
        margin="dense"
        error={!!errors.duration}
        helperText={errors.duration || ' '}
      />
      <TextField
        label="Details"
        value={newVisit.details}
        onChange={(e) => setNewVisit({ ...newVisit, details: e.target.value })}
        onBlur={() => handleBlur('details')}
        fullWidth
        margin="dense"
        multiline
        rows={4}
        error={!!errors.details}
        helperText={errors.details || ' '}
      />
      <TextField
        label="Signature"
        value={newVisit.signature}
        onChange={(e) => setNewVisit({ ...newVisit, signature: e.target.value })}
        onBlur={() => handleBlur('signature')}
        fullWidth
        margin="dense"
        error={!!errors.signature}
        helperText={errors.signature || ' '}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelNewVisit}>Cancel</Button>
      <Button onClick={handleNewVisitSubmit} color="primary">Submit</Button>
    </DialogActions>
  </Dialog>
    </div>
  );
};

export default VisitList;
