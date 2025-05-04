import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [myusername, setUsername] = useState("");
  const [mypassword, setPassword] = useState("");
  const [myemail, setEmail] = useState("");
  const navigateto = useNavigate();

  const signupuser = async (e) => {
    e.preventDefault();
    if (!myemail || !mypassword || !myusername) {
      toast.error("All fields are required");
      return;
    }
    try {
      const { data } = await axios.post(
        'http://localhost:5000/user/signup',
        {
          email: myemail,
          username: myusername,
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
      toast.success(data.message || "Signup successful");
      localStorage.setItem("jwt", data.token);
      setTimeout(() => {
        navigateto('/home');
      }, 1000);

      setEmail("");
      setPassword("");
      setUsername("");
      
      
    } catch (error) {
      toast.error(error.response.data.errors || "Signup failed");
      console.error(error);
    }
  };

  return (
    <div className="bg-white max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 Sign Up</h1>
      
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
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={myusername}
            onChange={(e) => setUsername(e.target.value)}
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
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600">
        Already have an account? 
        <Link to="/signin" className="text-blue-500 hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

export default Signup;
