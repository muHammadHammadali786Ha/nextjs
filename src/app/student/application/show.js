'use client'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/store';
import { FiFileText, FiCalendar, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Show = () => {
  const { auth } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/applicants/user/student/${auth.user._id}`);
      setApplications(response.data.applications || []);
    } catch (error) {
      toast.error('Error fetching applications');
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (auth.user._id) {
      fetchApplications();
    }

    const intervalId = setInterval(fetchApplications, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [auth.user._id]);

  const handleStatusChange = async (e, applicationId) => {
    const newStatus = e.target.value;
    
    if (!window.confirm(`Are you sure you want to change status to "${newStatus}"?`)) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:7001/api/applicants/application/update/${applicationId}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        toast.success('Status updated successfully');
        setApplications(prev => prev.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        ));
      }
    } catch (error) {
      toast.error('Failed to update status');
      console.error('Status update error:', error);
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    fetchApplications();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Your Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            {applications.length} {applications.length === 1 ? 'application' : 'applications'}
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FiRefreshCw className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resume
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{application.JobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`http://localhost:7001/${application.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FiExternalLink className="mr-1" /> View Resume
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-2" />
                      {new Date(application.appliedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusChange(e, application._id)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="under review">Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't applied to any positions yet.</p>
        </div>
      )}
    </div>
  );
};

export default Show;