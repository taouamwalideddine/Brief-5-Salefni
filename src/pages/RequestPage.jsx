import React, { useState, useEffect } from "react";

const RequestPage = ({ simulationId }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    employmentTypeId: "",
    jobId: "",
    monthlyIncome: "",
    comment: ""
  });

  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/employmentTypes")
      .then(res => res.json())
      .then(setEmploymentTypes);

    fetch("http://localhost:4000/jobs")
      .then(res => res.json())
      .then(setJobs);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("http://localhost:4000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        simulationId,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });
    setSubmitted(true);
  };

  if (submitted) {
    return <p>Your application was submitted!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <select name="employmentTypeId" value={form.employmentTypeId} onChange={handleChange} required>
        <option value="">Select Employment Type</option>
        {employmentTypes.map(type => (
          <option key={type.id} value={type.id}>{type.label}</option>
        ))}
      </select>
      <select name="jobId" value={form.jobId} onChange={handleChange} required>
        <option value="">Select Job</option>
        {jobs.map(job => (
          <option key={job.id} value={job.id}>{job.label}</option>
        ))}
      </select>
      <input name="monthlyIncome" placeholder="Monthly Income" type="number" value={form.monthlyIncome} onChange={handleChange} required />
      <textarea name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} />
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default RequestPage;
