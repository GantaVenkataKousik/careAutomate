import React, { useState, useEffect } from 'react';
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
  IconButton,
  Grid
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
  const [visitData, setVisitData] = useState([]);


  const [newVisit, setNewVisit] = useState({
    serviceType: '',       // New field
    title: '',
    dos: '',               // Date of Service
    duration: '',          // Will be in the format "Start time - End time"
    planOfService: '',     // New field (dropdown)
    methodOfVisit: '',     // New field (direct/indirect)
    visitMode: '',         // In-person/remote (only if method is direct)
    details: '',
    transportation: '',    // New field (dropdown yes/no)
    miles: '',             // Only visible if transportation is yes
    transportWithTenant: '', // New field
    transportWithoutTenant: '', // New field
    signature: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found in local storage. Please log in.');
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const hcmId = payload._id;

        const response = await fetch('https://careautomate-backend.vercel.app/appointments/fetchAll/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hcmId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Check if the response is successful and data is present
        if (result.success && result.data) {
          const visitsArray = Object.values(result.data).flat(); // Flatten the nested arrays into a single array

          // Now map the flattened array
          const mappedData = visitsArray.map(item => ({
            title: item.reason,
            startDate: item.startTime,
            endDate: item.endTime,
            typeMethod: item.location === 'Remote' ? 'Online-Remote' : 'Office-In Person',
            hcm: item.hcm || 'Not Specified',
            scheduledDate: item.date,
            dos: item.date,
            duration: `${item.startTime.split('T')[1].slice(0, 5)} - ${item.endTime.split('T')[1].slice(0, 5)}`,
            details: 'Details not provided',
            status: item.approved ? 'Approved' : 'Rejected',
            signature: ''
          }));

          setVisitData(mappedData);
        }
      } catch (error) {
        console.error('Error fetching visit data:', error);
        setError(error.message);
      }
    };

    fetchVisitData();
  }, []);
  const validateVisit = (visit) => {
    const newErrors = {};
    if (!visit.serviceType) newErrors.serviceType = 'Service Type is required'; // New field
    if (!visit.title) newErrors.title = 'Title is required';
    if (!visit.dos) newErrors.dos = 'Date of Service is required';
    if (!visit.duration) newErrors.duration = 'Duration is required';
    if (!visit.planOfService) newErrors.planOfService = 'Plan of Service is required'; // New field
    if (!visit.methodOfVisit) newErrors.methodOfVisit = 'Method of Visit is required'; // New field
    if (visit.methodOfVisit === 'direct' && !visit.visitMode) newErrors.visitMode = 'Visit Mode is required'; // Dependent on method
    if (!visit.details) newErrors.details = 'Details are required';
    if (!visit.transportation) newErrors.transportation = 'Transportation is required'; // New field
    if (visit.transportation === 'yes' && !visit.miles) newErrors.miles = 'Miles are required'; // Dependent on transportation
    if (!visit.signature) newErrors.signature = 'Signature is required';
    return newErrors;
  };
  const timeOptions = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    // Add more time slots as needed
  ];

  const handleStartTimeChange = (startTime) => {
    setNewVisit({
      ...newVisit,
      startTime,
    });

    // Recalculate end time based on selected duration
    if (newVisit.duration) {
      const newEndTime = calculateEndTime(startTime, newVisit.duration);
      setNewVisit({
        ...newVisit,
        endTime: newEndTime,
      });
    }
  };

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(duration); // Add duration to start time
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;

    // Return in "HH:mm" format
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const handleDurationChange = (duration) => {
    setNewVisit({
      ...newVisit,
      duration,
    });

    // Recalculate end time based on selected start time
    if (newVisit.startTime) {
      const newEndTime = calculateEndTime(newVisit.startTime, duration);
      setNewVisit({
        ...newVisit,
        endTime: newEndTime,
      });
    }
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

  const handleNewVisitSubmit = async () => {
    const newErrors = validateVisit(newVisit);

    const token = localStorage.getItem('token');
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const hcmId = payload._id;
    // Prepare the data to be sent to the API
    const appointmentData = {
      hcm: hcmId,
      date: newVisit.dos,
      tenantId: newVisit.tenantId || "",
      startTime: newVisit.startTime,
      endTime: newVisit.endTime,
      reason: newVisit.title,
      approved: false,
      hcm: newVisit.hcm || "",
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in local storage. Please log in.');
      }

      const response = await fetch('https://careautomate-backend.vercel.app/appointments/createAppointment/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      const result = await response.json();

      if (result.success) {
        // Update local state if appointment was created successfully
        setVisitData(prev => [...prev, appointmentData]);
        setOpenNewVisitPopup(false);
        // Reset the form fields
        setNewVisit({
          _id: '',
          serviceType: '',
          title: '',
          dos: '',
          duration: '',
          planOfService: '',
          methodOfVisit: '',
          visitMode: '',
          details: '',
          transportation: '',
          miles: '',
          transportWithTenant: '',
          transportWithoutTenant: '',
          signature: '',
        });
      } else {
        console.error('Error creating appointment:', result.message);
      }
    } catch (error) {
      console.error('Error submitting new visit:', error);
    }
  };
  const handleCancelNewVisit = () => {
    setNewVisit({
      _id: '',
      serviceType: '',
      title: '',
      dos: '',
      duration: '',
      planOfService: '',
      methodOfVisit: '',
      visitMode: '',
      details: '',
      transportation: '',
      miles: '',
      transportWithTenant: '',
      transportWithoutTenant: '',
      signature: '',
    });
  }
  return (
    <div className="visit-list-container">
      <br />
      <br />
      {/* Buttons aligned to the right */}
      <div className="top-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="outlined" color="primary" sx={{ marginRight: '10px', borderRadius: "20px" }} onClick={() => setOpenNewVisitPopup(true)}>+ New Visit</Button>
        <Button variant="outlined" sx={{ borderRadius: "20px" }}>Export</Button>
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
            sx={{ marginTop: '15px', marginBottom: '10px', width: '260px' }}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editedVisit.endDate || ''}
            onChange={(e) => setEditedVisit({ ...editedVisit, endDate: e.target.value })}
            sx={{ marginTop: '15px', marginBottom: '10px', width: '260px', marginLeft: "13px" }}
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

      <Dialog open={openNewVisitPopup} onClose={handleCancelNewVisit} className='newvisitpopup'>
        <DialogTitle>New Visit</DialogTitle>
        <DialogContent>
          <TextField
            label="PlanOfService"
            value={newVisit.serviceType}
            onChange={(e) => setNewVisit({ ...newVisit, serviceType: e.target.value })}
            onBlur={() => handleBlur('serviceType')}
            fullWidth
            margin="dense"
            error={!!errors.serviceType}
            helperText={errors.serviceType || ' '}
          />


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
            label="Date of Service"
            type="date"
            value={newVisit.dos}
            onChange={(e) => setNewVisit({ ...newVisit, dos: e.target.value })}
            onBlur={() => handleBlur('dos')}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            error={!!errors.dos}
            helperText={errors.dos || ' '}
          />

          <Grid container spacing={2}>
            <Grid item xs={4}> {/* Adjust width as necessary */}
              <FormControl fullWidth margin="dense" error={!!errors.duration}>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={newVisit.duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  label="Duration"
                >
                  <MenuItem value="30">30 min</MenuItem>
                  <MenuItem value="45">45 min</MenuItem>
                  <MenuItem value="25">25 min</MenuItem>
                </Select>
                <FormHelperText>{errors.duration || ' '}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}> {/* Adjust width as necessary */}
              <FormControl fullWidth margin="dense" error={!!errors.startTime}>
                <InputLabel>Start Time</InputLabel>
                <Select
                  value={newVisit.startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  label="Start Time"
                >
                  {timeOptions.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.startTime || ' '}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}> {/* Adjust width as necessary */}
              <TextField
                label="End Time"
                value={newVisit.endTime} // Calculated end time
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                error={!!errors.endTime}
                helperText={errors.endTime || ' '}
                disabled // The end time will be calculated and can't be manually changed
              />
            </Grid>
          </Grid>
          <FormControl fullWidth margin="dense" error={!!errors.planOfService}>
            <InputLabel>Place of Service</InputLabel>
            <Select
              value={newVisit.planOfService}
              onChange={(e) => setNewVisit({ ...newVisit, planOfService: e.target.value })}
              onBlur={() => handleBlur('planOfService')}
              label="Plan of Service"
            >
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Institution">Institution</MenuItem>
              <MenuItem value="Community">Community</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <FormHelperText>{errors.planOfService || ' '}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="dense" error={!!errors.methodOfVisit}>
            <InputLabel>Method of Visit</InputLabel>
            <Select
              value={newVisit.methodOfVisit}
              onChange={(e) => setNewVisit({ ...newVisit, methodOfVisit: e.target.value })}
              onBlur={() => handleBlur('methodOfVisit')}
              label="Method of Visit"
            >
              <MenuItem value="direct">Direct</MenuItem>
              <MenuItem value="indirect">Indirect</MenuItem>
            </Select>
            <FormHelperText>{errors.methodOfVisit || ' '}</FormHelperText>
          </FormControl>

          {newVisit.methodOfVisit === 'direct' && (
            <FormControl fullWidth margin="dense" error={!!errors.visitMode}>
              <InputLabel>Visit Mode</InputLabel>
              <Select
                value={newVisit.visitMode}
                onChange={(e) => setNewVisit({ ...newVisit, visitMode: e.target.value })}
                onBlur={() => handleBlur('visitMode')}
                label="Visit Mode"
              >
                <MenuItem value="in-person">In-Person</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
              </Select>
              <FormHelperText>{errors.visitMode || ' '}</FormHelperText>
            </FormControl>
          )}

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
          <FormControl fullWidth margin="dense" error={!!errors.transportation}>
            <InputLabel>Transportation</InputLabel>
            <Select
              value={newVisit.transportation}
              onChange={(e) => setNewVisit({ ...newVisit, transportation: e.target.value })}
              onBlur={() => handleBlur('transportation')}
              label="Transportation"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            <FormHelperText>{errors.transportation || ' '}</FormHelperText>
          </FormControl>

          <Grid container spacing={2} alignItems="center">
            {/* Transport With Tenant */}
            {newVisit.transportation === 'yes' && (
              <>
                <Grid item xs={5}>
                  <TextField
                    label="Transport With Tenant"
                    value={newVisit.transportWithTenant}
                    onChange={(e) => setNewVisit({ ...newVisit, transportWithTenant: e.target.value })}
                    onBlur={() => handleBlur('transportWithTenant')}
                    fullWidth
                    margin="dense"
                    error={!!errors.transportWithTenant}
                    helperText={errors.transportWithTenant || ' '}
                  />
                </Grid>

                {/* Transport Without Tenant */}
                <Grid item xs={5}>
                  <TextField
                    label="Transport Without Tenant"
                    value={newVisit.transportWithoutTenant}
                    onChange={(e) => setNewVisit({ ...newVisit, transportWithoutTenant: e.target.value })}
                    onBlur={() => handleBlur('transportWithoutTenant')}
                    fullWidth
                    margin="dense"
                    error={!!errors.transportWithoutTenant}
                    helperText={errors.transportWithoutTenant || ' '}
                  />
                </Grid>

                {/* Miles Field with Reduced Width */}
                <Grid item xs={2}>
                  <TextField
                    label="Miles"
                    type="number"
                    value={newVisit.miles}
                    onChange={(e) => setNewVisit({ ...newVisit, miles: e.target.value })}
                    onBlur={() => handleBlur('miles')}
                    fullWidth
                    margin="dense"
                    error={!!errors.miles}
                    helperText={errors.miles || ' '}
                  />
                </Grid>
              </>
            )}
          </Grid>
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
          <Button onClick={handleCancelNewVisit} color="secondary">Cancel</Button>
          <Button onClick={handleNewVisitSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
};

export default VisitList;
