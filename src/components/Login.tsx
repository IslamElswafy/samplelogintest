import React, { useState } from "react";
import axios from "axios";

// Define types for the form inputs and error messages
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://elavvocato.com/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Login success:", response.data);
      // Handle successful login (e.g., store user data in state or context)
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrorMessage(error.response?.data.error || "An error occurred");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
