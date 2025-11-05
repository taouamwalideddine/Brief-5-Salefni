import React, { useState } from "react";
import { saveSimulation } from "../services/api";

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
        
        const amortization = [];
        let remaining = principal;

        for (let month = 1; month <= months ; month ++){
            const intrestPayment = remaining * monthlyRate;
            const principalPayment = monthlyPayment - intrestPayment;
            remaining -= principalPayment;
            amortization.push({
                month,
                intrest : intrestPayment.toFixed(2),
                principal: principalPayment.toFixed(2),
                balance: Math.abs(remaining).toFixed(2)
            });
        }

        setResult({
            monthlyPayment : monthlyPayment.toFixed(2),
            totalCost : totalCost.toFixed(2),
            months,
            amortization
        }); 
        saveSimulation({
          ...form, 
          result: {
            monthlyPayment: monthlyPayment.toFixed(2),
            totalCost: totalCost.toFixed(2),
            months,
            amortization
          },
          createdAt: new Date().toISOString()
        });

    };

    return (
        <div>
            <h1>Credit simulation</h1>
            <form onSubmit={handleSubmit}>
                <select
                    name = "type"
                    value={form.type}
                    onChange={handleChange}
                    required
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

                    <h3>Amortization Table</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Intrest</th>
                                <th>Principal</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.amortization.map((row) => (
                                <tr key={row.month}>
                                    <td>{row.month}</td>
                                    <td>{row.intrest}</td>
                                    <td>{row.principal}</td>
                                    <td>{row.balance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {result && (
  <button
    style={{ marginTop: "10px" }}
    onClick={() => {
      // Navigate to /request or open a request form modal
      // Pass simulation result data to the request page (via context or state)
    }}
  >
    Submit Credit Request
  </button>
)}

        </div>
    );
};
export default SimulationPage;  