"use client"

import { useState } from "react"
import AllTilesCategoriesHeader from "./_components/AllTilesCategoriesHeader"
import AllTilesCategoriesCotainer from "./_components/AllTilesCategoriesCotainer"
import AddTileEditAndAddCategories from "./_components/AllTilesEdit-addCategories"
import type { AllTilesCategoriesDataType } from "./_components/AllTilesCategoriesData"

const TileCategories = () => {
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<AllTilesCategoriesDataType | null>(null)

  const handleAddNew = () => {
    setSelectedCategory(null)
    setIsAddingOrEditing(true)
  }

  const handleEdit = (category: AllTilesCategoriesDataType) => {
    setSelectedCategory(category)
    setIsAddingOrEditing(true)
  }

  const handleCancel = () => {
    setIsAddingOrEditing(false)
    setSelectedCategory(null)
  }

  return (
    <div>
      {!isAddingOrEditing && <AllTilesCategoriesHeader onAddNew={handleAddNew} />}

      {isAddingOrEditing ? (
        <AddTileEditAndAddCategories category={selectedCategory} onCancel={handleCancel} />
      ) : (
        <AllTilesCategoriesCotainer onEdit={handleEdit} />
      )}
    </div>
  )
}

export default TileCategories

