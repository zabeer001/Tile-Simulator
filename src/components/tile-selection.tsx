"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TilesData } from "@/data/TilesData"

interface Tile {
  id: string
  name: string
  collection: string
  svg: string[] // Multiple SVG strings per tile
  preview?: string
}

interface TileSelectionProps {
  onTileSelect: (tile: Tile) => void
  selectedTile: Tile | null
  onRotate: (tileId: string, index: number, newRotation: number) => void
  tileRotations?: Record<string, number[]>
  pathColors?: Record<string, string>
}

export function TileSelection({ onTileSelect, selectedTile, tileRotations = {}, pathColors }: TileSelectionProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>("Geometric")
  // const carouselRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const tilesPerPage = 9 // 9 tiles per row
  const rowsPerPage = 2 // 2 rows

  console.log(setSelectedCollection)

  const filteredTiles = TilesData.filter((tile) => tile.collection === selectedCollection)

  // Calculate total pages
  const totalPages = Math.ceil(filteredTiles.length / (tilesPerPage * rowsPerPage))

  const handleTileSelect = (tile: Tile) => {
    onTileSelect(tile)
  }

  // Helper function to apply colors to SVG string
  const applyColorsToSvg = (svgString: string, colors: Record<string, string>) => {
    if (!colors || Object.keys(colors).length === 0) return svgString

    let modifiedSvg = svgString

    // Create a temporary DOM element to parse the SVG
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, "image/svg+xml")

    // Find all paths in the SVG
    const paths = doc.querySelectorAll("path")
    let modified = false

    paths.forEach((path) => {
      // Get the path ID or create one based on attributes
      const pathId = path.id || path.getAttribute("d")?.substring(0, 20)

      // Check if we have a color for this path
      Object.keys(colors).forEach((colorPathId) => {
        // Check if the colorPathId contains or matches part of our path's id or d attribute
        if (pathId !== undefined && (colorPathId.includes(pathId) || colorPathId.includes(pathId))) {
          path.setAttribute("fill", colors[colorPathId])
          modified = true
        }
      })
    })

    // If we modified any paths, serialize the SVG back to a string
    if (modified) {
      const serializer = new XMLSerializer()
      modifiedSvg = serializer.serializeToString(doc)
    }

    return modifiedSvg
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Get tiles for current page
  const getCurrentPageTiles = () => {
    const startIdx = currentPage * tilesPerPage * rowsPerPage
    return filteredTiles.slice(startIdx, startIdx + tilesPerPage * rowsPerPage)
  }

  // Split tiles into rows
  const getRowTiles = (rowIndex: number) => {
    const pageTiles = getCurrentPageTiles()
    const startIdx = rowIndex * tilesPerPage
    return pageTiles.slice(startIdx, startIdx + tilesPerPage)
  }

  useEffect(() => {
    console.log("Tile rotations updated:", tileRotations)
  }, [tileRotations])

  return (
    <div className=" space-y-4">
      {/* <div className="flex flex-wrap gap-2 justify-between items-center">
        <button
          onClick={() => setSelectedCollection("Geometric")}
          className={cn(
            "px-3 py-1 text-sm rounded-full transition-colors",
            selectedCollection === "Geometric"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80",
          )}
        >
          Geometric
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
      </div> */}

      <div className="relative">
        {/* Left navigation arrow */}
        <button
          onClick={goToPrevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-gray-100"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Carousel container */}
        <div className="">
          {/* First row */}
          <div className="grid grid-cols-9 gap-4 mb-4">
            {getRowTiles(0).map((tile) => (
              <div key={tile.id} className="flex flex-col items-center">
                <button
                  onClick={() => handleTileSelect(tile)}
                  className={cn(
                    "relative w-[100px] h-[100px] rounded-lg overflow-hidden border-2 transition-all bg-white",
                    selectedTile?.id === tile.id
                      ? "border-primary shadow-lg scale-[0.98]"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div
                    className="grid gap-[1px]"
                    style={{
                      gridTemplateColumns: `repeat(${tile.svg.length === 4 ? 2 : 1}, 1fr)`,
                    }}
                  >
                    {tile.svg.map((svgString, index) => {
                      // Use the correct initial rotation pattern if not in tileRotations
                      const defaultRotation = (() => {
                        switch (index) {
                          case 0:
                            return 0 // First SVG: 0°
                          case 1:
                            return 90 // Second SVG: 90°
                          case 2:
                            return 270 // Third SVG: 270°
                          case 3:
                            return 180 // Fourth SVG: 180°
                          default:
                            return 0
                        }
                      })()

                      const rotation = tileRotations[tile.id] ? tileRotations[tile.id][index] : defaultRotation

                      return (
                        <div key={`${tile.id}-${index}`} className="flex items-center justify-center">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: applyColorsToSvg(svgString, pathColors || {}),
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              transform: `rotate(${rotation}deg)`,
                              transition: "transform 0.3s ease-in-out",
                            }}
                            className="svg-container"
                          />
                        </div>
                      )
                    })}
                  </div>
                </button>
                <p className="text-xs font-medium text-center truncate mt-1 w-[100px]">{tile.name}</p>
              </div>
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-9 gap-4">
            {getRowTiles(1).map((tile) => (
              <div key={`second-${tile.id}`} className="flex flex-col items-center">
                <button
                  onClick={() => handleTileSelect(tile)}
                  className={cn(
                    "relative w-[100px] h-[100px] rounded-lg overflow-hidden border-2 transition-all bg-white",
                    selectedTile?.id === tile.id
                      ? "border-primary shadow-lg scale-[0.98]"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div
                    className="grid gap-[1px]"
                    style={{
                      gridTemplateColumns: `repeat(${tile.svg.length === 4 ? 2 : 1}, 1fr)`,
                    }}
                  >
                    {tile.svg.map((svgString, index) => {
                      const defaultRotation = (() => {
                        switch (index) {
                          case 0:
                            return 0
                          case 1:
                            return 90
                          case 2:
                            return 270
                          case 3:
                            return 180
                          default:
                            return 0
                        }
                      })()

                      const rotation = tileRotations[tile.id] ? tileRotations[tile.id][index] : defaultRotation

                      return (
                        <div key={`second-${tile.id}-${index}`} className="flex items-center justify-center">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: applyColorsToSvg(svgString, pathColors || {}),
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              transform: `rotate(${rotation}deg)`,
                              transition: "transform 0.3s ease-in-out",
                            }}
                            className="svg-container"
                          />
                        </div>
                      )
                    })}
                  </div>
                </button>
                <p className="text-xs font-medium text-center truncate mt-1 w-[100px]">{tile.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right navigation arrow */}
        <button
          onClick={goToNextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-gray-100"
          aria-label="Next page"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

