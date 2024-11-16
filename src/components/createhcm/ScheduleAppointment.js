
import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, Typography, Dialog, Grid, FormControl, Select, InputLabel, DialogTitle, DialogActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './ScheduleAppointment.css';
import { format } from 'date-fns';

const ScheduleAppointment = () => {
  const [hcm, setHcm] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  const [planOfService, setPlanOfService] = useState('');
  const [visitMethod, setVisitMethod] = useState('');
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('');
  const [scheduleCreated, setScheduleCreated] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: ''
  });
  const [showCreateScheduleDialog, setShowCreateScheduleDialog] = useState(false);
  const [selectedMonthlyDate, setSelectedMonthlyDate] = useState(null);
  const [selectedWeeklyDay, setSelectedWeeklyDay] = useState('');
  const [selectedBiweeklyDays, setSelectedBiweeklyDays] = useState(['', '']);
  const [showCreateAnotherDialog, setShowCreateAnotherDialog] = useState(false);
  const [previousData, setPreviousData] = useState(null);

  const timeSlotsByPeriod = {
    Morning: ['08:00 AM', '09:00 AM', '10:00 AM'],
    Afternoon: ['12:00 PM', '01:00 PM', '02:00 PM'],
    Evening: ['04:00 PM', '05:00 PM', '06:00 PM'],
  };

  const timeDurations = ['15 min', '30 min', '45 min'];
  const frequencyOptions = ['One-time', 'Daily', 'Weekly', 'Biweekly', 'Monthly'];

  const handleCreateAppointment = () => {
    const formattedDate = appointmentDate ? format(new Date(appointmentDate), 'yyyy-MM-dd HH:mm') : '';

    const event = {
      title: title || 'Appointment',
      location: visitMethod || 'Online',
      startTime: formattedDate,
      endTime: calculateEndTime(formattedDate, timeDuration),
    };
    setPreviousData({
      title,
      location: visitMethod,
      startTime: formattedDate,
      endTime: calculateEndTime(formattedDate, timeDuration),
    });
    setEventDetails(event);
    setScheduleCreated(true); // Set scheduleCreated to true when appointment is created
    setShowCreateScheduleDialog(true); // Show the dialog for appointment details
  };
  const handleCloseDialog = () => {
    if (scheduleCreated) {
      setScheduleCreated(false); // Reset the scheduleCreated state
      setShowCreateScheduleDialog(false); // Close the dialog
      // Now, show the "Do you want to create another schedule?" dialog
      setShowCreateAnotherDialog(true);
    } else {
      setShowCreateScheduleDialog(false); // Close the dialog
    }
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return startTime;
    const time = new Date(startTime);
    const durationMinutes = parseInt(duration.split(' ')[0], 10);
    time.setMinutes(time.getMinutes() + durationMinutes);
    return time.toISOString(); // Use toISOString for proper formatting
  };
  const handleCreateAnother = () => {
    setShowCreateAnotherDialog(false);

    // Reset form fields
    setHcm('');
    setServiceType('');
    setAppointmentDate(null);
    setTimeSlot('');
    setTimePeriod('');
    setTimeDuration('');
    setPlanOfService('');
    setVisitMethod('');
    setTitle('');
    setFrequency('');
  };
  return (
    <Box sx={{ p: 3, maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Schedule an Appointment
      </Typography>

      <div className="schedule-appointment-container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Select HCM"
              value={hcm}
              onChange={(e) => setHcm(e.target.value)}
            >
              <MenuItem value="HCM 1">HCM 1</MenuItem>
              <MenuItem value="HCM 2">HCM 2</MenuItem>
              <MenuItem value="HCM 3">HCM 3</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Appointment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Select Service Type"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              sx={{ marginTop: "-1px" }}
            >
              <MenuItem value="Housing Sustaining">Housing Sustaining</MenuItem>
              <MenuItem value="Housing Transition">Housing Transition</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Appointment"
                value={appointmentDate}
                onChange={(newDate) => setAppointmentDate(newDate)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Time
            </Typography>
            <Box display="flex" justifyContent="space-around">
              {['Morning', 'Afternoon', 'Evening'].map((period) => (
                <Button
                  key={period}
                  variant={timePeriod === period ? 'contained' : 'outlined'}
                  onClick={() => {
                    setTimePeriod(period);
                    setTimeSlot('');
                  }}
                  sx={{
                    width: '100px',
                    height: '40px',
                    borderRadius: '20px',
                  }}
                >
                  {period}
                </Button>
              ))}
            </Box>
          </Grid>

          {timePeriod && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Time Slots for {timePeriod}
              </Typography>
              <Box display="flex" justifyContent="space-around">
                {timeSlotsByPeriod[timePeriod].map((slot) => (
                  <Button
                    key={slot}
                    variant={timeSlot === slot ? 'contained' : 'outlined'}
                    onClick={() => setTimeSlot(slot)}
                    sx={{
                      width: '100px',
                      height: '40px',
                      borderRadius: '20px',
                    }}
                  >
                    {slot}
                  </Button>
                ))}
              </Box>
            </Grid>
          )}

          {timeSlot && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select Duration
              </Typography>
              <Box display="flex" justifyContent="space-around">
                {timeDurations.map((duration) => (
                  <Button
                    key={duration}
                    variant={timeDuration === duration ? 'contained' : 'outlined'}
                    onClick={() => setTimeDuration(duration)}
                    sx={{
                      width: '100px',
                      height: '40px',
                      borderRadius: '20px',
                    }}
                  >
                    {duration}
                  </Button>
                ))}
              </Box>
            </Grid>
          )}

          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Plan of Service"
              value={planOfService}
              onChange={(e) => setPlanOfService(e.target.value)}
            >
              <MenuItem value="Plan 1">Plan 1</MenuItem>
              <MenuItem value="Plan 2">Plan 2</MenuItem>
              <MenuItem value="Plan 3">Plan 3</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Frequency</InputLabel>
              <Select
                value={frequency}
                onChange={(e) => {
                  setFrequency(e.target.value);
                }}
              >
                {frequencyOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {frequency === 'Weekly' && (
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                margin="normal"
                label="Select Day for Weekly"
                value={selectedWeeklyDay}
                onChange={(e) => setSelectedWeeklyDay(e.target.value)}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {frequency === 'Biweekly' && (
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                margin="normal"
                label="Select Days"
                value={selectedBiweeklyDays}
                onChange={(e) => setSelectedBiweeklyDays(e.target.value)}
                SelectProps={{
                  multiple: true, // Enable multiple selection
                }}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {frequency === 'Monthly' && (
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                margin="normal"
                label="Select Day of the Month"
                value={selectedMonthlyDate}
                onChange={(e) => setSelectedMonthlyDate(e.target.value)}
              >
                {Array.from({ length: 31 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}


          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Method of Visit"
              value={visitMethod}
              onChange={(e) => setVisitMethod(e.target.value)}
            >
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
            </TextField>
          </Grid>


          <Grid item xs={12} display="flex" justifyContent="center" gap={2} mt={2}>
            <Button variant="outlined" color="secondary" onClick={() => console.log('Cancel')}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreateAppointment}>
              Create Appointment
            </Button>
          </Grid>
        </Grid>
      </div>
      <Dialog open={showCreateScheduleDialog} onClose={handleCloseDialog}>
        {scheduleCreated ? (
          <>
            <DialogTitle>Appointment Created</DialogTitle>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">{eventDetails?.title}</Typography>
              <Typography variant="body1">Description: {eventDetails?.description}</Typography>
              <Typography variant="body1">Location: {eventDetails?.location}</Typography>
              <Typography variant="body1">Start Time: {eventDetails?.startTime}</Typography>
              <Typography variant="body1">End Time: {eventDetails?.endTime}</Typography>
            </Box>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Do you want to create another schedule?</DialogTitle>
            <DialogActions>
              <Button onClick={() => setShowCreateScheduleDialog(false)} color="primary">
                No
              </Button>
              <Button
                onClick={() => {
                  setHcm('HCM 2'); // Reset or change HCM if needed
                  setScheduleCreated(false); // Reset scheduleCreated for next appointment
                  setShowCreateScheduleDialog(false); // Close the dialog
                  // Open dialog for new appointment creation

                }}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={showCreateAnotherDialog} onClose={() => setShowCreateAnotherDialog(false)}>
        <DialogTitle>Do you want to create another schedule?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowCreateAnotherDialog(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              setHcm('HCM 2'); // Reset or change HCM if needed
              setScheduleCreated(false); // Reset scheduleCreated for next appointment
              setShowCreateAnotherDialog(false); // Close the dialog
              // Proceed with creating another appointment
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default ScheduleAppointment;