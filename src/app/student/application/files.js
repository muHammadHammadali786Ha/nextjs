import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/store";
import { FiFile, FiTrash2, FiDownload, FiClock } from "react-icons/fi";
import { toast } from "react-toastify";

const File = () => {
    const { auth } = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFiles = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:7001/api/files/${auth.user._id}`);
            setFiles(response.data);
        } catch (error) {
            toast.error("Error fetching files");
            console.error("Error fetching files:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const deleteFile = async (id) => {
        if (!window.confirm("Are you sure you want to delete this file?")) return;
        
        try {
            const response = await axios.delete(`http://localhost:7001/api/files/delete/${id}`);
            if (response.data.success) {
                toast.success("File deleted successfully");
                fetchFiles();
            } else {
                toast.error("Failed to delete file");
            }
        } catch (error) {
            toast.error("Error deleting file");
            console.error("Delete error:", error);
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
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Your Uploaded Documents</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your uploaded files</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Document
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Upload Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {files.length > 0 ? (
                            files.map((file) => (
                                <tr key={file._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FiFile className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                    {file.filename}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {file.fileType}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FiClock className="mr-2 flex-shrink-0 h-4 w-4 text-gray-400" />
                                            {new Date(file.uploadDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <a
                                                href={`http://localhost:7001/${file.filePath}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-900 flex items-center"
                                            >
                                                <FiDownload className="mr-1" /> Download
                                            </a>
                                            <button
                                                onClick={() => deleteFile(file._id)}
                                                className="text-red-600 hover:text-red-900 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No documents uploaded yet. Upload your first document to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {files.length > 0 && (
                <div className="px-6 py-3 border-t border-gray-200 text-xs text-gray-500">
                    Showing {files.length} {files.length === 1 ? 'document' : 'documents'}
                </div>
            )}
        </div>
    );
};

export default File;