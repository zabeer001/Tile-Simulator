"use client"

import type React from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  selectedImage: File | null
  onImageChange: (image: File | null) => void
  previousImage: File | null
}

export function ImageUploader({ selectedImage, onImageChange, previousImage }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log(file.name) // Logs the file name to the console
      onImageChange(file) // Store the file directly
      setImagePreview(URL.createObjectURL(file)) // Create a temporary preview URL
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      console.log(file.name) // Logs the file name to the console
      onImageChange(file) // Store the file directly
      setImagePreview(URL.createObjectURL(file)) // Create a temporary preview URL
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const renderPreview = () => {
    if (!selectedImage && !imagePreview) {
      return (
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <ImageIcon className="h-6 w-6 text-gray-500" />
        </div>
      )
    }

    // Use the imagePreview state for a live preview before upload, or use selectedImage
    const displayImage = imagePreview || (selectedImage ? URL.createObjectURL(selectedImage) : null)

    return (
      <div className="w-24 h-24 mb-2">
        <Image
          src={displayImage!} // Use preview URL if available
          alt="Selected"
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div>
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center h-[150px] cursor-pointer"
        onClick={handleImageClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {renderPreview()}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      </div>

      {/* Display file name */}
      {selectedImage && (
        <div className="mt-4">
          <span className="text-sm text-gray-500">File Name: {selectedImage.name}</span>
        </div>
      )}

      {/* Previous image preview */}
      {previousImage && (
        <div className="flex items-center gap-2 mt-4">
          <div className="w-12 h-12 border border-gray-300 rounded-md overflow-hidden">
            <Image
              src={`/images/${previousImage.name}`} // Use the correct path here
              alt="Previous"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xs text-gray-500">Previous image</span>
        </div>
      )}
    </div>
  )
}
