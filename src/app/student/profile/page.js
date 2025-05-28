'use client'
import { AuthContext } from '@/context/store';
import { useContext, useState } from 'react';
import { assets } from '../../../../public/assets/assets';
import Image from 'next/image';
import Show from '../application/show';
import { FaEdit, FaGraduationCap, FaUniversity, FaCalendarAlt, FaStar, FaCode } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        degree: "",
        institution: "",
        yearOfStudy: "",
        GPA: "",
        skills: []
    });
    const { auth } = useContext(AuthContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!auth?.user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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

    const updateProfile = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:7001/api/v1/users/profile', profileData, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                handleCloseDialog();
                // Optionally show success toast
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            // Optionally show error toast
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = () => {
        setProfileData(auth.user.profile.studentData)
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="relative group">
                                <Image
                                    className="w-24 h-24 rounded-full border-4 border-white"
                                    src={assets.avatar}
                                    alt="Profile Avatar"
                                    width={96}
                                    height={96}
                                />
                                <button
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={handleEditClick}
                                    aria-label="Edit profile"
                                >
                                    <FaEdit className="text-white text-xl" />
                                </button>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{auth.user.username.toUpperCase()}</h1>
                                <p className="text-blue-100">{auth.user.email}</p>
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {auth.user.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6">
                        {/* Education Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <FaGraduationCap className="mr-2 text-blue-600" />
                                Education
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <FaUniversity className="mt-1 mr-3 text-gray-500" />
                                    <div>
                                        <h3 className="font-medium text-gray-700">Institution</h3>
                                        <p className="text-gray-600">{auth.user.profile.studentData.institution || "Not specified"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaGraduationCap className="mt-1 mr-3 text-gray-500" />
                                    <div>
                                        <h3 className="font-medium text-gray-700">Degree</h3>
                                        <p className="text-gray-600">{auth.user.profile.studentData.degree || "Not specified"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaCalendarAlt className="mt-1 mr-3 text-gray-500" />
                                    <div>
                                        <h3 className="font-medium text-gray-700">Year of Study</h3>
                                        <p className="text-gray-600">{auth.user.profile.studentData.yearOfStudy || "Not specified"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaStar className="mt-1 mr-3 text-gray-500" />
                                    <div>
                                        <h3 className="font-medium text-gray-700">GPA</h3>
                                        <p className="text-gray-600">{auth.user.profile.studentData.GPA || "Not specified"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <FaCode className="mr-2 text-blue-600" />
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {auth.user.profile.studentData.skills?.length > 0 ? (
                                    auth.user.profile.studentData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No skills added yet</p>
                                )}
                            </div>
                        </div>

                        {/* Applications Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2 inline-block">
                                Internship Applications
                            </h2>
                            <Show />
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
                                <button
                                    onClick={handleCloseDialog}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="degree"
                                        value={profileData.degree}
                                        onChange={handleChange}
                                        placeholder="e.g. Bachelor of Science"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="institution"
                                        value={profileData.institution}
                                        onChange={handleChange}
                                        placeholder="e.g. University of Example"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="year_of_Study"
                                        value={profileData.yearOfStudy}
                                        onChange={handleChange}
                                        placeholder="e.g. 3"
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="gpa"
                                        value={profileData.GPA}
                                        onChange={handleChange}
                                        placeholder="e.g. 3.5"
                                        min="0"
                                        max="4"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="skills"
                                        value={profileData.skills.join(", ")}
                                        onChange={handleChange}
                                        placeholder="e.g. JavaScript, Python, React"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseDialog}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={updateProfile}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;