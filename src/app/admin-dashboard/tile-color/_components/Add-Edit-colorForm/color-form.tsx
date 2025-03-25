"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Palette, ImageIcon } from "lucide-react"
import type { AllTilesColorDataType } from "../AllTilesColorData"
import { FormHeader } from "./form-header"
import { ColorPicker } from "./color-picker"
import { ImageUploader } from "./image-uploader"
import { FormFooter } from "./form-footer"

interface ColorFormProps {
  color: AllTilesColorDataType | null
  onCancel: () => void
  onSave: (color: AllTilesColorDataType) => void
}

type SelectionMode = "color" | "image"

export function ColorForm({ color, onCancel, onSave }: ColorFormProps) {
  const [title, setTitle] = useState(color?.name || "")
  const [selectedColor, setSelectedColor] = useState(color?.code || "")
  const [selectedImage, setSelectedImage] = useState<string | null>(color?.image || null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Determine initial mode based on the color data
  const initialMode: SelectionMode = color?.code ? "color" : "image"
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(initialMode)

  const isEditing = !!color
  const session = useSession()
  const token = (session?.data?.user as { token: string })?.token

  const handleModeChange = (mode: SelectionMode) => {
    setSelectionMode(mode)
    if (mode === "color") {
      setSelectedImage(null)
    } else {
      setSelectedColor("")
    }
  }

  const handleSave = async () => {
    if (!title) {
      alert("Please enter a title for the color")
      return
    }

    if (selectionMode === "color" && !selectedColor) {
      alert("Please select a color")
      return
    }

    if (selectionMode === "image" && !selectedImage) {
      alert("Please select an image")
      return
    }

    setIsSubmitting(true)

    try {
      const colorData: Partial<AllTilesColorDataType> = {
        name: title,
        code: selectionMode === "color" ? selectedColor : null,
        image: selectionMode === "image" ? selectedImage : null,
      }

      // Determine if we're updating or creating
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colors/${color?.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colors`

      // Use PUT method directly for updates
      const method = isEditing ? "PUT" : "POST"

      console.log(`${isEditing ? "Updating" : "Creating"} color with:`, {
        url,
        method,
        data: colorData,
      })

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colorData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`Color ${isEditing ? "updated" : "created"} successfully:`, data)
        onSave(data) // Pass the response data to onSave
      } else {
        const errorData = await response.json()
        console.error(`Error ${isEditing ? "updating" : "creating"} color:`, errorData)
        alert(`Failed to ${isEditing ? "update" : "create"} color. Please try again.`)
      }
    } catch (error) {
      console.error("Network error while saving color:", error)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FormHeader isEditing={isEditing} isSubmitting={isSubmitting} onSave={handleSave} />

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-medium mb-2 block">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type Title color name here..."
              className={cn(
                "border-gray-300",
                "placeholder:text-sm placeholder:text-gray-400 placeholder:leading-[120%] placeholder:font-normal",
                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-red-500 focus-visible:outline-none",
              )}
            />
          </div>

          <Tabs
            value={selectionMode}
            onValueChange={(value) => handleModeChange(value as SelectionMode)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="color" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Select Color
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Select Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="color" className="mt-0">
              <ColorPicker
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                previousColor={isEditing ? color?.code : null}
              />
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <ImageUploader
                selectedImage={selectedImage}
                onImageChange={setSelectedImage}
                previousImage={isEditing ? color?.image : null}
              />
            </TabsContent>
          </Tabs>

          <FormFooter onCancel={onCancel} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  )
}

