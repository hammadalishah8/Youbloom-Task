import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../services/api";

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Search filter
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(users);
    } else {
      setFiltered(
        users.filter((u) =>
          u.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading users...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error}</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
        Users List
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Users List */}
      <div className="grid gap-4 max-w-2xl mx-auto">
        {filtered.length > 0 ? (
          filtered.map((user) => (
            <Link
              key={user.id}
              to={`/detail/${user.id}`}
              className="block bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
