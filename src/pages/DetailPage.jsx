import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserById } from "../services/api";

const DetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserById(id);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading user...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">User not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">
          {user.name}
        </h1>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {user.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Website:</span> {user.website}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Company:</span> {user.company?.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Address:</span>{" "}
          {user.address?.street}, {user.address?.city}
        </p>
      </div>

      <Link
        to="/main"
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Back to Main Page
      </Link>
    </div>
  );
};

export default DetailPage;
