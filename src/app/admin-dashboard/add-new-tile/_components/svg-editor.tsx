"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Upload, ImageIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface AddPhotoProps {
  onSvgChange: (svgData: string) => void
  initialSvg?: string // Add this prop to accept initial SVG data
}

export function AddPhotoSvgEditor({ onSvgChange, initialSvg }: AddPhotoProps) {
  const [svgContent, setSvgContent] = useState<string | null>(initialSvg || null)
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null)
  const [forceRender, setForceRender] = useState(0)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Use refs to track if we need to notify parent of changes
  const shouldNotifyParent = useRef(!!initialSvg)

  // Notify parent of initial SVG if provided
  useEffect(() => {
    if (initialSvg && typeof onSvgChange === "function") {
      onSvgChange(initialSvg)
    }
  }, [initialSvg, onSvgChange])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "image/svg+xml") {
      toast.error("Invalid file type", {
        description: "Please upload an SVG file",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setSvgContent(content)
      shouldNotifyParent.current = true
      setSelectedPathId(null)
    }
    reader.readAsText(file)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]

      if (file.type !== "image/svg+xml") {
        toast.error("Invalid file type", {
          description: "Please upload an SVG file",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setSvgContent(content)
        shouldNotifyParent.current = true
        setSelectedPathId(null)
      }
      reader.readAsText(file)
    }
  }, [])

  // Process SVG content when it changes or when forceRender changes
  useEffect(() => {
    if (!svgContent || !svgContainerRef.current) return

    // Clear the container first
    svgContainerRef.current.innerHTML = svgContent

    const paths = Array.from(svgContainerRef.current.querySelectorAll("path")) as SVGPathElement[]

    // Assign IDs to paths that don't have them
    paths.forEach((path, index) => {
      if (!path.id) {
        path.id = `path-${index}`
      }
    })

    // Add click handlers to all paths
    paths.forEach((path) => {
      path.style.cursor = "pointer"
      path.addEventListener("click", (e) => {
        e.stopPropagation()
        setSelectedPathId(path.id)
      })
    })

    // Apply styling to the selected path if there is one
    if (selectedPathId) {
      const selectedPath = paths.find((path) => path.id === selectedPathId)
      if (selectedPath) {
        selectedPath.style.stroke = "#000000"
        selectedPath.style.strokeWidth = "2"
      }
    }

    // Only notify parent if this is a new SVG upload
    if (shouldNotifyParent.current && typeof onSvgChange === "function") {
      onSvgChange(svgContent)
      shouldNotifyParent.current = false
    }

    return () => {
      paths.forEach((path) => {
        path.removeEventListener("click", () => {})
      })
    }
  }, [svgContent, selectedPathId, forceRender, onSvgChange])

  // Clear selection function - completely redraws the SVG without selection
  const clearSelection = useCallback(() => {
    setSelectedPathId(null)
    setForceRender((prev) => prev + 1) // Force a re-render
    toast.info("Selection cleared")
  }, [])

  return (
    <Card className="border-none">
      <CardContent className="p-0">
        <div className="space-y-2">
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!svgContent ? (
              <div className="flex flex-col items-center justify-center space-y-4 ">
                <div className="bg-gray-100 rounded-full p-3">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <p className="text-sm text-gray-500">Drag and drop image here, or click add image</p>
                <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Add Image
                </Button>
                <input type="file" ref={fileInputRef} className="hidden" accept=".svg" onChange={handleFileUpload} />
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  ref={svgContainerRef}
                  className="svg-container w-[250px] h-[220px] flex items-center justify-center mx-auto border border-gray-200 rounded-md"
                />
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Change SVG
                  </Button>
                  <Button type="button" variant="outline" onClick={clearSelection} disabled={!selectedPathId}>
                    Clear Selection
                  </Button>
                  <input type="file" ref={fileInputRef} className="hidden" accept=".svg" onChange={handleFileUpload} />
                </div>
                {selectedPathId && (
                  <p className="text-sm text-center">
                    Selected path: <span className="font-medium">{selectedPathId}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

