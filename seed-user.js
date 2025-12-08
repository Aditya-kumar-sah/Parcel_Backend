(async () => {
  try {
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Insurance Admin",
        email: "insurance.admin@company.com",
        password: "Admin@123",
        department: "insurance",
        role: "approver"
      })
    });

    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
})();
