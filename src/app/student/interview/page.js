'use client'
import { useEffect, useState ,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/store';
import { CalendarIcon, VideoCameraIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function InterviewList() {
  const { auth } = useContext(AuthContext);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:7001/api/interviews/applicant', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.token) fetchInterviews();
  }, [auth.token]);

  const confirmInterview = async (interviewId) => {
    // console.log(auth.token);
    console.log(interviewId);
    
    try {
      const response = await axios.post(`http://localhost:7001/api/interviews/${interviewId}/confirm`, { status: "confirmed" }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      // setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center py-8">Loading interviews...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Scheduled Interviews</h2>
      
      {interviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any scheduled interviews yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview._id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{interview.jobId?.title || 'Interview'}</h3>
                  <p className="text-gray-600">With {interview.recruiterId?.company || 'Company'}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  interview.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  interview.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {interview.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>
                    {new Date(interview.dateTime).toLocaleDateString()} at{' '}
                    {new Date(interview.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  {interview.interviewType === 'video' && (
                    <>
                      <VideoCameraIcon className="h-5 w-5 mr-2" />
                      <a href={interview.meetingLink} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                        Join Video Call
                      </a>
                    </>
                  )}
                  {interview.interviewType === 'phone' && (
                    <>
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      <span>{interview.phoneNumber}</span>
                    </>
                  )}
                  {interview.interviewType === 'in-person' && (
                    <>
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{interview.location}</span>
                    </>
                  )}
                </div>
              </div>

              {interview.notes && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Additional Notes:</h4>
                  <p className="text-gray-600 mt-1">{interview.notes}</p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => confirmInterview(interview._id)}
                  disabled={interview.status === 'confirmed'}
                  className={`px-4 py-2 rounded-md text-sm ${
                    interview.status === 'confirmed'
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {interview.status === 'confirmed' ? 'Confirmed' : 'Confirm Attendance'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}