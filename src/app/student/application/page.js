'use client'
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { assets } from '../../../../public/assets/assets';
import Image from 'next/image';
import { AuthContext } from '@/context/store';
import { FiUpload, FiFile, FiImage, FiFileText } from 'react-icons/fi';
import { toast } from 'react-toastify';
import  Show  from './show';
import File from './files';

const Application = () => {
  const { auth } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileType(selectedFile.type);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warning('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('candidateID', auth.user._id);

    setIsUploading(true);

    try {
      const response = await axios.post('http://localhost:7001/api/files/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('File uploaded successfully!');
        setFile(null);
        setPreviewUrl(null);
      } else {
        toast.error('Error uploading file');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading file');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!fileType) return <FiFile className="w-12 h-12 text-gray-400" />;
    
    if (fileType === 'application/pdf') {
      return <FiFileText className="w-12 h-12 text-red-500" />;
    } else if (fileType.startsWith('image/')) {
      return <FiImage className="w-12 h-12 text-blue-500" />;
    } else {
      return <FiFile className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Documents</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors hover:border-blue-500">
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept=".pdf,.jpg,.jpeg,.png" 
            hidden 
            id="file-upload" 
          />
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer flex flex-col items-center justify-center space-y-3"
          >
            <FiUpload className="w-10 h-10 text-gray-400" />
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG, PNG up to 10MB
              </p>
            </div>
          </label>
        </div>

        {/* File Preview */}
        {file && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              {getFileIcon()}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-sm text-gray-500">{Math.round(file.size / 1024)} KB</p>
              </div>
            </div>

            {/* Detailed Preview */}
            <div className="mt-4">
              {fileType === 'application/pdf' ? (
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  className="w-full h-96 border border-gray-200 rounded-md"
                />
              ) : fileType?.startsWith('image/') ? (
                <img
                  src={previewUrl}
                  alt="File preview"
                  className="max-h-80 mx-auto rounded-md border border-gray-200"
                />
              ) : (
                <div className="bg-gray-100 p-4 rounded-md text-center">
                  <p className="text-gray-500">Preview not available for this file type</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!file || isUploading}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              !file || isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Upload Document'}
          </button>
        </div>
      </form>

      {/* Uploaded Files Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Uploaded Documents</h2>
        <File />
      </div>
    </div>
  );
};

export default Application;