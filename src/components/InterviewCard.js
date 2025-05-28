'use client'
import { useState } from 'react'
import {
  CalendarIcon,
  VideoCameraIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

export default function InterviewCard({ interview, onComplete, onCancel, activeTab }) {
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleComplete = async () => {
    setIsSubmitting(true)
    await onComplete(interview._id, feedback)
    setIsSubmitting(false)
  }

  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5 text-blue-500" />
            {interview.jobId?.title || 'No title'}
          </h3>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            {interview.applicantId?.name || 'No name'}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs ${
          interview.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
          interview.status === 'completed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {interview.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-gray-700">
          <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
          <span>
            {new Date(interview.dateTime).toLocaleDateString()} at{' '}
            {new Date(interview.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          {interview.interviewType === 'video' && (
            <>
              <VideoCameraIcon className="h-5 w-5 mr-2 text-gray-400" />
              <a href={interview.meetingLink} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                Join Meeting
              </a>
            </>
          )}
          {interview.interviewType === 'phone' && (
            <>
              <PhoneIcon className="h-5 w-5 mr-2 text-gray-400" />
              <span>{interview.phoneNumber}</span>
            </>
          )}
          {interview.interviewType === 'in-person' && (
            <>
              <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
              <span>{interview.location}</span>
            </>
          )}
        </div>
      </div>

      {activeTab === 'completed' && interview.feedback && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <h4 className="font-medium text-sm">Interview Feedback:</h4>
          <p className="text-gray-600 mt-1">{interview.feedback}</p>
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onCancel(interview._id)}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
          >
            Cancel Interview
          </button>
          
          <div className="flex-1 max-w-md">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter feedback..."
              className="w-full p-2 border rounded-md text-sm"
              rows={2}
            />
          </div>
          
          <button
            onClick={handleComplete}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
          >
            {isSubmitting ? 'Completing...' : 'Mark Complete'}
          </button>
        </div>
      )}
    </div>
  )
}