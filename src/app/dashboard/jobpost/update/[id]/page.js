'use client';
import { AuthContext } from '@/context/store';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const Update = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const router = useRouter();
  const { auth } = useContext(AuthContext);

  // State for managing job data
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    jobType: 'Full Time',
    location: '',
    salary: '',
    descriptions: '',
    requirements: '',
    deadLine: '',
    startDate: '',
    duration: '',
    durationUnit: 'weeks',
    minStipend: '',
    maxStipend: '',
    currency: 'INR',
    stipendDetails: '',
    applicationDeadline: '',
    openings: '',
    about: '',
    responsibilities: '',
    skills: '',
    perks: '',
    whoCanApply: '',
    additionalInfo: '',
    website: '',
    companyAbout: '',
  });

  const [importStatus, setImportStatus] = useState('');
  const [exportStatus, setExportStatus] = useState('');

  // Fetch existing job data
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/jobs/views/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      

      if (response.data.success) {
        const fetchedJob = response.data.jobListing;
        const formattedDeadLine = fetchedJob.deadLine?.split('T')[0]; // Format date for input field
        const formattedApplicationDeadline = fetchedJob.applicationDeadline?.split('T')[0]; // Format date for input field
        setJobData({
          ...fetchedJob,
          deadLine: formattedDeadLine,
          applicationDeadline: formattedApplicationDeadline,
        });
      }
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeHandler = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:7001/api/jobs/update/${id}`, jobData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        router.push('/dashboard/jobpost');
      }
    } catch (error) {
      console.error('Error updating job post:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
     <form
            onSubmit={onSubmitHandler}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {/* Form Sections */}

            <div className="space-y-8 p-6 sm:p-8">
           <h2 className="text-3xl text-primary font-bold">Update Job <span className="text-secondary">Post</span></h2>
              {/* Basic Information */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Basic Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the fundamental details about the position.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={jobData.title}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={jobData.department}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jobType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Type *
                    </label>
                    <select
                      id="jobType"
                      name="jobType"
                      required
                      value={jobData.jobType}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={jobData.location}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>

                  {/* Require Test Before Application Toggle */}
                  <div className="flex items-center col-span-2">
                    <label
                      htmlFor="requireTestBeforeApply"
                      className="block text-sm font-medium text-gray-700 mr-4"
                    >
                      Require Test Before Application
                    </label>
                    <button
                      type="button"
                      className={`${
                        jobData.requireTestBeforeApply
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                      onClick={() =>
                        setJobData({
                          ...jobData,
                          requireTestBeforeApply:
                            !jobData.requireTestBeforeApply,
                        })
                      }
                    >
                      <span
                        className={`${
                          jobData.requireTestBeforeApply
                            ? "translate-x-6"
                            : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                    <span className="ml-3 text-sm text-gray-500">
                      {jobData.requireTestBeforeApply
                        ? "Required"
                        : "Not required"}
                    </span>
                  </div>

                  {/* Test Configuration (shown when requireTestBeforeApply is true) */}
                  {jobData.requireTestBeforeApply && (
                    <div className="col-span-2 space-y-4 border-t pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="testDuration"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Test Duration (minutes)
                          </label>
                          <input
                            type="number"
                            id="testDuration"
                            name="testDuration"
                            min="1"
                            value={jobData.duration}
                            onChange={onChangeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="passingScore"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Passing Score (%)
                          </label>
                          <input
                            type="number"
                            id="passingScore"
                            name="passingScore"
                            min="0"
                            max="100"
                            value={jobData.passingScore}
                            onChange={onChangeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Rest of your existing form sections... */}
              {/* Internship/Job Details */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Position Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Specify the details about the position duration and
                    compensation.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={jobData.startDate}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Duration
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={jobData.duration}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="durationUnit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Unit
                      </label>
                      <select
                        id="durationUnit"
                        name="durationUnit"
                        value={jobData.durationUnit}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="minStipend"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Min Stipend
                      </label>
                      <input
                        type="number"
                        id="minStipend"
                        name="minStipend"
                        value={jobData.minStipend}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="maxStipend"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Max Stipend
                      </label>
                      <input
                        type="number"
                        id="maxStipend"
                        name="maxStipend"
                        value={jobData.maxStipend}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={jobData.currency}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="INR">INR</option>
                        <option value="PKR">PKR</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="stipendDetails"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Stipend Details
                    </label>
                    <textarea
                      id="stipendDetails"
                      name="stipendDetails"
                      rows={3}
                      value={jobData.stipendDetails}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="applicationDeadline"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Application Deadline
                    </label>
                    <input
                      type="datetime-local"
                      id="applicationDeadline"
                      name="applicationDeadline"
                      value={jobData.applicationDeadline}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="openings"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Openings
                    </label>
                    <input
                      type="number"
                      id="openings"
                      name="openings"
                      value={jobData.openings}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Position Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide detailed information about the position.
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="descriptions"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="descriptions"
                      name="descriptions"
                      rows={4}
                      value={jobData.descriptions}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About the Position
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      rows={4}
                      value={jobData.about}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="responsibilities"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Responsibilities
                    </label>
                    <textarea
                      id="responsibilities"
                      name="responsibilities"
                      rows={4}
                      value={jobData.responsibilities}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skills Required
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={jobData.skills}
                      onChange={onChangeHandler}
                      placeholder="Comma separated list of skills"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="perks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Perks & Benefits
                    </label>
                    <input
                      type="text"
                      id="perks"
                      name="perks"
                      value={jobData.perks}
                      onChange={onChangeHandler}
                      placeholder="Comma separated list of perks"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="whoCanApply"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Who Can Apply
                    </label>
                    <textarea
                      id="whoCanApply"
                      name="whoCanApply"
                      rows={3}
                      value={jobData.whoCanApply}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={3}
                      value={jobData.additionalInfo}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </section>

              {/* Company Information */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Company Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide details about your company.
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={jobData.website}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyAbout"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About the Company
                    </label>
                    <textarea
                      id="companyAbout"
                      name="companyAbout"
                      rows={4}
                      value={jobData.companyAbout}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Form Footer */}
            <div className="px-6 py-4 bg-gray-50 text-right sm:px-8">
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
              Update Job Post 
              </button>
            </div>
          </form>
    </div>
  );
};

export default Update;

//  <form className="flex flex-col gap-7 bg-white p-6 rounded-lg shadow-md" onSubmit={onSubmitHandler}>
//         <h2 className="text-3xl text-primary font-bold">Update Job <span className="text-secondary">Post</span></h2>

//         {/* Basic Information */}
//         <section>
//           <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="title"
//               placeholder="Job Title"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.title}
//             />
//             <input
//               type="text"
//               name="department"
//               placeholder="Department"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.department}
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.location}
//             />
//             <select
//               name="jobType"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.jobType}
//             >
//               <option value="Full Time">Full Time</option>
//               <option value="Part Time">Part Time</option>
//               <option value="Internship">Internship</option>
//             </select>
//           </div>
//         </section>

//         {/* Internship/Job Details */}
//         <section>
//           <h3 className="text-xl font-semibold mb-4">Internship/Job Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="date"
//               name="startDate"
//               placeholder="Start Date"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.startDate}
//             />
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 name="duration"
//                 placeholder="Duration"
//                 className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//                 onChange={onChangeHandler}
//                 value={jobData.duration}
//               />
//               <select
//                 name="durationUnit"
//                 className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//                 onChange={onChangeHandler}
//                 value={jobData.durationUnit}
//               >
//                 <option value="days">Days</option>
//                 <option value="weeks">Weeks</option>
//                 <option value="months">Months</option>
//               </select>
//             </div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 name="minStipend"
//                 placeholder="Min Stipend"
//                 className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//                 onChange={onChangeHandler}
//                 value={jobData.minStipend}
//               />
//               <input
//                 type="number"
//                 name="maxStipend"
//                 placeholder="Max Stipend"
//                 className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//                 onChange={onChangeHandler}
//                 value={jobData.maxStipend}
//               />
//               <select
//                 name="currency"
//                 className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//                 onChange={onChangeHandler}
//                 value={jobData.currency}
//               >
//                 <option value="INR">INR</option>
//               </select>
//             </div>
//             <textarea
//               name="stipendDetails"
//               placeholder="Stipend Structure Details"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.stipendDetails}
//             />
//             <input
//               type="datetime-local"
//               name="applicationDeadline"
//               placeholder="Application Deadline"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.applicationDeadline}
//             />
//             <input
//               type="number"
//               name="openings"
//               placeholder="Number of Openings"
//               className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//               onChange={onChangeHandler}
//               value={jobData.openings}
//             />
//           </div>
//         </section>

//         {/* Description */}
//         <section>
//           <h3 className="text-xl font-semibold mb-4">Description</h3>
//           <textarea
//             name="about"
//             placeholder="About the Internship/Job"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.about}
//           />
//           <textarea
//             name="responsibilities"
//             placeholder="Responsibilities"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.responsibilities}
//           />
//           <input
//             type="text"
//             name="skills"
//             placeholder="Skills Required (e.g., Communication, Programming)"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.skills}
//           />
//           <input
//             type="text"
//             name="perks"
//             placeholder="Perks (e.g., Certificate, Flexible Hours)"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.perks}
//           />
//           <textarea
//             name="whoCanApply"
//             placeholder="Who Can Apply"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.whoCanApply}
//           />
//           <textarea
//             name="additionalInfo"
//             placeholder="Additional Information"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.additionalInfo}
//           />
//         </section>

//         {/* Company Information */}
//         <section>
//           <h3 className="text-xl font-semibold mb-4">Company Information</h3>
//           <input
//             type="url"
//             name="website"
//             placeholder="Company Website"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.website}
//           />
//           <textarea
//             name="companyAbout"
//             placeholder="About the Company"
//             className="w-full py-2 px-3 border rounded-md focus:outline-[#28A745]"
//             onChange={onChangeHandler}
//             value={jobData.companyAbout}
//           />
//         </section>

//         <button type="submit" className="w-full py-3 bg-[#28A745] text-white font-bold rounded-md hover:bg-[#218838]">
//           Update Job
//         </button>
//       </form>