export const saveSimulation = async (data) => {
    const res = await fetch("http://localhost:4000/simulations",{
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(data),
    });
    return res.json();
};