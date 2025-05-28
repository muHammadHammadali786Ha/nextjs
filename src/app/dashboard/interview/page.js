"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/store";
import {
  FiCalendar,
  FiCheckCircle,
  FiX,
  FiClock,
  FiUser,
  FiBriefcase,
  FiVideo,
  FiPhone,
  FiMapPin,
  FiLoader,
  FiPlus,
  FiCheck,
} from "react-icons/fi";

export default function RecruiterInterviews() {
  const { auth } = useContext(AuthContext);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const fetchInterviews = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7001/api/interviews/recruiter",
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setInterviews(res.data);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) fetchInterviews();
  }, [auth.token]);

  const filteredInterviews = interviews.filter((interview) => {
    const now = new Date();
    switch (activeTab) {
      case "upcoming":
        return (
          new Date(interview.dateTime) > now && interview.status === "scheduled"
        );
      case "confirmed":
        return interview.status === "confirmed";
      case "completed":
        return interview.status === "completed";
      case "cancelled":
        return interview.status === "cancelled";
      default:
        return true;
    }
  });

  const handleCompleteInterview = async (interviewId) => {
    try {
      await axios.post(
        `http://localhost:7001/api/interviews/${interviewId}/confirm`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchInterviews();
    } catch (error) {
      console.error("Failed to complete interview:", error);
    }
  };

  const handleCancelInterview = async (id) => {
    try {
      await axios.delete(
        `http://localhost:7001/api/interviews/${id}/`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchInterviews();
    } catch (error) {
      console.error("Failed to cancel interview:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FiBriefcase className="h-6 w-6 text-blue-500" />
          Interview Management
        </h1>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          Schedule Interview
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm -mb-px ${
            activeTab === "upcoming"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FiClock className="h-4 w-4" />
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("confirmed")}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm -mb-px ${
            activeTab === "confirmed"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FiCheck className="h-4 w-4" />
          Confirmed
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm -mb-px ${
            activeTab === "completed"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FiCheckCircle className="h-4 w-4" />
          Completed
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm -mb-px ${
            activeTab === "cancelled"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FiX className="h-4 w-4" />
          Cancelled
        </button>
      </div>

      {/* Interview List */}
      <div className="space-y-4">
        {filteredInterviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No interviews found</p>
          </div>
        ) : (
          filteredInterviews.map((interview) => (
            <div
              key={interview._id}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FiBriefcase className="h-5 w-5 text-blue-500" />
                    {interview.jobId?.title || "Interview"}
                  </h3>
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <FiUser className="h-4 w-4" />
                    {interview.applicantId?.name || "Candidate"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    interview.status === "scheduled"
                      ? "bg-yellow-100 text-yellow-800"
                      : interview.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : interview.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {interview.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <FiCalendar className="h-5 w-5 mr-2 text-gray-400" />
                  <span>
                    {new Date(interview.dateTime).toLocaleDateString()} at{" "}
                    {new Date(interview.dateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  {interview.interviewType === "video" && (
                    <>
                      <FiVideo className="h-5 w-5 mr-2 text-gray-400" />
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Join Meeting
                      </a>
                    </>
                  )}
                  {interview.interviewType === "phone" && (
                    <>
                      <FiPhone className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{interview.phoneNumber}</span>
                    </>
                  )}
                  {interview.interviewType === "in-person" && (
                    <>
                      <FiMapPin className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{interview.location}</span>
                    </>
                  )}
                </div>
              </div>

              {(activeTab === "upcoming" || activeTab === "confirmed") && (
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => handleCancelInterview(interview._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <FiX className="h-4 w-4" />
                    Cancel Interview
                  </button>
                  <button
                    onClick={() => handleCompleteInterview(interview._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <FiCheckCircle className="h-4 w-4" />
                    Mark Complete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}