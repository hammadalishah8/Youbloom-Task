import { useParams, Link } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-700">Detail Page</h1>
      <p className="mt-2">You are viewing details for item ID: {id}</p>
      <Link
        to="/main"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Main
      </Link>
    </div>
  );
};

export default DetailPage;
