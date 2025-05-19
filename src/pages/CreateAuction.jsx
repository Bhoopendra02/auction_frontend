import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    startingBid: "",
    reservePrice: "",
    auctionDuration: "7", // Default 7 days
    location: "",
    features: [],
    description: "",
    shippingInfo: {
      shippingMethod: "standard",
      shippingCost: "",
      estimatedDelivery: "",
    },
    termsAndConditions: "",
    category: "",
    condition: "new",
  });

  const [featureInput, setFeatureInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in and is a seller
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user || user.role !== 'seller') {
      toast.error('You must be logged in as a seller to create auctions');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const addFeature = () => {
    const feat = featureInput.trim();
    if (!feat) return toast.warn("Feature can't be empty");
    if (formData.features.includes(feat)) return toast.info("Feature already added");
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, feat]
    }));
    setFeatureInput("");
  };

  const removeFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== featureToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();

      // Append all fields
      Object.keys(formData).forEach(key => {
        if (key === 'shippingInfo') {
          Object.keys(formData.shippingInfo).forEach(shippingKey => {
            data.append(`shippingInfo[${shippingKey}]`, formData.shippingInfo[shippingKey]);
          });
        } else if (key === 'features') {
          formData.features.forEach((feature, index) =>
            data.append(`features[${index}]`, feature)
          );
        } else {
          data.append(key, formData[key]);
        }
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post("http://localhost:3000/api/auctions/create", data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      toast.success("Auction created successfully");
      navigate('/seller/auctions');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error creating auction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Auction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
        </div>
        <Input label="Item Name" name="itemName" value={formData.itemName} onChange={handleChange} required />
        <Input label="Category" name="category" value={formData.category} onChange={handleChange} required />
        <Input label="Starting Bid" name="startingBid" value={formData.startingBid} onChange={handleChange} type="number" required />
        <Input label="Reserve Price" name="reservePrice" value={formData.reservePrice} onChange={handleChange} type="number" required />
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Auction Duration (days)</label>
          <select
            name="auctionDuration"
            value={formData.auctionDuration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Item Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </div>

        {/* Shipping Information */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
        </div>
        <Input label="Shipping Cost" name="shippingInfo.shippingCost" value={formData.shippingInfo.shippingCost} onChange={handleChange} type="number" />
        <Input label="Estimated Delivery (days)" name="shippingInfo.estimatedDelivery" value={formData.shippingInfo.estimatedDelivery} onChange={handleChange} type="number" />

        <div>
          <label className="block text-gray-700 font-medium mb-1">Shipping Method</label>
          <select
            name="shippingInfo.shippingMethod"
            value={formData.shippingInfo.shippingMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="standard">Standard Shipping</option>
            <option value="express">Express Shipping</option>
            <option value="overnight">Overnight Shipping</option>
          </select>
        </div>

        {/* Item Details */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Item Details</h3>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Describe your item in detail"
            required
          />
        </div>

        {/* Features */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Features</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              className="flex-1 border p-2 rounded"
              placeholder="Add feature"
            />
            <button
              type="button"
              onClick={addFeature}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.features.map((f, i) => (
              <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {f} <button type="button" onClick={() => removeFeature(f)} className="ml-1 text-red-500">&times;</button>
              </span>
            ))}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Terms and Conditions</label>
          <textarea
            name="termsAndConditions"
            value={formData.termsAndConditions}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded"
            placeholder="Enter terms and conditions for this auction"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating...' : 'Create Auction'}
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      className="w-full border p-2 rounded"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export default CreateAuction;
