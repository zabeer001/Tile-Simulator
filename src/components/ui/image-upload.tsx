"use client"

import { useState, useRef, type ChangeEvent, type DragEvent } from "react"
import Image from "next/image"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"

interface ImageUploadProps {
  onImageUpload?: (file: File) => void
  maxSizeMB?: number
  acceptedFileTypes?: string[]
  label?: string
}

export default function ImageUpload({
  onImageUpload,
  maxSizeMB = 5,
  acceptedFileTypes = ["image/svg+xml"],
  label = "Photo",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndProcessFile(file)
    }
  }

  const validateAndProcessFile = (file: File) => {
    setError(null)

    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`Invalid file type. Please upload SVG files only.`)
      return
    }

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Call the callback
    if (onImageUpload) {
      onImageUpload(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      validateAndProcessFile(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <div className="space-y-2">
          <label htmlFor="image-upload" className="text-sm font-medium">
            photo
          </label>

          <div
            className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
            } ${preview ? "bg-background" : "bg-muted/30"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              id="image-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={acceptedFileTypes.join(",")}
              className="sr-only"
              aria-label={`Upload ${label}`}
            />

            <div className="flex flex-col items-center justify-center py-6 text-center">
              {preview ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt="Image preview"
                    fill
                    className="object-contain rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage()
                    }}
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <ImageIcon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">Drag and drop image here, or click to select</p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClick()
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-destructive mt-2">{error}</p>}

          {/* <p className="text-xs text-muted-foreground mt-2">Only SVG format is accepted. Max size: {maxSizeMB}MB</p> */}
        </div>
      </CardContent>
    </Card>
  )
}

