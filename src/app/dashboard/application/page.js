'use client'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/store';
import { FiFileText, FiCalendar, FiChevronDown, FiExternalLink, FiClock, FiVideo, FiPhone, FiMapPin } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Modal from '@/components/Modal';
import Modal from '@/components/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Application = () => {
  const { auth } = useContext(AuthContext);
  const [applicantsData, setApplicantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    dateTime: new Date(),
    duration: 30,
    interviewType: 'video',
    link: '',
    location: '',
    notes: ''
  });

  const fetchData = async () => {
    // console.log(auth.user);
    
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:7001/api/applicants/user/${auth.user._id}`);
      if (response.status === 200) {
        setApplicantData(response.data.applications);
      } else {
        toast.error('Error fetching applications');
      }
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.user?._id) {
      fetchData();
    }
  }, [auth.user?._id]);

  const handleStatusChange = async (e, application_id) => {
    const newStatus = e.target.value;
    setUpdating(application_id);
    
    try {
      const response = await axios.post(
        `http://localhost:7001/api/applicants/application/update/${application_id}`,
        { status: newStatus }
      );
      
      if (response.status === 200) {
        setApplicantData(prevData =>
          prevData.map(item =>
            item._id === application_id ? { ...item, status: newStatus } : item
          )
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
    } finally {
      setUpdating(null);
    }
  };

  const handleScheduleInterview = (application) => {
    setSelectedApplication(application);
    setInterviewDetails({
      dateTime: new Date(),
      duration: 30,
      link: '',
      location: '',
      notes: ''
    });
    setShowScheduleModal(true);
  };

  const handleInterviewSubmit = async () => {
    // console.log(selectedApplication);
    
    try {
      const response = await axios.post(
        'http://localhost:7001/api/interviews/',
        {
          applicationId: selectedApplication._id,
          jobId: selectedApplication.internShipID,
          applicantId: selectedApplication.candidateID
          ,
          ...interviewDetails
        },
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 201) {
        toast.success('Interview scheduled successfully');
        setApplicantData(prevData =>
          prevData.map(item =>
            item._id === selectedApplication._id 
              ? { ...item, status: 'interview-scheduled', interview: response.data } 
              : item
          )
        );
        setShowScheduleModal(false);
      }
    } catch (error) {
      toast.error('Failed to schedule interview');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'interview-scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusOptions = (currentStatus) => {
    const options = [
      { value: 'pending', label: 'Pending', class: 'text-blue-800' },
      { value: 'approved', label: 'Approved', class: 'text-green-800' },
      { value: 'rejected', label: 'Rejected', class: 'text-red-800' }
    ];

    if (currentStatus === 'interview-scheduled') {
      options.push({ value: 'interview-scheduled', label: 'Interview Scheduled', class: 'text-purple-800' });
    }

    return options;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Applicant Management</h1>
          <p className="mt-2 text-gray-600">Review and manage all applicant submissions</p>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Applicant</div>
            <div className="col-span-3">Internship</div>
            <div className="col-span-2">Resume</div>
            <div className="col-span-2">Applied</div>
            <div className="col-span-2">Status/Actions</div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && applicantsData.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No applications found
            </div>
          )}

          {/* Applications List */}
          {!loading && applicantsData.length > 0 && (
            <div className="divide-y divide-gray-200">
              {applicantsData.map((item) => (
                <div key={item._id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 transition-colors items-center">
                  {/* Applicant Name */}
                  <div className="col-span-3">
                    <div className="text-sm font-medium text-gray-900">{item.applicantName}</div>
                    <div className="text-xs text-gray-500">{item.applicantEmail}</div>
                  </div>

                  {/* Internship Title */}
                  <div className="col-span-3">
                    <div className="text-sm font-medium text-gray-900">{item.JobTitle}</div>
                  </div>

                  {/* Resume Link */}
                  <div className="col-span-2">
                    {item.resume ? (
                      <a
                        href={`http://localhost:7001/${item.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FiFileText className="mr-2 h-4 w-4" />
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No resume</span>
                    )}
                  </div>

                  {/* Applied Date */}
                  <div className="col-span-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-2 h-4 w-4" />
                      {new Date(item.appliedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="col-span-2">
                    <div className="flex flex-col space-y-2">
                      <div className="relative">
                        <select
                          className={`block appearance-none w-full py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${getStatusColor(item.status)}`}
                          value={item.status}
                          onChange={(e) => handleStatusChange(e, item._id)}
                          disabled={updating === item._id}
                        >
                          {getStatusOptions(item.status).map(option => (
                            <option 
                              key={option.value} 
                              value={option.value} 
                              className={option.class}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <FiChevronDown className="h-4 w-4" />
                        </div>
                      </div>

                      {item.status === 'approved' && (
                        <button
                          onClick={() => handleScheduleInterview(item)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-md text-sm flex items-center justify-center"
                        >
                          <FiClock className="mr-1 h-3 w-3" />
                          Schedule Interview
                        </button>
                      )}

                      {item.interview && (
                        <div className="text-xs text-purple-600">
                          Interview scheduled
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schedule Interview Modal */}
      <Modal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Schedule Interview</h2>
          {selectedApplication && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Applicant: {selectedApplication.applicantName}</p>
              <p className="text-sm text-gray-600">Position: {selectedApplication.JobTitle}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <DatePicker
                selected={interviewDetails.dateTime}
                onChange={(date) => setInterviewDetails({...interviewDetails, dateTime: date})}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <select
                value={interviewDetails.duration}
                onChange={(e) => setInterviewDetails({...interviewDetails, duration: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setInterviewDetails({...interviewDetails, interviewType: 'video'})}
                  className={`p-2 border rounded-md flex flex-col items-center ${interviewDetails.interviewType === 'video' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'}`}
                >
                  <FiVideo className="h-5 w-5 mb-1" />
                  <span className="text-xs">Video Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInterviewDetails({...interviewDetails, interviewType: 'phone'})}
                  className={`p-2 border rounded-md flex flex-col items-center ${interviewDetails.interviewType === 'phone' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'}`}
                >
                  <FiPhone className="h-5 w-5 mb-1" />
                  <span className="text-xs">Phone Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInterviewDetails({...interviewDetails, interviewType: 'in-person'})}
                  className={`p-2 border rounded-md flex flex-col items-center ${interviewDetails.interviewType === 'in-person' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'}`}
                >
                  <FiMapPin className="h-5 w-5 mb-1" />
                  <span className="text-xs">In-Person</span>
                </button>
              </div>
            </div>

            {interviewDetails.interviewType === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                <input
                  type="text"
                  value={interviewDetails.link}
                  onChange={(e) => setInterviewDetails({...interviewDetails, link: e.target.value})}
                  placeholder="https://meet.google.com/abc-xyz"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            )}

            {interviewDetails.interviewType === 'in-person' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={interviewDetails.location}
                  onChange={(e) => setInterviewDetails({...interviewDetails, location: e.target.value})}
                  placeholder="Office address"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            )}
            
            {interviewDetails.type === 'phone' && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Phone Number
    </label>
    <input
      type="tel"
      value={interviewDetails.phoneNumber}
      onChange={(e) => setInterviewDetails({...interviewDetails, phoneNumber: e.target.value})}
      className="w-full p-2 border rounded-md"
      placeholder="+1234567890"
      required
    />
  </div>
)}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                value={interviewDetails.notes}
                onChange={(e) => setInterviewDetails({...interviewDetails, notes: e.target.value})}
                className="w-full p-2 border rounded-md"
                rows="3"
                placeholder="Any special instructions for the candidate"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowScheduleModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInterviewSubmit}
              className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Schedule Interview
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Application;