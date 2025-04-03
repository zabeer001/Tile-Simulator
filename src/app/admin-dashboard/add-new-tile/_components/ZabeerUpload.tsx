"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

interface TileType {
  name: string;
  description: string;
  grid_category:string;
  category_id: number[];
  image: File | null;

}

function ZabeerUpload() {
  const [formData, setFormData] = useState<TileType>({
    name: "",
    description: "",
    grid_category:"",
    category_id: [],
    image: null,

  });

  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleOnChangeEvent = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = event.target as HTMLInputElement;

    if (files && files.length > 0) {
      setFormData({
        ...formData,
        image: files[0],
       
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      category_id: value
        .split(",") // Split into an array
        .map((num) => parseInt(num.trim(), 10)) // Convert to numbers
        .filter((num) => !isNaN(num)), // Remove invalid numbers
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        `https://tilecustomizer.scaleupdevagency.com/api/tiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data ",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Upload Form</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            name="name"
            value={formData.name}
            onChange={handleOnChangeEvent}
            placeholder="Enter name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
 <input
            name="grid_category"
            value={formData.grid_category}
            onChange={handleOnChangeEvent}
            placeholder="Enter grid_category"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Category ID Input */}
          <input
            name="category_id"
            value={formData.category_id.join(",")}
            onChange={handleCategoryChange}
            placeholder="Enter category IDs (comma-separated)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Description Input */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleOnChangeEvent}
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* File Input */}
          <input
            type="file"
            ref={fileRef}
            name="iamge"
            onChange={handleOnChangeEvent}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

      
       

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ZabeerUpload;
