    import React, { useEffect, useState} from "react";

    const AdminDashboard = () => {
        const [applications, setApplications] = useState([]);
        const [filterStatus , setFilterStatus] = useState("");
        const [searchTerm, setSearchTerm] = useState("");
        const [selectApp, setSelectedApp] = useState(null);
        const [simulation, setSimulation] = useState(null);

        useEffect(() => {
            fetch("http://localhost:4000/applications")
            .then(res => res.json())
            .then(setApplications);
        }, []);

        const filteredApplications = applications.filter(app => {
            return (
                (filterStatus ? app.status === filterStatus : true) &&
                (searchTerm
                    ? app.fullName.toLowerCase().includes(searchTerm.toLowerCase())
                    : true)
            );
        });
        const handleRowClick = app => {
            setSelectedApp(app);
            fetch(`http://localhost:4000/simulations/${app.simulationId}`)
            .then(res => res.json())
            .then(setSimulation);
        };
        const handleStatusChange = async (e) =>{
            const newStatus = e.target.value;
            await fetch(`http://localhost:4000/applications/${selectApp.id}`,{
                method : "PATCH",
                headers :{ "Content-Type" : "aplication/json" },
                body : JSON.stringify({ status : newStatus})
            });
            setSelectedApp({ ...selectApp, status : newStatus});
        };

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
                    <tbody>
                    {filteredApplications.map(app => (
                        <td key= {app.id} onClick= {() => handleRowClick(app)} style={{ cursor : "pointer"}}>
                            <td>{app.fullName}</td>
                            <td>{app.email}</td>
                            <td>{app.status}</td>
                            <td>{app.priority ? "YAS" : "NO"}</td>
                            <td>{new Date(app.createdAt).toLocaleString()}</td>
                        </td>
                    ))}
                </tbody>
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
{selectApp && (
  <div style={{marginTop : "32px", border : "1px solid #ccc", padding : "24px", background : "#fafafa"}}>
    <h2>Application Detail</h2>
    <p><strong>Name:</strong> {selectApp.fullName}</p>
    <p><strong>Email:</strong> {selectApp.email}</p>
    <p><strong>Status:</strong> 
      <select value={selectApp.status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
    </p>
    {simulation && (
      <div>
        <h3>
          <ul>
            <li>Amount: {simulation.amount}</li>
            <li>Monthly Payment: {simulation.monthlyPayment}</li>
            <li>Duration: {simulation.months}</li>
            <li>Total Cost: {simulation.totalCost}</li>
          </ul>
        </h3>
      </div>
    )}
  </div>
)}

            </div>
        );
    };
    export default AdminDashboard;