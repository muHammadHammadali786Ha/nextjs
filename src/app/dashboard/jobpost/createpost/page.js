"use client";
import { AuthContext } from "@/context/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { FiUpload, FiDownload, FiFileText, FiFile } from "react-icons/fi";

const CreatePost = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const [jobData, setJobData] = useState({
    employeeID: auth.user._id,
    title: "",
    department: "",
    jobType: "Full Time",
    location: "",
    salary: "",
    descriptions: "",
    requirements: "",
    deadLine: "",
    startDate: "",
    duration: "",
    durationUnit: "weeks",
    minStipend: "",
    maxStipend: "",
    currency: "INR",
    stipendDetails: "",
    applicationDeadline: "",
    openings: "",
    about: "",
    responsibilities: "",
    skills: "",
    perks: "",
    whoCanApply: "",
    additionalInfo: "",
    website: "",
    companyAbout: "",
    requireTestBeforeApply: false, // New field
    testDuration: 30, // Default test duration in minutes
    passingScore: 70, // Default passing score percentage
  });

  const [activeTab, setActiveTab] = useState("create");
  const [importStatus, setImportStatus] = useState("");
  const [exportStatus, setExportStatus] = useState("");

  const onChangeHandler = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7001/api/jobs/create",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        router.push("/dashboard/jobpost");
      }
    } catch (error) {
      console.error("Error creating job post:", error);
    }
  };

  const handleJSONImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportStatus("Importing JSON...");
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          const response = await axios.post(
            "http://localhost:7001/api/employer/jobs/import/json",
            jsonData,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setImportStatus(
            `Import successful: ${
              response.data.message || "Jobs imported to the database."
            }`
          );
        } catch (error) {
          console.error("JSON import error:", error);
          setImportStatus(
            `Import failed: ${error.message || "Invalid JSON file."}`
          );
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCSVImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportStatus("Importing CSV...");
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvData = e.target.result;
        try {
          const response = await axios.post(
            "http://localhost:7001/api/employer/jobs/import/csv",
            { csvData },
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "text/csv",
              },
            }
          );
          setImportStatus(
            `CSV import successful: ${
              response.data.message || "Jobs imported to the database."
            }`
          );
        } catch (error) {
          console.error("CSV import error:", error);
          setImportStatus(
            `CSV import failed: ${
              error.message || "Error processing CSV file."
            }`
          );
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJSONExport = async () => {
    setExportStatus("Exporting JSON...");
    try {
      const response = await axios.get(
        "http://localhost:7001/api/employer/jobs/export/json",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "job_postings.json");
      document.body.appendChild(link);
      link.click();
      setExportStatus(
        "Export successful: File downloaded as job_postings.json"
      );
    } catch (error) {
      console.error("JSON export error:", error);
      setExportStatus(
        `Export failed: ${error.message || "Could not export jobs."}`
      );
    }
  };

  const handleCSVExport = async () => {
    setExportStatus("Exporting CSV...");
    try {
      const response = await axios.get(
        "http://localhost:7001/api/employer/jobs/export/csv",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "job_postings.csv");
      document.body.appendChild(link);
      link.click();
      setExportStatus(
        "CSV export successful: File downloaded as job_postings.csv"
      );
    } catch (error) {
      console.error("CSV export error:", error);
      setExportStatus(
        `CSV export failed: ${error.message || "Could not export jobs as CSV."}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Job Post Management
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            {activeTab === "create"
              ? "Create a new job posting"
              : "Import or export job postings"}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("create")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "create"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Create Job Post
          </button>
          <button
            onClick={() => setActiveTab("import-export")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "import-export"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Import/Export
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "create" ? (
          <form
            onSubmit={onSubmitHandler}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {/* Form Sections */}
            <div className="space-y-8 p-6 sm:p-8">
              {/* Basic Information */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Basic Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the fundamental details about the position.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={jobData.title}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={jobData.department}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jobType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Type *
                    </label>
                    <select
                      id="jobType"
                      name="jobType"
                      required
                      value={jobData.jobType}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={jobData.location}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>

                  {/* Require Test Before Application Toggle */}
                  <div className="flex items-center col-span-2">
                    <label
                      htmlFor="requireTestBeforeApply"
                      className="block text-sm font-medium text-gray-700 mr-4"
                    >
                      Require Test Before Application
                    </label>
                    <button
                      type="button"
                      className={`${
                        jobData.requireTestBeforeApply
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                      onClick={() =>
                        setJobData({
                          ...jobData,
                          requireTestBeforeApply:
                            !jobData.requireTestBeforeApply,
                        })
                      }
                    >
                      <span
                        className={`${
                          jobData.requireTestBeforeApply
                            ? "translate-x-6"
                            : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                    <span className="ml-3 text-sm text-gray-500">
                      {jobData.requireTestBeforeApply
                        ? "Required"
                        : "Not required"}
                    </span>
                  </div>

                  {/* Test Configuration (shown when requireTestBeforeApply is true) */}
                  {jobData.requireTestBeforeApply && (
                    <div className="col-span-2 space-y-4 border-t pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="testDuration"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Test Duration (minutes)
                          </label>
                          <input
                            type="number"
                            id="testDuration"
                            name="testDuration"
                            min="1"
                            value={jobData.testDuration}
                            onChange={onChangeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="passingScore"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Passing Score (%)
                          </label>
                          <input
                            type="number"
                            id="passingScore"
                            name="passingScore"
                            min="0"
                            max="100"
                            value={jobData.passingScore}
                            onChange={onChangeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Rest of your existing form sections... */}
              {/* Internship/Job Details */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Position Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Specify the details about the position duration and
                    compensation.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={jobData.startDate}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Duration
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={jobData.duration}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="durationUnit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Unit
                      </label>
                      <select
                        id="durationUnit"
                        name="durationUnit"
                        value={jobData.durationUnit}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="minStipend"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Min Stipend
                      </label>
                      <input
                        type="number"
                        id="minStipend"
                        name="minStipend"
                        value={jobData.minStipend}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="maxStipend"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Max Stipend
                      </label>
                      <input
                        type="number"
                        id="maxStipend"
                        name="maxStipend"
                        value={jobData.maxStipend}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={jobData.currency}
                        onChange={onChangeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="INR">INR</option>
                        <option value="PKR">PKR</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="stipendDetails"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Stipend Details
                    </label>
                    <textarea
                      id="stipendDetails"
                      name="stipendDetails"
                      rows={3}
                      value={jobData.stipendDetails}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="applicationDeadline"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Application Deadline
                    </label>
                    <input
                      type="datetime-local"
                      id="applicationDeadline"
                      name="applicationDeadline"
                      value={jobData.applicationDeadline}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="openings"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Openings
                    </label>
                    <input
                      type="number"
                      id="openings"
                      name="openings"
                      value={jobData.openings}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Position Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide detailed information about the position.
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="descriptions"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="descriptions"
                      name="descriptions"
                      rows={4}
                      value={jobData.descriptions}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About the Position
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      rows={4}
                      value={jobData.about}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="responsibilities"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Responsibilities
                    </label>
                    <textarea
                      id="responsibilities"
                      name="responsibilities"
                      rows={4}
                      value={jobData.responsibilities}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skills Required
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={jobData.skills}
                      onChange={onChangeHandler}
                      placeholder="Comma separated list of skills"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="perks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Perks & Benefits
                    </label>
                    <input
                      type="text"
                      id="perks"
                      name="perks"
                      value={jobData.perks}
                      onChange={onChangeHandler}
                      placeholder="Comma separated list of perks"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="whoCanApply"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Who Can Apply
                    </label>
                    <textarea
                      id="whoCanApply"
                      name="whoCanApply"
                      rows={3}
                      value={jobData.whoCanApply}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={3}
                      value={jobData.additionalInfo}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </section>

              {/* Company Information */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Company Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide details about your company.
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={jobData.website}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyAbout"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About the Company
                    </label>
                    <textarea
                      id="companyAbout"
                      name="companyAbout"
                      rows={4}
                      value={jobData.companyAbout}
                      onChange={onChangeHandler}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Form Footer */}
            <div className="px-6 py-4 bg-gray-50 text-right sm:px-8">
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Post Job
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8 space-y-8">
              {/* Import Section */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Import Job Postings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a file to import multiple job postings at once.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* JSON Import */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Import from JSON
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        <FiFileText className="mr-2 h-5 w-5 text-blue-500" />
                        Select JSON File
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleJSONImport}
                          className="sr-only"
                        />
                      </label>
                      <span className="text-sm text-gray-500">
                        .json files only
                      </span>
                    </div>
                  </div>

                  {/* CSV Import */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Import from CSV
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        <FiFile className="mr-2 h-5 w-5 text-green-500" />
                        Select CSV File
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleCSVImport}
                          className="sr-only"
                        />
                      </label>
                      <span className="text-sm text-gray-500">
                        .csv files only
                      </span>
                    </div>
                  </div>

                  {importStatus && (
                    <div
                      className={`p-3 rounded-md ${
                        importStatus.startsWith("Import successful")
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <p className="text-sm">{importStatus}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Export Section */}
              <section className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Export Job Postings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Download your job postings for backup or migration.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleJSONExport}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiDownload className="mr-2 h-5 w-5" />
                      Export as JSON
                    </button>

                    <button
                      onClick={handleCSVExport}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiDownload className="mr-2 h-5 w-5" />
                      Export as CSV
                    </button>
                  </div>

                  {exportStatus && (
                    <div
                      className={`p-3 rounded-md ${
                        exportStatus.startsWith("Export successful")
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <p className="text-sm">{exportStatus}</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
