import { useState } from "react";
import axios from "./api/axios";

function Login() {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        user,
        pwd
      });

      // save token
      localStorage.setItem("token", response.data.accessToken);

      // redirect
      window.location.href = "/dashboard";

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
        />

        <button>Sign In</button>
      </form>
    </section>
  );
}

export default Login;