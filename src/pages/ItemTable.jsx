import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
     const token = localStorage.getItem("token"); // get token from local storage

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/pending`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

      console.log("API Response:", response.data);
      
      if (response.data && response.data.success && Array.isArray(response.data.items)) {
        setItems(response.data.items);
        setError(null);
      } else {
        setItems([]);
        setError("No items available");
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Failed to fetch items. Please try again.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete/${id}`)
        .then(() => {
          setItems(items.filter(item => item._id !== id));
          alert("Item deleted");
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert("Failed to delete item");
        });
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Items</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Items</h2>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchItems}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">All Items</h2>
        <button 
          onClick={fetchItems}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3 border-b">Item Name</th>
              <th className="px-4 py-3 border-b">Location</th>
              <th className="px-4 py-3 border-b">Price</th>
              <th className="px-4 py-3 border-b">Seller</th>
              <th className="px-4 py-3 border-b">Contact</th>
              <th className="px-4 py-3 border-b">Features</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Created At</th>
              <th className="px-4 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? items.map((item) => (
              <tr key={item._id} className="even:bg-gray-50 hover:bg-gray-100 transition">
                <td className="px-4 py-3 border-b font-medium">{item.itemName}</td>
                <td className="px-4 py-3 border-b">{item.location}</td>
                <td className="px-4 py-3 border-b">₹{item.price}</td>
                <td className="px-4 py-3 border-b">{item.sellerName}</td>
                <td className="px-4 py-3 border-b">
                  {item.contactDetails?.phone || "N/A"}
                </td>
                <td className="px-4 py-3 border-b">
                  {item.features && Array.isArray(item.features) ? item.features.join(", ") : "N/A"}
                </td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                      item.status === "approved"
                        ? "bg-green-500"
                        : item.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-b">
                  {item.createAt ? new Date(item.createAt).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-4 py-3 border-b">
                  {item.status === "pending" ? (
                    <Link
                      to={`/items/${item._id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                    >
                      View
                    </Link>
                  ) : (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center px-4 py-6 text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
