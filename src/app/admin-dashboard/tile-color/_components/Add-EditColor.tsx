"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { RiArrowRightSLine } from "react-icons/ri"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { AllTilesColorDataType } from "./AllTilesColorData"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Palette, History, ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddEditColorProps {
  color: AllTilesColorDataType | null
  onCancel: () => void
  onSave: (color: AllTilesColorDataType) => void
}

interface HSVColor {
  h: number
  s: number
  v: number
}

type SelectionMode = "color" | "image"

function AddEditColor({ color, onCancel, onSave }: AddEditColorProps) {
  const [title, setTitle] = useState(color?.Name || "")
  const [selectedColor, setSelectedColor] = useState("")
  const [previousColors, setPreviousColors] = useState<string[]>([])
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [hsvColor, setHsvColor] = useState<HSVColor>({ h: 0, s: 100, v: 100 })
  const [satValPosition, setSatValPosition] = useState({ x: 100, y: 0 })
  const [huePosition, setHuePosition] = useState(0)

  // Determine initial mode based on the color data
  const initialMode = color?.imageOrColor?.startsWith("#") ? "color" : "image"
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(initialMode)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const satValRef = useRef<HTMLDivElement>(null)
  const hueRef = useRef<HTMLDivElement>(null)

  const isEditing = !!color

  // Load previous colors from localStorage on component mount
  useEffect(() => {
    const savedColors = localStorage.getItem("previousColors")
    if (savedColors) {
      setPreviousColors(JSON.parse(savedColors))
    }
  }, [])

  // Initialize based on editing data
  useEffect(() => {
    if (isEditing && color) {
      if (color.imageOrColor?.startsWith("#")) {
        setSelectionMode("color")
        setSelectedColor(color.imageOrColor)
        setSelectedImage(null)
      } else {
        setSelectionMode("image")
        setSelectedImage(color.imageOrColor || null)
        setSelectedColor("")
      }
    }
  }, [isEditing, color])

  // Convert HSV to RGB
  const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
    s = s / 100
    v = v / 100

    const c = v * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = v - c

    let r = 0,
      g = 0,
      b = 0

    if (h >= 0 && h < 60) {
      ;[r, g, b] = [c, x, 0]
    } else if (h >= 60 && h < 120) {
      ;[r, g, b] = [x, c, 0]
    } else if (h >= 120 && h < 180) {
      ;[r, g, b] = [0, c, x]
    } else if (h >= 180 && h < 240) {
      ;[r, g, b] = [0, x, c]
    } else if (h >= 240 && h < 300) {
      ;[r, g, b] = [x, 0, c]
    } else {
      ;[r, g, b] = [c, 0, x]
    }

    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
  }

  // Convert RGB to Hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
  }

  // Update color from HSV
  const updateColorFromHsv = (h: number, s: number, v: number) => {
    const [r, g, b] = hsvToRgb(h, s, v)
    const hex = rgbToHex(r, g, b)
    setSelectedColor(hex)
    setHsvColor({ h, s, v })
    console.log(`HSV: ${h}, ${s}, ${v} -> RGB: ${r}, ${g}, ${b} -> HEX: ${hex}`)
  }

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Initialize positions based on HSV
  useEffect(() => {
    setSatValPosition({
      x: hsvColor.s,
      y: 100 - hsvColor.v,
    })
    setHuePosition((hsvColor.h / 360) * 100)
  }, [hsvColor])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to your server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setSelectionMode("image")
      console.log("Selected image:", imageUrl)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setSelectionMode("image")
      console.log("Dropped image:", imageUrl)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleColorChange = (color: string) => {
    // Add current color to previous colors before changing
    if (selectedColor && selectedColor !== color) {
      addToPreviousColors(selectedColor)
    }

    setSelectedColor(color)
    setSelectionMode("color")
    console.log("Selected color:", color)
  }

  const addToPreviousColors = (color: string) => {
    // Only add if it's a valid color and not already in the list
    if (color && color.startsWith("#")) {
      const newPreviousColors = [color, ...previousColors.filter((c) => c !== color).slice(0, 5)]
      setPreviousColors(newPreviousColors)

      // Save to localStorage
      localStorage.setItem("previousColors", JSON.stringify(newPreviousColors))
    }
  }

  const handleClearColor = () => {
    if (selectedColor) {
      addToPreviousColors(selectedColor)
    }
    setSelectedColor("")
    console.log("Color cleared")
  }

  const handleColorPickerClick = (e: React.MouseEvent) => {
    // Prevent the click from closing the picker immediately
    e.stopPropagation()
  }

  const handleSatValChange = (e: React.MouseEvent) => {
    if (!satValRef.current) return

    const rect = satValRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top))

    const s = Math.round((x / rect.width) * 100)
    const v = Math.round(100 - (y / rect.height) * 100)

    setSatValPosition({ x: s, y: 100 - v })
    updateColorFromHsv(hsvColor.h, s, v)
  }

  const handleHueChange = (e: React.MouseEvent) => {
    if (!hueRef.current) return

    const rect = hueRef.current.getBoundingClientRect()
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top))
    const huePercent = (y / rect.height) * 100
    const hue = Math.round(3.6 * huePercent)

    setHuePosition(huePercent)
    updateColorFromHsv(hue, hsvColor.s, hsvColor.v)
  }

  const handleSatValMouseDown = (e: React.MouseEvent) => {
    handleSatValChange(e)

    const onMouseMove = (e: MouseEvent) => {
      handleSatValChange(e as unknown as React.MouseEvent)
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const handleHueMouseDown = (e: React.MouseEvent) => {
    handleHueChange(e)

    const onMouseMove = (e: MouseEvent) => {
      handleHueChange(e as unknown as React.MouseEvent)
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const handleModeChange = (mode: SelectionMode) => {
    setSelectionMode(mode)
    if (mode === "color") {
      setSelectedImage(null)
    } else {
      setSelectedColor("")
    }
  }

  const handleSave = () => {
    // Add current color to previous colors before saving
    if (selectedColor && selectionMode === "color") {
      addToPreviousColors(selectedColor)
    }

    const newColor: AllTilesColorDataType = {
      id: color?.id || Date.now(),
      Name: title,
      Date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
      // Set imageOrColor based on the selected mode
      imageOrColor: selectionMode === "color" ? selectedColor : selectedImage || "/assets/tile1.png",
    }
    console.log("Saving color:", newColor)
    onSave(newColor)
  }

  // Predefined color swatches
  const colorSwatches = ["#000000", "#FFFFFF", "#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#800080"]

  return (
    <div>
      <div className="flex items-center justify-between pb-[20px]">
        <div>
          <h2 className="text-2xl font-semibold leading-[120%] text-black">Tile Colors</h2>
          <div className="flex items-center gap-2 pt-2">
            <Link href="/admin-dashboard" className="text-base font-medium leading-[120%] text-secondary-200">
              Dashboard
            </Link>
            <span className="text-secondary-200 w-[18px] h-[18px]">
              <RiArrowRightSLine />
            </span>
            <Link
              href="admin-dashboard/tile-colors"
              className="text-base font-medium leading-[120%] text-secondary-200"
            >
              Tile Colors
            </Link>
            <span className="text-secondary-200 w-[18px] h-[18px]">
              <RiArrowRightSLine />
            </span>
            <span className="text-base font-medium leading-[120%] text-secondary-300">
              {isEditing ? "Edit Color" : "Add Color"}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-white bg-red-600 py-4 px-8 text-base font-medium leading-[120%] rounded-[8px]"
          >
            Publish Color
          </button>
        </div>
      </div>

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
              placeholder="Type Title name here..."
              className={cn(
                "border-secondary-300",
                "placeholder:text-sm placeholder:text-secondary-400 placeholder:leading-[120%] placeholder:font-normal",
                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary-500 focus-visible:outline-none",
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
              <div className="relative">
                <div className="flex items-center gap-4">
                  {/* Color preview circle with icon */}
                  <div
                    className="w-16 h-16 rounded-md overflow-hidden border border-gray-300 cursor-pointer flex items-center justify-center"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    style={{ backgroundColor: selectedColor || "#ccc" }}
                  >
                    <Palette
                      className={`w-8 h-8 ${selectedColor ? "text-white" : "text-gray-500"}`}
                      style={{
                        filter: selectedColor ? "drop-shadow(0px 0px 1px rgba(0,0,0,0.5))" : "none",
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Input
                        id="colorHex"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-24"
                      />
                      <Button variant="outline" className="h-10 px-4" onClick={handleClearColor}>
                        Clear
                      </Button>
                    </div>

                    {/* Previous color section */}
                    {isEditing && color?.imageOrColor?.startsWith("#") && (
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="w-6 h-6 rounded-sm border border-gray-300"
                          style={{ backgroundColor: color.imageOrColor }}
                        />
                        <span className="text-xs text-gray-500">Previous: {color.imageOrColor}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Color picker panel */}
                {showColorPicker && (
                  <div
                    ref={colorPickerRef}
                    className="absolute z-10 mt-2 p-2 bg-white border border-gray-300 rounded-md shadow-lg"
                    onClick={handleColorPickerClick}
                  >
                    {/* Color gradient area */}
                    <div className="flex gap-2">
                      <div
                        ref={satValRef}
                        className="w-48 h-48 relative border border-gray-300 cursor-crosshair"
                        onMouseDown={handleSatValMouseDown}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000 100%), 
                                        linear-gradient(to right, #fff 0%, hsl(${hsvColor.h}, 100%, 50%) 100%)`,
                          }}
                        />
                        {/* Color picker indicator */}
                        <div
                          className="absolute w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          style={{
                            left: `${satValPosition.x}%`,
                            top: `${satValPosition.y}%`,
                            boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                          }}
                        />
                      </div>

                      {/* Hue slider */}
                      <div
                        ref={hueRef}
                        className="w-6 h-48 relative border border-gray-300 cursor-pointer"
                        onMouseDown={handleHueMouseDown}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                          }}
                        />
                        {/* Hue slider indicator */}
                        <div
                          className="absolute w-8 h-2 bg-white border border-gray-300 left-0 transform -translate-y-1/2 -translate-x-1px pointer-events-none"
                          style={{
                            top: `${huePosition}%`,
                            boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Previous colors section */}
                    {previousColors.length > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center gap-1 mb-1">
                          <History className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">Recent Colors</span>
                        </div>
                        <div className="flex gap-1">
                          {previousColors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-sm cursor-pointer border border-gray-300"
                              style={{ backgroundColor: color }}
                              onClick={() => handleColorChange(color)}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color swatches */}
                    <div className="flex mt-2 gap-1">
                      {colorSwatches.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-sm cursor-pointer border border-gray-300"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <div
                className="border-2 border-dashed border-secondary-300 rounded-md p-8 flex flex-col items-center justify-center h-[150px] cursor-pointer"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm text-center">Drag and drop image here, or click add image</p>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>

              {/* Previous image preview */}
              {isEditing && color?.imageOrColor && !color.imageOrColor.startsWith("#") && (
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-12 h-12 border border-gray-300 rounded-md overflow-hidden">
                    <Image
                      src={color.imageOrColor || "/placeholder.svg"}
                      alt="Previous"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-xs text-gray-500">Previous image</span>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={onCancel}
              className="py-2 px-6 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditColor

