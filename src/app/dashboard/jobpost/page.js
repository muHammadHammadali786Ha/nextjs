'use client'
import { AuthContext } from '@/context/store';
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { FiEye, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const JobPost = () => {
  const { auth } = useContext(AuthContext);
  const [jobList, setJobList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:7001/api/jobs/view?page=${page}&perPage=5`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        setJobList(response.data.jobListing);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      }
    } catch (e) {
      console.error('Error fetching jobs:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      fetchData(currentPage);
    }
  }, [currentPage, auth.token]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7001/api/jobs/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        // If we're on the last page and it's the only item, go back a page
        if (jobList.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchData(currentPage);
        }
      }
    } catch (e) {
      console.error('Error deleting job:', e.message);
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Posts</h1>
            <p className="mt-2 text-gray-600">Manage all your job postings in one place</p>
          </div>
          <Link 
            href={'/dashboard/jobpost/createpost'}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </div>

        {/* Job List Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : jobList.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No job posts found. Create your first job post!
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobList.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.department || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.jobType === 'Full Time' ? 'bg-green-100 text-green-800' : 
                            item.jobType === 'Part Time' ? 'bg-blue-100 text-blue-800' : 
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {item.jobType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <Link 
                              href={`/view/${item._id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="View"
                            >
                              <FiEye className="h-5 w-5" />
                            </Link>
                            <Link 
                              href={`/dashboard/jobpost/update/${item._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(item._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Delete Confirmation Modal */}
              {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
                    <p className="text-gray-600 mb-6">Are you sure you want to delete this job post? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(deleteConfirm)}
                        className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPost;