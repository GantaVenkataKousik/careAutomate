import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { GoPerson } from 'react-icons/go';
import { RiServiceLine } from 'react-icons/ri';
import { SlNote } from 'react-icons/sl';
import { BsCalendar2Date } from 'react-icons/bs';
import { MdOutlineAccessTime } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const ScheduleAppointment = () => {
  const [hcm, setHcm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  const [planOfService, setPlanOfService] = useState('');
  const [visitMethod, setVisitMethod] = useState('');
  const [reasonForRemote, setReasonForRemote] = useState('');
  const [title, setTitle] = useState('');
  const [scheduleCreated, setScheduleCreated] = useState(false);
  const [activity, setActivity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [showCreateScheduleDialog, setShowCreateScheduleDialog] = useState(false);
  const [showCreateAnotherDialog, setShowCreateAnotherDialog] = useState(false);
  const [allTenants, setAllTenants] = useState([]); // Store tenant data
  const [endTime, setEndTime] = useState('');
  const [serviceType, setServiceType] = useState('Housing Sustaining'); // Default value for service type
const [methodOfContact, setMethodOfContact] = useState('Direct'); // Default value for method of contact


  const hcmName = useSelector((state) => state.hcm.hcmName);
  const hcmId = useSelector((state) => state.hcm.hcmId);

  console.log('Hcm Name in step4:', hcmName);
  console.log('Hcm ID in step4:', hcmId);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authorization token is missing.');
          return;
        }

        const response = await fetch('https://careautomate-backend.vercel.app/tenant/all', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const tenantData = data.tenants.map((tenant) => ({
            id: tenant._id,
            name: tenant.name,
          }));
          setAllTenants(tenantData);
        } else {
          console.error('Failed to fetch tenants:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  const handleCreateAppointment = async () => {
    // Validate date, startTime, and endTime
    if (!startDate || !startTime) {
      console.error("Date, start time, or end time is missing.");
      toast.error("Please select a valid date, start time, and end time.");
      return;
    }

    // Validate that start time is before end time if both are provided
    if (endTime && startTime >= endTime) {
      console.error("End time must be after start time.");
      toast.error("End time must be after start time.");
      return;
    }

    console.log("Date:", startDate);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    const payload = {
      tenantId: hcm || 'Unknown',
      hcmId: hcmId || 'N/A',
      date: startDate, // Send date separately
      startTime, // Send start time as time only
      endTime, // Send end time as time only
      activity: activity || 'N/A',
      methodOfContact,
      reasonForRemote: reasonForRemote,
      placeOfService: planOfService || 'N/A',
      serviceType,
      approved:false,
      status: 'pending',
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://careautomate-backend.vercel.app/tenant/create-appointment',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Appointment created successfully.');
        setScheduleCreated(true);
        setShowCreateScheduleDialog(true);
      } else {
        console.error('Failed to create appointment:', response.statusText);
        toast.error('Failed to create appointment.');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      toast.error('Error creating appointment. Please try again.');
    }
  };

  const handleCancelAppointment = () => {
    resetFormState();
  };

  const handleCreateAnother = () => {
    setShowCreateAnotherDialog(false);
    resetFormState();
  };

  const resetFormState = () => {
    setHcm('');
    setServiceType('');
    setStartDate(null);
    setEndDate(null);
    setTimeSlot('');
    setTimePeriod('');
    setTimeDuration('');
    setPlanOfService('');
    setVisitMethod('');
    setMethodOfContact('');
    setReasonForRemote('');
    setStartTime('');
    setActivity('');
    setTitle('');
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return startTime;
    const time = new Date(startTime);
    const durationMinutes = parseInt(duration.split(' ')[0], 10) || 0;
    time.setMinutes(time.getMinutes() + durationMinutes);
    return time;
  };

  return (
    <div style={{ maxHeight: '200px' }} className="p-6 max-w-2xl mx-auto bg-white rounded-lg ">
      <h5 className="text-2xl font-semibold mb-4">New Appointment</h5>
      <p className=" mb-6">Fill in the details to add a schedule</p>

      <div className="space-y-6">
        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <GoPerson size={24} className="mr-2" />
            HCM
          </label>
          <input
            type="text"
            value={hcmName}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hcm"
            className="border border-gray-300 rounded-md p-2 w-2/3"
          />
        </div>

        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <GoPerson size={24} className="mr-2" />
            Designated Tenant
          </label>
          <select
            value={hcm}
            onChange={(e) => setHcm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-2/3"
          >
            <option value="" disabled>
              Select a tenant
            </option>
            {allTenants.length > 0 ? (
              allTenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading tenants...
              </option>
            )}
          </select>
        </div>


        {/* <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <GoPerson size={24} className="mr-2" />
            Designated Tenant
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Appointment Title"
            className="border border-gray-300 rounded-md p-2 w-2/3"
          />
        </div> */}


        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <RiServiceLine size={24} className="mr-2" />
            Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-2/3"
          >
            <option value="Housing Sustaining">Housing Sustaining</option>
            <option value="Housing Transition">Housing Transition</option>
          </select>
        </div>


        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <SlNote size={24} className="mr-2" />
            Activity
          </label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="Enter Activity"
            className="border border-gray-300 rounded-md p-2 w-2/3"
          />
        </div>






        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <BsCalendar2Date size={24} className="mr-2" />
            Date
          </label>
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)} // Updates the date state
            className="border border-gray-300 rounded-md pointer p-2 w-2/3"
          />
        </div>

        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <MdOutlineAccessTime size={24} className="mr-2" />
            Start Time
          </label>
          <input
            type="time"
            value={startTime || ''}
            onChange={(e) => setStartTime(e.target.value)} // Updates the startTime state
            className="border border-gray-300 rounded-md pointer p-2 w-2/3"
          />
        </div>

        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <MdOutlineAccessTime size={24} className="mr-2" />
            End Time
          </label>
          <input
            type="time"
            value={endTime || ''}
            onChange={(e) => setEndTime(e.target.value)} // Updates the endTime state
            className="border border-gray-300 rounded-md pointer p-2 w-2/3"
          />
        </div>

        {/* Place of Service */}
        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <GrLocation size={24} className="mr-2" />
            Place of Service
          </label>
          <input
            type="text"
            value={planOfService}
            onChange={(e) => setPlanOfService(e.target.value)}
            placeholder="Place of Service"
            className="border border-gray-300 rounded-md p-2 w-2/3"
          />
        </div>



        {/* Method of Contact */}
        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <MdOutlineAccessTime size={24} className="mr-2" />
            Contact Method
          </label>
          <select
            value={methodOfContact}
            onChange={(e) => setMethodOfContact(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-2/3"
          >
            <option value="Direct">Direct</option>
            <option value="Indirect">Indirect</option>
          </select>
        </div>


        <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <RiServiceLine size={24} className="mr-2" />
            Reason for Remote
          </label>
          <input
            type="text"
            value={reasonForRemote}
            onChange={(e) => setReasonForRemote(e.target.value)}
            placeholder="Reason for Remote"
            className="border border-gray-300 rounded-md p-2 w-2/3"
          />
        </div>


        <div className="flex gap-4">
          <button
            onClick={handleCreateAppointment}
            className="border py-3 px-6 rounded-md w-full mt-6  transition duration-300"
          >
            Create Appointment
          </button>
          <button
            onClick={handleCancelAppointment}
            className=" border py-3 px-6 rounded-md w-full mt-6  transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>





      <button
        onClick={handleCreateAnother}
        className=" py-2 px-4 rounded-md mt-4  transition duration-300"
      >
        Create Another Schedule
      </button>
    </div>

  );
};

export default ScheduleAppointment;
