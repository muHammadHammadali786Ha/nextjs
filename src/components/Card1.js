// 'use client'
// import axios from 'axios';
// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '@/context/store';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

// const Card1 = ({ recommendedIds = [] }) => {
//   const [jobListing, setJobListing] = useState([]);
//   const [file, setFile] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
  
//   const { auth } = useContext(AuthContext);
//   const router = useRouter();
// // 
//   useEffect(() => {
//     const getData = async (page = 1) => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:7001/api/jobs/views?page=${page}&perPage=6`);
//         setJobListing(response.data.jobListing);
//         setCurrentPage(response.data.currentPage);
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         toast.error("Error fetching job listings");
//       }
//       setLoading(false);
//     };

//     const getFile = async () => {
//       try {
//         const responseFile = await axios.get(`http://localhost:7001/api/files/${auth.user._id}`);
//         setFile(responseFile.data);
//       } catch (error) {
//         toast.error("Error fetching user files");
//       }
//     };

//     getData(currentPage);
//     getFile();
//   }, [currentPage]);

//   // Filter jobs based on recommended _id list
//   const filteredJobs = recommendedIds.length
//     ? jobListing.filter(job => recommendedIds.includes(job._id))
//     : jobListing;

//   const handleApply = async (inter_id, emp_id, title) => {
//     const applyData = {
//       internShipID: inter_id,
//       employeeID: emp_id,
//       candidateID: auth.user._id,
//       JobTitle: title,
//       resume: file[0]?.filePath || '',
//     };

//     try {
//       const response = await axios.post('http://localhost:7001/api/applicants/apply', applyData);
//       if (response.status === 201) {
//         toast.success("Application submitted successfully!");
//       } else {
//         toast.error("Failed to submit application");
//       }
//     } catch (error) {
//       toast.error("An error occurred while applying");
//     }
//   };

//   const handleView = (jobId) => {
//     router.push(`/view/${jobId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {filteredJobs.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredJobs.map((item) => (
//               <div 
//                 key={item._id} 
//                 className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{item.title}</h3>
//                     {recommendedIds.includes(item._id) && (
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         Recommended
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center text-gray-600">
//                       <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-500" />
//                       <span>{item.jobType}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
//                       <span>{item.location}</span>
//                     </div>
//                     {item.salary && (
//                       <div className="flex items-center text-gray-600">
//                         <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-500" />
//                         <span>{item.salary}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <p className="text-gray-600 mb-6 line-clamp-3">{item.descriptions}</p>
                  
//                   <div className="flex justify-between space-x-3">
//                     <button 
//                       onClick={() => handleView(item._id)}
//                       className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
//                     >
//                       View Details
//                     </button>
//                     <button 
//                       onClick={() => handleApply(item._id, item.employeeID, item.title)}
//                       className="flex-1 py-2 px-4 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors duration-200"
//                     >
//                       Apply Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-center mt-12 space-x-4">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-gray-100 border border-gray-300'}`}
//               >
//                 Previous
//               </button>
              
//               <div className="flex items-center space-x-2">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
                
//                 {totalPages > 5 && currentPage < totalPages - 2 && (
//                   <span className="px-2">...</span>
//                 )}
                
//                 {totalPages > 5 && currentPage < totalPages - 2 && (
//                   <button
//                     onClick={() => setCurrentPage(totalPages)}
//                     className="w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
//                   >
//                     {totalPages}
//                   </button>
//                 )}
//               </div>
              
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-gray-100 border border-gray-300'}`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="text-center py-12">
//           <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
//           <p className="text-gray-600">
//             {recommendedIds.length ? "No recommended jobs available" : "Try adjusting your search to find what you're looking for"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card1;
'use client'
import {useRouter } from 'next/navigation'
const Card1 = ({ job, matchedSkills }) => {
    const router = useRouter();
    
    const handleView = (id) =>{
        console.log(id)
        router.push(`/view/${id}`)
    }
    
  return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>
              
              <div className="flex items-center text-gray-600 mb-3">
                  <span className="mr-2">{job.location}</span>
                  <span>•</span>
                  <span className="ml-2">{job.department}</span>
              </div>
              
              <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                      {job.type}
                  </span>
              </div>
              
              <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Matched Skills ({matchedSkills.length}):</h3>
                  <div className="flex flex-wrap gap-2">
                      {matchedSkills.map((skill) => (
                          <span key={skill} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {skill}
                          </span>
                      ))}
                  </div>
              </div>
              
              <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">All Required Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                      {job.all_job_skills.map((skill) => (
                          <span 
                              key={skill} 
                              className={`text-xs px-2 py-1 rounded ${
                                  matchedSkills.includes(skill) 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-gray-100 text-gray-800'
                              }`}
                          >
                              {skill}
                          </span>
                      ))}
                  </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">Match Score: <strong>{job.similarity.toFixed(2)}</strong></span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors" onClick={() => handleView(job.jobed_id)}>
                      View Details
                  </button>
              </div>
          </div>
      </div>
  );
};

export default Card1;