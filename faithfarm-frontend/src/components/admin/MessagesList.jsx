import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, CheckCircle, Mail } from "lucide-react";

function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ Delete message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  // ✅ Toggle read/unread
  const handleToggleRead = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/contacts/${id}`);
      setMessages(
        messages.map((msg) => (msg._id === id ? { ...msg, read: res.data.read } : msg))
      );
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>

      {loading && <p className="text-gray-500">Loading messages...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && messages.length === 0 && (
        <p className="text-gray-600">No messages yet.</p>
      )}

      {!loading && messages.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className={`border-t border-gray-200 ${
                    msg.read ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4 font-medium">{msg.name}</td>
                  <td className="py-2 px-4">{msg.email}</td>
                  <td className="py-2 px-4">{msg.phone || "-"}</td>
                  <td className="py-2 px-4">{msg.message}</td>
                  <td className="py-2 px-4">
                    {msg.read ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={16} /> Read
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-blue-600">
                        <Mail size={16} /> Unread
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleToggleRead(msg._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {msg.read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MessagesList;
