"use client"

import type React from "react"
import { useRef, useState } from "react"
import { ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  selectedImage: string | null
  onImageChange: (image: string | null) => void
  previousImage: string | null
}

export function ImageUploader({ selectedImage, onImageChange, previousImage }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  console.log(imagePreview)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageName = file.name
      onImageChange(imageName) // Store just the file name
      setImagePreview(null) // Clear any previous preview
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const imageName = file.name
      onImageChange(imageName) // Store just the file name
      setImagePreview(null) // Clear any previous preview
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center h-[150px] cursor-pointer"
        onClick={handleImageClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImage ? (
          <div className="flex items-center justify-center w-[100px] h-[100px] bg-gray-100 border rounded-md">
            <p className="text-sm text-gray-500">{selectedImage}</p> {/* Show the image name */}
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <ImageIcon className="h-6 w-6 text-gray-500" />
            </div>
            <p className="text-gray-500 text-sm text-center">Drag and drop image here, or click to add image</p>
          </>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      </div>

      {/* Previous image preview */}
      {previousImage && (
        <div className="flex items-center gap-2 mt-4">
          <div className="w-12 h-12 border border-gray-300 rounded-md overflow-hidden">
            <p className="text-xs text-gray-500">Previous image</p>
            <div className="text-xs">{previousImage}</div> {/* Display previous image file name */}
          </div>
        </div>
      )}
    </div>
  )
}
