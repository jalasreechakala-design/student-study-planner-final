import { useState } from "react";

function Login({ setPage, setIsLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "https://student-study-planner-qpdr.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (data.success) {
        alert("Login Successful");

        console.log("USER OBJECT:", data.user);
        console.log("setUser =", setUser);
        console.log("setIsLoggedIn =", setIsLoggedIn);
        console.log("setPage =", setPage);
console.log("setUser =", setUser);

if (typeof setUser === "function") {
  setUser(data.user);
}



setIsLoggedIn(true);



setPage("dashboard");


      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.log("FULL ERROR",error);
      alert("An error occurred while logging in");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🔐 Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>

      <br />
      <br />

      <p>Don't have an account?</p>

      <button onClick={() => setPage("register")}>
        Register
      </button>
    </div>
  );
}

export default Login;