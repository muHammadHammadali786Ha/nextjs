'use client';

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import { AuthContext } from '@/context/store';

const ApplyInternship = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    coverLetter: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('internShipID', id);
    form.append('candidateID', auth.user._id);
    form.append('JobTitle', title);
    form.append('coverLetter', formData.coverLetter);
    form.append('resume', formData.resume);

    try {
      console.log(form);
      
      const response = await axios.post('http://localhost:7001/api/applicants/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      if (response.status === 201) {
        alert('Application submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
      enctype="multipart/form-data"
    >
      <h2>{id}</h2>
      <h2>{title}</h2>
      <h2>{auth.user._id}</h2>
      <h2 className="text-2xl font-semibold text-center text-primary">
        Apply for Internship
      </h2>

      {/* Cover Letter */}
      <div>
        <label
          htmlFor="coverLetter"
          className="block text-sm font-medium text-gray-700"
        >
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        ></textarea>
      </div>

      {/* Resume Upload */}
      <div>
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-gray-700"
        >
          Resume
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-600 transition duration-200"
      >
        Apply
      </button>
    </form>
  );
};

export default ApplyInternship;
