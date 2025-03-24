"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { generateFullUrl } from "@/lib/generateFullUrl"

interface ImageUploaderProps {
  selectedImage: string | null
  onImageChange: (image: string | null) => void
  previousImage: string | null
}

export function ImageUploader({ selectedImage, onImageChange, previousImage }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to your server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      onImageChange(imageUrl)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      onImageChange(imageUrl)
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
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="Selected"
            width={100}
            height={100}
            className="object-contain"
          />
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
            <Image
              src={generateFullUrl(previousImage) || "/placeholder.svg"}
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

