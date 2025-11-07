import React, { useEffect } from "react";

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [filterStatus , setFilterStatus] = useState("");
    const [searchTerm, setSearchTerm] = useSTate("");

    useEffect(() => {
        fetch("http://localhost:4000/applications")
        .then(res => res.json())
        .then(setApplications);
    }, []);

    const filteredApplications = applications.filter(app => {
        return (
            (filterStatus ? app.status === filterStatus : true) &&
            (searchTerm
                ? app.NullName.toLowerCase().includes(searchTerm.toLowerCase())
                : true)
        );
    });

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <label> Status Filler :</label>
                <select value = {filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map(app => (
                    <tr key={app.id}>
                      <td>{app.fullName}</td>
                      <td>{app.email}</td>
                      <td>{app.status}</td>
                      <td>{app.priority ? "Yes" : "No"}</td>
                      <td>{new Date(app.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminDashboard;