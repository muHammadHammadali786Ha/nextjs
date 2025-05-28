'use client';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/store';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/motion';
import { FiBookmark } from 'react-icons/fi';
// import { useRouter } from 'next/navigation';
const Card = () => {
  const [jobListing, setJobListing] = useState([]);
  const [file, setFile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const getData = async (page = 1, query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7001/api/jobs/views?page=${page}&perPage=6&search=${query}`);
      console.log(response.data);
      
      setJobListing(response.data.jobListing);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error("Error fetching job listings");
    }
    setLoading(false);
  };

  const getFile = async () => {
    try {
      const responseFile = await axios.get(`http://localhost:7001/api/files/${auth.user._id}`);
      setFile(responseFile.data);
    } catch (error) {
      // toast.error("Error fetching user files");
    }
  };

  useEffect(() => {
    getData(currentPage, searchQuery);
    getFile();
  }, [currentPage, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const savePost = async (jobID) =>{

    try {
      const response = await axios.post(`http://localhost:7001/api/post/save`,{jobID},{
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });

      console.log(response.data);
      if (response.data.success) {
        toast.success("Post saved successfully!");
      }

    } catch (error) {
      toast.error("Error saving post",error.message);
      
    }

  }

  const handleApply = async (inter_id, emp_id, title,test) => {
    console.log(test);
    // console.log(skills);
    
    if (test) {
      // const skillsString = encodeURIComponent(JSON.stringify(skills));
        router.push(`/test/${inter_id}`);
    }

    // const applyData = {
    //   internShipID: inter_id,
    //   employeeID: emp_id,
    //   candidateID: auth.user._id,
    //   JobTitle: title,
    //   resume: file[0]?.filePath || '',
    // };

    // try {
    //   const response = await axios.post('http://localhost:7001/api/applicants/apply', applyData);
    //   if (response.status === 201) {
    //     toast.success("Application submitted successfully!");
    //   } else {
    //     toast.error("Failed to submit application");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while applying");
    // }
  };

  const handleView = (jobId) => {
    router.push(`/view/${jobId}`);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Hero Section */}
      <motion.div
        variants={fadeIn('down', 'tween', 0.2, 1)}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse through our curated list of opportunities and take the next step in your career.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="max-w-3xl mx-auto mb-12 relative"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search for jobs, companies, or locations..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-6 py-4 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
          />
          {searchQuery && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-500 p-1 rounded-full hover:bg-gray-200 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job Cards */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            {jobListing.length > 0 ? (
              <>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobListing.map((item, index) => (
                    <motion.div
                      key={item._id}
                      variants={fadeIn('up', 'tween', index * 0.1, 1)}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {item.jobType} 
                          </motion.span>
                          <div onClick={() => savePost(item._id)} className="cursor-pointer">
                          <FiBookmark className="h-6 w-6 text-green-700" />
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{item.location}</span>
                        </div>
                        
                        {item.salary && (
                          <div className="flex items-center text-gray-600 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{item.salary}</span>
                          </div>
                        )}
                        
                        <p className="text-gray-600 mb-6 line-clamp-3">{item.descriptions}</p>
                        
                        <div className="flex justify-between space-x-3">
                          <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleView(item._id)}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                          >
                            View Details
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleApply(item._id, item.employeeID, item.title, item.requireTestBeforeApply)}
                            className="flex-1 py-2 px-4 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                          >
                            Apply Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    variants={fadeIn('up', 'tween', 0.4, 1)}
                    className="flex items-center justify-center mt-12 space-x-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-gray-100 border border-gray-300'}`}
                    >
                      Previous
                    </motion.button>
                    
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <motion.button
                            key={pageNum}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                          >
                            {pageNum}
                          </motion.button>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <span className="px-2">...</span>
                      )}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        >
                          {totalPages}
                        </motion.button>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-gray-100 border border-gray-300'}`}
                    >
                      Next
                    </motion.button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                variants={fadeIn('up', 'tween', 0.3, 1)}
                className="text-center py-12"
              >
                <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Card;