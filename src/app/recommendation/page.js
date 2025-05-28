'use client'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/store';
import axios from 'axios';
import Card1 from '@/components/Card1';

const RecommendationPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);
    const userSkills = auth?.user?.profile?.studentData?.skills;


    

    useEffect(() => {
        const fetchRecommendations = async () => {
            console.log(userSkills);
            
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.post('http://localhost:8000/recommend-internships', 
                    { user_skills: userSkills }, 
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (response.data.success) {
                    setRecommendations(response.data.results);
                } else {
                    setError('Failed to get recommendations');
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setError('Error fetching recommendations. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (userSkills?.length > 0) {
            fetchRecommendations();
        } else {
            setLoading(false);
            setError('No skills found in your profile');
        }
    }, [userSkills]);

    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen py-10 mb-32">
                <div className="container mx-auto px-4 mb-24">
                    <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Recommended Internships</h1>
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading recommendations...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-100 min-h-screen py-10 mb-32">
                <div className="container mx-auto px-4 mb-24">
                    <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Recommended Internships</h1>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10 mb-32">
            <div className="container mx-auto px-4 mb-24">
                <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Recommended Internships</h1>
                
                {recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.map((job) => (
                            <Card1 
                                key={job.job_id}
                                job={job}
                                matchedSkills={job.skills_matched}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-600">No recommendations found based on your skills.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationPage;