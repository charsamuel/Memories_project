// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [memories, setMemories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addImage, setAddImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchMemories();
  }, []);
  const addMemory = async (url, memoryData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoryData),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to add memory");
      }
    } catch (error) {
      console.error("Error adding memory:", error);
      throw error; // Propagate the error
    }
  };

  const fetchMemories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/memories");
      console.log(response.data);
      setMemories(response.data);
    } catch (error) {
      toast.error("Failed to fetch memories");
    }
  };

  const handleEdit = (memory) => {
    setEditing(memory.id);
    setNewTitle(memory.title);
    setNewDescription(memory.description);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/memories/${id}`, {
        title: newTitle,
        description: newDescription,
      });
      toast.success("Memory edited successfully!");
      fetchMemories();
      setEditing("");
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      toast.error("Failed to update memory");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/memories/${id}`);
      toast.success("Memory deleted successfully!");
      fetchMemories();
    } catch (error) {
      toast.error("Failed to delete memory");
    }
  };

  const handleAdd = async () => {
    if (!addImage) {
      toast.error("Please select an image!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const newMemory = {
          title: addTitle,
          description: addDescription,
          image: base64Image,
        };

        await addMemory("http://localhost:5000/api/memories", newMemory);

        toast.success("Memory added successfully!");
        fetchMemories(); // Refresh the list of memories
        setAddTitle(""); // Reset fields
        setAddDescription("");
        setAddImage(null);
        setShowAddForm(false); // Close the add form
      } catch (error) {
        toast.error("Failed to add memory");
      }
    };

    reader.readAsDataURL(addImage); // Read the file as Base64
  };

  const handleImageChange = (e) => {
    setAddImage(e.target.files[0]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Memories</h1>

      {/* Button to show the add form */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => setShowAddForm(true)}
      >
        Add New Memory
      </button>

      {/* Add Memory Form */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add New Memory</h2>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-4">
              Image:
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full text-gray-700 border border-gray-300 rounded"
              />
              {addImage && (
                <img
                  src={URL.createObjectURL(addImage)}
                  alt="Preview"
                  className="mt-2 w-full h-48 object-cover rounded"
                />
              )}
            </label>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleAdd}
                disabled={!addTitle || !addDescription || !addImage}
              >
                Add
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap -m-4">
        {memories.map((memory) => (
          <div key={memory.id} className="w-full md:w-1/5 p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{memory.title}</h2>
                <p className="text-gray-700 mb-4">{memory.description}</p>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEdit(memory)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(memory.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Memory</h2>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-4">
              Description:
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              />
            </label>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleUpdate(editing)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default App;
