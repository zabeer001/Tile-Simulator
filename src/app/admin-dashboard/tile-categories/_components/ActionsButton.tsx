"use client"

import { Trash2 } from "lucide-react"
import { FiEdit } from "react-icons/fi"
import type { AllTilesCategoriesDataType } from "./AllTilesCategoriesData"
import { DeleteConfirmationCategoriesModal } from "./DeleteConfirmationCategoriesModal"
import { useState } from "react"

interface ActionsButtonProps {
  row: {
    original: AllTilesCategoriesDataType
  }
  onEdit: (category: AllTilesCategoriesDataType) => void
  onDelete?: (color: AllTilesCategoriesDataType) => void
}

function ActionsButton({ row, onEdit, onDelete }: ActionsButtonProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)



  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(row.original)
      console.log("Deleted item:", row.original.CategoriesName)
    }
    setShowDeleteModal(false)
  }
  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
  }
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <button onClick={() => onEdit(row.original)}>
        <FiEdit className="w-5 h-5" />
      </button>
      <button onClick={handleDeleteClick} className="hover:text-red-600">
        <Trash2 className="w-5 h-5 " />
      </button>
      <DeleteConfirmationCategoriesModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={row.original.CategoriesName}
      />
    </div>
  )
}

export default ActionsButton

