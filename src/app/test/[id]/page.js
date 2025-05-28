"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/store";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
// import toast from 'react-hot-toast';

export default function Quiz() {
  const { auth } = useContext(AuthContext);
  const [mcqs, setMcqs] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobLoading, setJobLoading] = useState(true);
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [file, setFile] = useState([]);
  const { id } = useParams();

  const getFile = async () => {
    try {
      const responseFile = await axios.get(
        `http://localhost:7001/api/files/${auth.user._id}`
      );
      setFile(responseFile.data);
    } catch (error) {
      toast.error("Error fetching user files");
    }
  };

  // Fetch job details first

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7001/api/jobs/views/${id}`
        );
        setJob(response.data.jobListing);
      } catch (err) {
        setError("Failed to load job details. Please try again.");
        console.error("Failed to load job:", err);
      } finally {
        setJobLoading(false);
      }
      getFile(); // Fetch user files after job details are loaded
    };

    fetchJob();
  }, [id]);

  // Fetch MCQs only when test is started and job data is available
  const startTest = async () => {
    // console.log("====================================");
    // console.log(job);
    // console.log("====================================");
    if (!job) return;

    setIsLoading(true);
    setError(null);
    setTestStarted(true);

    try {
      const response = await axios.post("http://localhost:5000/generate-mcqs", {
        skills: job.skills,
      });
      setMcqs(response.data.mcqs);
    } catch (err) {
      setError("Failed to load questions. Please try again.");
      console.error("Failed to load MCQs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (qIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  // Submit quiz, calculate score, and submit application
  const submitQuiz = async () => {
    // Calculate score

    const correct = mcqs.reduce(
      (acc, q, index) => (selectedAnswers[index] === q.answer ? acc + 1 : acc),
      0
    );
    setScore(correct);
    // Then submit the application data
    try {
      const applyData = {
        internShipID: id, // Using the id from URL params
        employeeID: job.employeeID, // Assuming job has postedBy field
        candidateID: auth.user._id,
        JobTitle: job.title,
        resume: file[0]?.filePath || "", // Adjust based on your user data structure
        testScore: correct, // Including the test score in application
      };
      // console.log("====================================");
      // console.log(applyData);
      // console.log("====================================");
      const applicationResponse = await axios.post(
        "http://localhost:7001/api/applicants/apply",
        applyData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (applicationResponse.status === 201) {
        toast.success("Test completed and application submitted successfully!");
      } else {
        toast.error("Test completed but failed to submit application");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred while submitting");
    }

    setSelectedAnswers({});
  };

  // ... rest of the component code remains the same ...
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Skill Test (50 MCQs)
        </h1>

        {jobLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3">Loading job details...</span>
          </div>
        ) : !testStarted ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">
              {job?.title} Skill Test
            </h2>
            <p className="mb-6">
              Required skills: {job?.skills?.join(", ") || "Not specified"}
            </p>
            <button
              onClick={startTest}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
            >
              Start Test
            </button>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3">Loading questions...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <>
            <div className="space-y-6">
              {mcqs.map((q, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {q.question}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(q.options).map(([opt, text]) => (
                      <label
                        key={opt}
                        className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                          selectedAnswers[index] === opt
                            ? "bg-indigo-50 border-indigo-200 border"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${index}`}
                          checked={selectedAnswers[index] === opt}
                          onChange={() => handleAnswerSelect(index, opt)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700">
                          <span className="font-medium">{opt}.</span> {text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center space-y-4">
              <button
                onClick={submitQuiz}
                disabled={Object.keys(selectedAnswers).length < mcqs.length}
                className={`px-6 py-3 rounded-md font-medium text-white ${
                  Object.keys(selectedAnswers).length < mcqs.length
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Submit Quiz
              </button>

              {score !== null && (
                <div className="text-center p-4 bg-indigo-50 rounded-lg w-full">
                  <p className="text-xl font-semibold text-indigo-700">
                    Your score: {score}/50 ({Math.round((score / 50) * 100)}%)
                  </p>
                  <p className="text-gray-600 mt-1">
                    {score >= 40
                      ? "Excellent!"
                      : score >= 25
                      ? "Good job!"
                      : "Keep practicing!"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
