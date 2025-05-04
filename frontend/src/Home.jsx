import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('jwt');
  const [loading, setLoading] = useState(false);
  const [todos, setTodo] = useState([]);
  const [error, setError] = useState(null);
  const [newTodo, setNewtodo] = useState("");
  const navigateto = useNavigate()
  

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/todo/showtodo', {
          withCredentials: true,
          headers: { "Content-type": "application/json" }
        });
        setTodo(response.data.alltodo);
        setError(null);
      } catch (error) {
        console.log("Unable to fetch todos", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, []);
  if (!token) {
    return <Navigate to="/signin" replace />;
  };

  

  const createTodo = async () => {
    if (!newTodo.trim()) {
      console.log("Todo cannot be empty");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/todo/addtodo', {
        text: newTodo,
        completed: false
      }, {
        withCredentials: true
      });
      setTodo([...todos, response.data.newTodo]);
      setNewtodo("");
    } catch (error) {
      console.log("Unable to add todo", error);
    }
  };

  const updateTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) {
      console.error("Todo not found with id:", id);
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/todo/updateTodo/${id}`, {
        ...todo,
        completed: !todo.completed
      }, { withCredentials: true });
      setTodo(todos.map((t) => t._id === id ? response.data.updatingtodo : t));
    } catch (error) {
      console.log("Unable to update todo", error);
      setError(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/deleteTodo/${id}`, {
        withCredentials: true
      });
      setTodo(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.log("Unable to delete todo", error);
      setError("");
    }
  };

  const logoutthis = async () => {
    try {
      await axios.get('http://localhost:5000/user/logout', { withCredentials: true });
      toast.success("User logged out successfully");
      localStorage.removeItem('jwt');
      navigateto('/signin')
    } catch (error) {
      console.log(error);
      toast.error("Unable to logout");
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="bg-white max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Todo App</h1>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Add a new todo..."
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newTodo}
          onChange={(e) => setNewtodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') createTodo();
          }}
        />
        <button
          onClick={createTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li key={todo._id || index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo._id)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>{completedCount} completed / {todos.length} total</span>
        <button
          onClick={logoutthis}
          className="text-blue-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
