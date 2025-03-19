"use client"

import { useState } from "react"
import AllTilesColorHeader from "./_components/AllTilesColorHeader"
import AllTilesColorsCotainer from "./_components/AllTilesColorContainer"
import AddEditColor from "./_components/Add-EditColor"
import type { AllTilesColorDataType } from "./_components/AllTilesColorData"

const TileColors = () => {
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false)
  const [selectedColor, setSelectedColor] = useState<AllTilesColorDataType | null>(null)

  const handleAddNew = () => {
    setSelectedColor(null)
    setIsAddingOrEditing(true)
  }

  const handleEdit = (color: AllTilesColorDataType) => {
    setSelectedColor(color)
    setIsAddingOrEditing(true)
  }

  const handleCancel = () => {
    setIsAddingOrEditing(false)
    setSelectedColor(null)
  }

  const handleSave = (color: AllTilesColorDataType) => {
    console.log(color); // Use the color value
    setIsAddingOrEditing(false)
    setSelectedColor(null)
  }

  return (
    <div>
      {!isAddingOrEditing && <AllTilesColorHeader onAddNew={handleAddNew} />}

      {isAddingOrEditing ? (
        <AddEditColor color={selectedColor} onCancel={handleCancel} onSave={handleSave} />
      ) : (
        <AllTilesColorsCotainer onEdit={handleEdit} />
      )}
    </div>
  )
}

export default TileColors

