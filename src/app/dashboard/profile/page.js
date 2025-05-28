'use client';
import { AuthContext } from '@/context/store';
import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../../../public/assets/assets';
import Image from 'next/image';
import { FaEdit, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    position: '',
    company: '',
    yearsOfExperience: '',
    industry: '',
    skills: [],
    certifications: '',
    linkedinProfile: '',
    whatsappNumber: '',
  });
  const { auth } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!auth?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-200 rounded"></div>
              <div className="h-4 bg-blue-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: name === "skills" ? value.split(",").map(skill => skill.trim()) : value
    }));
  };

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const updateProfile = async () => {
    try {
      const response = await axios.post('http://localhost:7001/api/v1/users/profile/', profileData,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        handleCloseDialog();
        // Optionally add a success toast/notification here
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally add an error toast/notification here
    }
  }

  // useEffect(async()=>{
  //   const fetchProfile = await axios.get('http://localhost:7001/api/v1/users/profile/');
    
  //   fetchProfile();
  // })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/30 overflow-hidden shadow-lg">
                  <Image
                    className="w-full h-full object-cover"
                    src={assets.avatar}
                    alt="Profile Avatar"
                    width={128}
                    height={128}
                  />
                </div>
                <button 
                  onClick={handleEditClick}
                  className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-all duration-200 group-hover:opacity-100"
                >
                  <FaEdit className="text-blue-600 text-lg" />
                </button>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                  {auth.user.username.toUpperCase()}
                </h1>
                <p className="text-blue-100 mb-2">{auth.user.role}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  {profileData.linkedinProfile && (
                    <a 
                      href={profileData.linkedinProfile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-100 hover:text-white transition-colors"
                    >
                      <FaLinkedin className="mr-1" /> LinkedIn
                    </a>
                  )}
                  {profileData.whatsappNumber && (
                    <a 
                      href={`https://wa.me/${profileData.whatsappNumber}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-100 hover:text-white transition-colors"
                    >
                      <FaWhatsapp className="mr-1" /> WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Professional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Position</h3>
                    <p className="mt-1 text-gray-800">
                      {auth.user.profile.employeeData.position || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company</h3>
                    <p className="mt-1 text-gray-800">
                      {auth.user.profile.employeeData.company || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                    <p className="mt-1 text-gray-800">
                      {auth.user.profile.employeeData.yearsOfExperience ? `${auth.user.profile.employeeData.yearsOfExperience} years` : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                    <p className="mt-1 text-gray-800">
                      {auth.user.profile.employeeData.industry || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills & Certifications */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Skills & Certifications
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Skills</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {auth.user.profile.employeeData.skills ? (
                        auth.user.profile.employeeData.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill.trim()}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No skills added</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
                    <p className="mt-1 text-gray-800">
                      {auth.user.profile.employeeData.certifications || 'No certifications added'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-gray-800">{auth.user.email}</p>
                </div>
                {profileData.whatsappNumber && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${profileData.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {profileData.whatsappNumber}
                      <FiExternalLink className="ml-1 text-sm" />
                    </a>
                  </div>
                )}
                {profileData.linkedinProfile && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">LinkedIn</h3>
                    <a 
                      href={profileData.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      View Profile
                      <FiExternalLink className="ml-1 text-sm" />
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={handleEditClick}
                className="mt-6 w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Job Posts Section */}
          <div className="p-6 sm:p-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Jobs Posted
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Job Card - Replace with dynamic data */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Software Engineer</h3>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      Full-Time
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Remote
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">We're looking for an experienced software engineer to join our team.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Posted 2 days ago</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Details →
                  </button>
                </div>
              </div>
              
              {/* Add more job cards dynamically */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Product Manager</h3>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                      Contract
                    </span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Hybrid
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Lead our product development team to create amazing user experiences.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Posted 1 week ago</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Profile
                  </h2>
                  <button
                    onClick={handleCloseDialog}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={profileData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="E.g. Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={profileData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Your current company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={profileData.yearsOfExperience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="E.g. 5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                      </label>
                      <input
                        type="text"
                        name="industry"
                        value={profileData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="E.g. Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={profileData.skills}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="E.g. JavaScript, React, Node.js"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certifications
                      </label>
                      <input
                        type="text"
                        name="certifications"
                        value={profileData.certifications}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="E.g. AWS Certified, PMP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        name="linkedinProfile"
                        value={profileData.linkedinProfile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={profileData.whatsappNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="E.g. 1234567890"
                      />
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;