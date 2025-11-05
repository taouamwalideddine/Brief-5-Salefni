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
    const [ result, setResult] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const principal = parseFloat(form.amount)  || 0;
        const months = parseFloat(form.duration)  || 0;
        const annualRate = parseFloat(form.rate)  || 0;
        const monthlyRate = parseFloat(form.rate)  /100 /12;
        const fees = parseFloat(form.fees)  || 0;
        const insuranceRate = parseFloat(form.insurance)  || 0;
        const insuranceCost = parseFloat(insuranceRate / 100)* principal;

        // loan formula for fixed rate loans
        // M = P * r *( 1+ r)^n /((1 + r)^n - 1)
        let monthlyPayment = 0;
        if (monthlyPayment > 0 && months > 0){
            monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
        }

        const totalCost = (monthlyPayment * months) + fees + insuranceCost;
        setResult({
            monthlyPayment: monthlyPayment.toFixed(2),
            totalCost: totalCost.toFixed(2),
            months
        });
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
                    
                />
                <input
                    name="insurance"
                    type="number"
                    placeholder="Insurance (%) (Optional)"
                    value={form.insurance}
                    onChange={handleChange}
                    
                />
                <button type="submit">Simulate</button>
            </form>
            {result && (
                <div style ={{marginTop:"20px"}}>
                    <h2>Result :</h2>
                    <p>Monthly Cost{result.monthlyPayment}</p>
                    <p>Total Cost:{result.totalCost}</p>
                    <p>Duration{result.months}</p>
                </div>
            )}
        </div>
    );
};
export default SimulationPage;  