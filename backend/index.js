const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ✅ Dummy Users Database
const users = [
  {
    email: "student@test.com",
    password: "1234",
    role: "student",
    redirect: "dashboard.html"
  },
  {
    email: "volunteer@thapar.edu",
    password: "1234",
    role: "volunteer",
    redirect: "volunteer_dashboard.html"
  }
];

app.post("/login", (req, res) => {
  const { username, password, rolePage } = req.body;

  console.log("LOGIN ATTEMPT:", username, password); // ✅ Debug log

  const user = users.find(u => u.email === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // ✅ Volunteer email restriction
  if (user.role === "volunteer" && !user.email.endsWith("@thapar.edu")) {
    return res.status(403).json({
      message: "Only @thapar.edu emails are allowed for volunteers"
    });
  }

  res.json({
    message: "Login successful",
    redirect: user.redirect,
    user: {
      username: user.username,
      role: user.role,
      email: user.email
    }
  });
});



app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});
