import React, { useEffect, useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    if (!data.name || !data.description || !data.price) {
      toast.error("Please fill all fields");
      return;
    }
    if (Number(data.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);

      const res = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Item added successfully");

      // Reset form
      setData({ name: "", description: "", price: "", category: "Salad" });
      setImage(null);
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  // Cleanup blob URL to prevent memory leak
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <div className="w-[80%] flex text-gray-500">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        className="w-[100%] h-[100%] px-[50px] py-[50px] flex flex-col gap-[10px]"
        onSubmit={handleSubmit}
      >
        {/* File Upload */}
        <div className="file flex flex-col gap-[10px]">
          <p className="text-xl">Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-[150px] h-[150px] object-cover border-2"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            name="image"
            id="image"
            hidden
            required
          />
        </div>

        {/* Name */}
        <div className="name">
          <p className="text-xl">Food Name</p>
          <input
            type="text"
            onChange={handleChange}
            value={data.name}
            className="border-2 px-[5px] py-[10px]"
            placeholder="Enter food name"
            name="name"
          />
        </div>

        {/* Description */}
        <div className="description">
          <p className="text-xl">Description</p>
          <textarea
            name="description"
            onChange={handleChange}
            value={data.description}
            className="border-2 px-[5px] py-[5px] w-[30%]"
            placeholder="Enter the food description"
            rows={6}
          ></textarea>
        </div>

        {/* Price and Category */}
        <div className="price-category flex gap-[30px]">
          <div className="category">
            <p>Product Category</p>
            <select
              className="px-[10px] py-[5px] border-2"
              onChange={handleChange}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Cake">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Rolls">Rolls</option>
              <option value="Noodles">Noodles</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Deserts">Deserts</option>
            </select>
          </div>

          <div className="price">
            <p>Product Price</p>
            <input
              type="number"
              onChange={handleChange}
              value={data.price}
              className="px-[5px] py-[5px] border-2 w-[100px]"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white px-[20px] py-[10px] w-[120px]"
          disabled={loading}
        >
          {loading ? "Uploading..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Add;
