"use client";
import { AuthContext } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const JobDetailPage = () => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [w, setw] = useState("");
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7001/api/jobs/views/${id}`
      );
      setJob(response.data.jobListing);
      const whatsappNumber = response.data.whatsappNumber;
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20I%20am%20interested%20in%20connecting%20with%20you`;
      setw(whatsappLink);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                  {job.jobType}
                </span>
                <span className="inline-flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={w}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Image
                  src="/assets/whatsapp.png"
                  alt="WhatsApp Icon"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span>Chat on WhatsApp</span>
              </a>
              <button className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Job</h2>
              <p className="text-gray-700 leading-relaxed">{job.about}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
              </div>
            )}

            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Required</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Who Can Apply */}
            {job.whoCanApply && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Who Can Apply</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.whoCanApply}</p>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="text-gray-900">{job.companyAbout}</p>
                </div>
                {job.website && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Website</h3>
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {job.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="text-gray-900">{job.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                  <p className="text-gray-900">{job.jobType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-gray-900">{job.location}</p>
                </div>
                {job.salary && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                    <p className="text-gray-900">{job.salary}</p>
                  </div>
                )}
                {job.startDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                    <p className="text-gray-900">{new Date(job.startDate).toLocaleDateString()}</p>
                  </div>
                )}
                {job.duration && job.durationUnit && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                    <p className="text-gray-900">
                      {job.duration} {job.durationUnit}
                    </p>
                  </div>
                )}
                {job.applicationDeadline && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Application Deadline</h3>
                    <p className="text-gray-900">
                      {new Date(job.applicationDeadline).toLocaleString()}
                    </p>
                  </div>
                )}
                {job.openings !== undefined && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Openings</h3>
                    <p className="text-gray-900">{job.openings}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stipend Details */}
            {job.minStipend !== undefined && job.maxStipend !== undefined && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Stipend Details</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Stipend Range</h3>
                    <p className="text-gray-900">
                      {job.minStipend} - {job.maxStipend} {job.currency}
                    </p>
                  </div>
                  {job.stipendDetails && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Details</h3>
                      <p className="text-gray-900">{job.stipendDetails}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Perks */}
            {job.perks && job.perks.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Perks</h2>
                <ul className="space-y-2">
                  {job.perks.map((perk, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;