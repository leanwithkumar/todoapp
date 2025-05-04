import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [mypassword, setPassword] = useState("");
  const [myemail, setEmail] = useState("");
  const navigateto = useNavigate();

  const signupuser = async (e) => {
    e.preventDefault();
    if (!myemail || !mypassword) {
      toast.error("All fields are required");
      return;
    }
    try {
      const { data } = await axios.post(
        'http://localhost:5000/user/signin',
        {
          email: myemail,
          password: mypassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(data);
      toast.success(data.message || "Signin successful");
      localStorage.setItem("jwt", data.checkuser.token);
      navigateto('/home');
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.errors || "SignIn failed");
      console.error(error);
    }
  };

  return (
    <div className="bg-white max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 Sign In</h1>

      <form onSubmit={signupuser} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={myemail}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={mypassword}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600">
        New User? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}

export default Signup;
