import React, { useState } from "react";

const SimulationPage = () => {
    
    const [form, setForm] = useState({
        type : "",
        amount : "",
        duration : "",
        rate : "", 
        fees : "",
        insurance : ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // temp log
        console.log(form);
    };

    return (
        <div>
            <h1>Credit simulation</h1>
            <form onSubmit={handleSubmit}>
                <select
                    name = ""
                    value={form.type}
                    onChange={handleChange}
                    requirep
                >
                    <option value="">Select credit</option>
                    <option value="auto">Auto</option>
                    <option value="consumer">Consumer</option>
                    <option value="realestate">Real Estate</option>
                </select>
                <input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />
                <input
                    name="duration"
                    type="number"
                    placeholder="Duration (months)"
                    value={form.duration}
                    onChange={handleChange}
                    required
                />
                <input
                    name="rate"
                    type="number"
                    placeholder="Annual Rate (%)"
                    value={form.rate}
                    onChange={handleChange}
                    required
                />
                <input
                    name="fees"
                    type="number"
                    placeholder="Fees (Optional)"
                    value={form.fees}
                    onChange={handleChange}
                    required
                />
                <input
                    name="insurance"
                    type="number"
                    placeholder="Insurance (%) (Optional)"
                    value={form.insurance}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Simulate</button>
            </form>
        </div>
    );
};
export default SimulationPage;  